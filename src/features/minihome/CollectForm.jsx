import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import books from '../../data/books.json'
import sentences from '../../data/sentences.json'
import Notice from '../../components/Notice'

const MANUAL = 'manual'

export default function CollectForm() {
  const { actions } = useStore()
  const [bookId, setBookId] = useState(MANUAL)
  const [manual, setManual] = useState({ title: '', author: '' })
  const [text, setText] = useState('')
  const [notice, setNotice] = useState(null)
  const book = books.find((b) => b.id === bookId)
  const suggestions = book ? sentences.filter((s) => s.bookId === bookId) : []

  const submit = (e) => {
    e.preventDefault()
    const meta = book ? { bookId: book.id, title: book.title, author: book.author } : { title: manual.title.trim(), author: manual.author.trim() }
    const r = actions.addCard({ ...meta, text, source: 'own' })
    if (!r.ok) return setNotice(r)
    const gain = actions.earn('collect')
    setNotice({ ok: true, message: gain.ok ? `책장에 꽂았어요! ${gain.message}` : `책장에 꽂았어요! (${gain.message})` })
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-200 p-4">
      <h2 className="font-serif-kr text-lg font-bold text-ink">문장 수집하기</h2>
      <select value={bookId} onChange={(e) => { setBookId(e.target.value); setNotice(null) }} className="h-12 rounded-xl border border-line bg-surface-100 px-3 text-ink" aria-label="책 고르기">
        <option value={MANUAL}>책 직접 입력하기</option>
        {books.map((b) => <option key={b.id} value={b.id}>{b.title} · {b.author}</option>)}
      </select>
      {!book && (
        <div className="grid grid-cols-2 gap-2">
          <input value={manual.title} onChange={(e) => setManual({ ...manual, title: e.target.value })} placeholder="책 제목" maxLength={40} className="h-12 rounded-xl border border-line bg-surface-100 px-3 text-ink" />
          <input value={manual.author} onChange={(e) => setManual({ ...manual, author: e.target.value })} placeholder="지은이" maxLength={20} className="h-12 rounded-xl border border-line bg-surface-100 px-3 text-ink" />
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-ink-muted">예시 문장 (일부는 원문, 나머지는 새로 풀어 쓴 문장이에요. 누르면 아래 칸에 들어가요)</p>
          {suggestions.map((s) => (
            <button type="button" key={s.id} onClick={() => setText(s.text)} className="rounded-lg bg-surface-100 px-3 py-2 text-left text-sm text-ink-muted" style={{ minHeight: 44 }}>{s.text}</button>
          ))}
        </div>
      )}
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={320} placeholder="마음에 박힌 문장을 적어 보세요 (10자 이상)" className="rounded-xl border border-line bg-surface-100 p-3 text-ink" />
      <button type="submit" className="h-12 rounded-xl bg-carpet-red font-bold text-white">책장에 꽂기</button>
      <Notice notice={notice} />
    </form>
  )
}
