import { useStore } from '../../storage/StoreContext'
import books from '../../data/books.json'
import users from '../../data/users.json'
import BookCover from '../../components/BookCover'
import Character from '../../components/Character'

export default function Recommendations() {
  const { state } = useStore()
  const { user, shelf } = state
  const owned = new Set(shelf.map((c) => c.bookId))
  // 같은 취향 책을 먼저, 모자라면 다른 책으로 채움
  const recBooks = [...books.filter((b) => b.taste === user.taste), ...books.filter((b) => b.taste !== user.taste)].filter((b) => !owned.has(b.id)).slice(0, 3)
  const recUsers = [...users.filter((u) => u.taste === user.taste), ...users.filter((u) => u.taste !== user.taste)].slice(0, 2)

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-serif-kr text-lg font-bold text-ink">내 취향 추천</h2>
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {recBooks.map((b) => (
            <li key={b.id} className="flex w-32 shrink-0 flex-col gap-1">
              <BookCover book={b} size="md" />
              <p className="text-xs text-ink-muted">{b.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-bold text-ink">나와 비슷한 취향의 홈피</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {recUsers.map((u) => (
            <li key={u.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface-200 p-3">
              <Character bodyColor={u.bodyColor} equipped={u.equipped} size={64} />
              <div className="min-w-0">
                <p className="font-bold text-ink">{u.nickname} <span className="text-xs font-normal text-gold-ink">{u.title}</span></p>
                <p className="text-sm text-ink-muted">{u.intro}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
