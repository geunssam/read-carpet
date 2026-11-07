import { useEffect, useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import useWalker from './useWalker'
import Walker from './Walker'
import PlacePrompt from './PlacePrompt'
import PlaceModal from './PlaceModal'
import { COLS, ROWS, PLACES, placeAt } from './lobbyMap'

const pct = (x, y) => ({ left: `${(x / COLS) * 100}%`, top: `${(y / ROWS) * 100}%` })

// 도서관 로비: 입구에서 시작해 걸어 다니며 문 앞에서 각 화면으로 들어가는 지도
export default function LobbyPage() {
  const { state, actions } = useStore()
  const [modal, setModal] = useState(null) // 열려 있는 장소 창 {to, intent, nonce}
  const { pos, face, walkTo } = useWalker(!modal) // 창이 열려 있으면 걷기 멈춤
  const [notice, setNotice] = useState(null)
  const place = placeAt(pos.x, pos.y)

  // 자리를 옮기면 이전 안내 지우기
  useEffect(() => { setNotice(null) }, [pos.x, pos.y])

  const enter = () => {
    if (!place) return
    if (place.kind === 'attend') return setNotice(actions.earn('attendance'))
    setModal({ to: place.to, intent: null, nonce: 0 })
  }

  // Enter / 스페이스로 들어가기 (입력칸에 글 쓰는 중이면 무시)
  useEffect(() => {
    const onKey = (e) => {
      if (modal || (e.key !== 'Enter' && e.key !== ' ')) return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return
      e.preventDefault()
      enter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="font-serif-kr text-2xl font-bold text-ink">도서관 로비</h1>
        <p className="text-sm text-ink-muted">{state.user.nickname}님, 환영해요. 지도를 눌러 걸어가 보세요. 문 앞 발판에 서면 들어갈 수 있어요.</p>
      </div>

      {/* 지도: 480x352 비율. 안의 위치는 모두 퍼센트라 화면 크기가 달라도 맞음 */}
      <div
        className="relative w-full cursor-pointer select-none overflow-hidden rounded-2xl border border-line bg-surface-200"
        style={{ aspectRatio: `${COLS * 32} / ${ROWS * 32}`, imageRendering: 'pixelated' }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          walkTo(Math.floor(((e.clientX - r.left) / r.width) * COLS), Math.floor(((e.clientY - r.top) / r.height) * ROWS))
        }}
      >
        <img src="/assets/lobby/lobby-bg.svg" alt="" className="absolute inset-0 h-full w-full" draggable={false} />
        {PLACES.map((p) => (
          <button
            key={p.id} type="button" aria-label={`${p.name} 앞으로 걸어가기`}
            onClick={(e) => { e.stopPropagation(); walkTo(p.x, p.y) }}
            className="absolute -translate-x-1/2 whitespace-nowrap rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-bold text-white"
            style={{ ...pct(p.label.x + 0.5, p.label.y + 0.1), minHeight: 0, minWidth: 0 }}
          >{p.name}</button>
        ))}
        <Walker x={10} y={3} face={-1} user={state.user} npc />
        <Walker x={pos.x} y={pos.y} face={face} user={state.user} />
      </div>

      <PlacePrompt place={place} notice={notice} onEnter={enter} />
      {modal && <PlaceModal modal={modal} setModal={setModal} />}
    </div>
  )
}
