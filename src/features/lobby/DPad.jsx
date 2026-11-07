import { useEffect, useRef } from 'react'

// 휴대폰·패드용 화면 방향 단추. 누르고 있으면 계속 걸음.
export default function DPad({ onMove }) {
  const timer = useRef(null)
  const stop = () => { clearInterval(timer.current); timer.current = null }
  useEffect(() => stop, [])
  const start = (dx, dy) => (e) => {
    e.preventDefault()
    onMove(dx, dy)
    stop()
    timer.current = setInterval(() => onMove(dx, dy), 140)
  }
  const Btn = ({ dx, dy, label, className }) => (
    <button
      type="button" aria-label={label} onPointerDown={start(dx, dy)} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMove(dx, dy) } }}
      className={`flex h-12 w-12 touch-none select-none items-center justify-center rounded-xl border border-line bg-surface-200 text-xl font-bold text-ink active:bg-carpet-red active:text-white ${className}`}
      style={{ minHeight: 48, minWidth: 48 }}
    >
      {{ 위: '▲', 아래: '▼', 왼쪽: '◀', 오른쪽: '▶' }[label]}
    </button>
  )
  return (
    <div className="mx-auto grid w-fit grid-cols-3 grid-rows-2 gap-1.5" role="group" aria-label="이동 단추">
      <Btn dx={0} dy={-1} label="위" className="col-start-2 row-start-1" />
      <Btn dx={-1} dy={0} label="왼쪽" className="col-start-1 row-start-2" />
      <Btn dx={0} dy={1} label="아래" className="col-start-2 row-start-2" />
      <Btn dx={1} dy={0} label="오른쪽" className="col-start-3 row-start-2" />
    </div>
  )
}
