import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import books from '../../data/books.json'
import sentences from '../../data/sentences.json'
import SentenceCard from '../../components/SentenceCard'

const NEED = 3

export default function StepPickSentences({ go }) {
  const { state, actions } = useStore()
  const { bookIds, sentenceIds } = state.user.picks
  const [msg, setMsg] = useState('')
  const pool = sentences.filter((s) => bookIds.includes(s.bookId))

  const toggle = (id) => {
    const has = sentenceIds.includes(id)
    if (!has && sentenceIds.length >= NEED) return setMsg(`문장은 ${NEED}개까지만 고를 수 있어요.`)
    setMsg('')
    actions.updateUser({ picks: { ...state.user.picks, sentenceIds: has ? sentenceIds.filter((x) => x !== id) : [...sentenceIds, id] } })
  }

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div>
        <h2 className="font-serif-kr text-2xl font-bold text-ink">마음에 박힌 문장 {NEED}개</h2>
        <p className="mt-1 text-sm text-ink-muted">고른 문장이 내 책장의 첫 카드가 돼요.</p>
        <p className="mt-1 text-xs text-ink-muted">일부는 원문, 나머지는 책의 분위기를 새로 풀어 쓴 문장이에요. 카드에 표시돼 있어요.</p>
      </div>
      <ul className="flex flex-col gap-3">
        {pool.map((s) => {
          const b = books.find((x) => x.id === s.bookId)
          return (
            <li key={s.id}>
              <SentenceCard card={{ text: s.text, title: b?.title, author: b?.author, sentenceId: s.id }} selected={sentenceIds.includes(s.id)} onClick={() => toggle(s.id)} />
            </li>
          )
        })}
      </ul>
      <div className="sticky bottom-0 -mx-5 flex flex-col gap-2 bg-surface-100 px-5 py-3">
        {msg && <p role="status" className="text-sm font-bold text-carpet-red">{msg}</p>}
        <div className="flex gap-3">
        <button onClick={() => go(1)} className="h-12 rounded-xl border border-line px-5 font-bold text-ink-muted">이전</button>
        <button disabled={sentenceIds.length < NEED} onClick={() => go(3)} className="h-12 flex-1 rounded-xl bg-carpet-red font-bold text-white disabled:opacity-40">
          {sentenceIds.length < NEED ? `${sentenceIds.length} / ${NEED}개 선택` : '다음'}
        </button>
        </div>
      </div>
    </section>
  )
}
