import { useCallback, useEffect, useRef, useState } from 'react'
import { COLS, ROWS, START, isBlocked } from './lobbyMap'

const KEY_DIRS = {
  ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0],
}
const STEP_MS = 120 // 키보드로 한 칸 걷는 최소 간격
const AUTO_MS = 130 // 눌러서 걸어갈 때 한 칸 간격
const DIRS4 = [[1, 0], [-1, 0], [0, 1], [0, -1]]

// 현재 칸에서 갈 수 있는 모든 칸까지의 최단 경로(너비 우선 탐색). 막힌 칸을 눌렀으면 가장 가까운 빈 칸으로.
function findPath(from, to) {
  const key = (x, y) => y * COLS + x
  const prev = new Map([[key(from.x, from.y), null]])
  const dist = new Map([[key(from.x, from.y), 0]])
  const queue = [from]
  for (let i = 0; i < queue.length; i++) {
    const c = queue[i]
    for (const [dx, dy] of DIRS4) {
      const nx = c.x + dx, ny = c.y + dy
      if (isBlocked(nx, ny) || prev.has(key(nx, ny))) continue
      prev.set(key(nx, ny), c); dist.set(key(nx, ny), dist.get(key(c.x, c.y)) + 1); queue.push({ x: nx, y: ny })
    }
  }
  let goal = null
  for (const c of queue) {
    const d = Math.abs(c.x - to.x) + Math.abs(c.y - to.y)
    if (!goal || d < goal.d || (d === goal.d && dist.get(key(c.x, c.y)) < dist.get(key(goal.c.x, goal.c.y)))) goal = { c, d }
  }
  if (!goal) return []
  const path = []
  for (let c = goal.c; c && prev.get(key(c.x, c.y)); c = prev.get(key(c.x, c.y))) path.unshift({ x: c.x, y: c.y })
  return path
}

// 키보드 방향키/WASD로 한 칸씩, 또는 지도를 눌러 그 자리까지 걸어감. 막힌 칸이면 제자리.
export default function useWalker(enabled = true) {
  const [pos, setPos] = useState(START)
  const [face, setFace] = useState(1) // 1 오른쪽, -1 왼쪽 (스프라이트 뒤집기)
  const last = useRef(0)
  const posRef = useRef(START)
  const timer = useRef(null)
  posRef.current = pos

  const stopAuto = useCallback(() => { clearInterval(timer.current); timer.current = null }, [])

  const step = useCallback((nx, ny) => {
    const p = posRef.current
    if (nx !== p.x) setFace(nx > p.x ? 1 : -1)
    posRef.current = { x: nx, y: ny }
    setPos({ x: nx, y: ny })
  }, [])

  const move = useCallback((dx, dy) => {
    const now = performance.now()
    if (now - last.current < STEP_MS) return
    last.current = now
    stopAuto() // 키를 누르면 자동 걷기 멈춤
    const p = posRef.current
    if (isBlocked(p.x + dx, p.y + dy)) return
    step(p.x + dx, p.y + dy)
  }, [step, stopAuto])

  const walkTo = useCallback((tx, ty) => {
    stopAuto()
    const path = findPath(posRef.current, { x: tx, y: ty })
    if (path.length === 0) return
    timer.current = setInterval(() => {
      const next = path.shift()
      if (!next) return stopAuto()
      step(next.x, next.y)
    }, AUTO_MS)
  }, [step, stopAuto])

  useEffect(() => {
    if (!enabled) { stopAuto(); return undefined }
    const onKey = (e) => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      const d = KEY_DIRS[e.key]
      if (!d) return
      e.preventDefault() // 화살표로 화면이 내려가지 않게
      move(d[0], d[1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled, move, stopAuto])

  useEffect(() => stopAuto, [stopAuto])
  return { pos, face, move, walkTo }
}
