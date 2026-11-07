import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import books from '../../data/books.json'
import BookCover from '../../components/BookCover'

const NEED = 3

export default function StepPickBooks({ go }) {
  const { state, actions } = useStore()
  const picked = state.user.picks.bookIds
  const [msg, setMsg] = useState('')

  const toggle = (id) => {
    const has = picked.includes(id)
    if (!has && picked.length >= NEED) return setMsg(`책은 ${NEED}권까지만 고를 수 있어요. 하나를 먼저 빼 주세요.`)
    setMsg('')
    const bookIds = has ? picked.filter((x) => x !== id) : [...picked, id]
    actions.updateUser({ picks: { ...state.user.picks, bookIds, sentenceIds: [] } })
  }

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div>
        <h2 className="font-serif-kr text-2xl font-bold text-ink">끌리는 책 {NEED}권을 골라요</h2>
        <p className="mt-1 text-sm text-ink-muted">읽지 않았어도 괜찮아요. 제목만 보고 끌리는 대로!</p>
      </div>
      <ul className="grid grid-cols-3 gap-3">
        {books.map((b) => {
          const on = picked.includes(b.id)
          return (
            <li key={b.id} className="flex justify-center">
              <button onClick={() => toggle(b.id)} aria-pressed={on} aria-label={`${b.title}, ${b.author}`} className={`relative rounded-lg p-1 ${on ? 'ring-2 ring-carpet-red' : ''}`} style={{ minHeight: 0, minWidth: 0 }}>
                <BookCover book={b} size="sm" />
                {on && <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-carpet-red text-xs font-bold text-white">{picked.indexOf(b.id) + 1}</span>}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="sticky bottom-0 -mx-5 flex flex-col gap-2 bg-surface-100 px-5 py-3">
        {msg && <p role="status" className="text-sm font-bold text-carpet-red">{msg}</p>}
        <div className="flex gap-3">
        <button onClick={() => go(0)} className="h-12 rounded-xl border border-line px-5 font-bold text-ink-muted">이전</button>
        <button
          disabled={picked.length < NEED} onClick={() => go(2)}
          className="h-12 flex-1 rounded-xl bg-carpet-red font-bold text-white disabled:opacity-40"
        >
          {picked.length < NEED ? `${picked.length} / ${NEED}권 선택` : '다음'}
        </button>
        </div>
      </div>
    </section>
  )
}
