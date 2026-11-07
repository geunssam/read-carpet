import { useStore } from '../../storage/StoreContext'
import { useNav } from '../../navigation/NavContext'
import books from '../../data/books.json'
import BookCover from '../../components/BookCover'

// 숙련도 쌓기 시작한 책: 서재에 담은 책 + 문장을 모은 책. 같은 책 문장 3개면 '읽은 책'
export default function ReadingList() {
  const { state } = useStore()
  const { goTo } = useNav()
  const counts = {}
  state.shelf.forEach((c) => { if (c.bookId) counts[c.bookId] = (counts[c.bookId] || 0) + 1 })
  const ids = [...new Set([...(state.user.reading || []), ...Object.keys(counts)])]
  const list = ids.map((id) => books.find((b) => b.id === id)).filter(Boolean)

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-serif-kr text-lg font-bold text-ink">내 서재 <span className="text-sm font-normal text-ink-muted">{list.length}권</span></h2>
      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-5 text-center text-sm text-ink-muted">
          <p>아직 담은 책이 없어요.</p>
          <button onClick={() => goTo('plaza')} className="mt-2 h-11 rounded-xl bg-carpet-red px-4 font-bold text-white">광장에서 책 고르기</button>
        </div>
      ) : (
        <ul className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {list.map((b) => {
            const n = counts[b.id] || 0
            const done = n >= 3
            return (
              <li key={b.id} className="flex w-28 shrink-0 flex-col gap-1">
                <BookCover book={b} size="md" />
                <p className={`text-xs font-bold ${done ? 'text-gold-ink' : 'text-ink-muted'}`}>{done ? '읽은 책' : '읽는 중'} · 문장 {Math.min(n, 3)}/3</p>
                <div className="h-1.5 rounded-full bg-line"><div className="h-full rounded-full bg-carpet-red" style={{ width: `${Math.min(n, 3) / 3 * 100}%` }} /></div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
