import { useState } from 'react'
import SentenceCard from '../../components/SentenceCard'

export default function PickCards({ shelf, opponent, onStart, onBack }) {
  const [ids, setIds] = useState([])
  const toggle = (id) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < 3 ? [...cur, id] : cur))
  const start = () => onStart(ids.map((id) => shelf.find((c) => c.id === id)))

  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="self-start text-sm text-ink-muted underline">뒤로</button>
      <div>
        <h1 className="font-serif-kr text-2xl font-bold text-ink">{opponent.nickname}에게 낼 카드 3장</h1>
        <p className="mt-1 text-sm text-ink-muted">고른 순서대로 1번, 2번, 3번 판에 나가요. 점수는 나만 볼 수 있어요.</p>
      </div>
      <ul className="flex flex-col gap-3">
        {[...shelf].reverse().map((c) => {
          const order = ids.indexOf(c.id)
          return (
            <li key={c.id} className="relative">
              <SentenceCard card={c} showScore selected={order >= 0} onClick={() => toggle(c.id)} />
              {order >= 0 && <span className="absolute -left-1 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-carpet-red text-sm font-bold text-white">{order + 1}</span>}
            </li>
          )
        })}
      </ul>
      <div className="sticky bottom-16 bg-surface-100 py-2">
        <button disabled={ids.length < 3} onClick={start} className="h-12 w-full rounded-xl bg-carpet-red font-bold text-white disabled:opacity-40">
          {ids.length < 3 ? `${ids.length} / 3장 선택` : '대결 시작'}
        </button>
      </div>
    </div>
  )
}
