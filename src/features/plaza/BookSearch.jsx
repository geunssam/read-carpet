import { useStore } from '../../storage/StoreContext'
import books from '../../data/books.json'
import BookCover from '../../components/BookCover'
import { closestBook } from './plazaUtils'

// 검색 결과가 없을 때: 재치 있는 문구 + 오타 추천 + 내 취향 책 추천
export default function EmptySearch({ query, onPickQuery, onOpenBook }) {
  const { state } = useStore()
  const guess = closestBook(books, query)
  const recs = books.filter((b) => b.taste === state.user.taste).slice(0, 3)
  return (
    <div className="space-y-4 rounded-2xl border border-dashed border-line p-5 text-center">
      <p className="font-bold text-ink">「{query}」은(는) 아직 레드카펫에 도착하지 않았어요.</p>
      <p className="text-sm text-ink-muted">드레스를 고르는 중인가 봐요. 대신 이 책들은 벌써 와 있어요.</p>
      {guess && (
        <button type="button" onClick={() => onPickQuery(guess.title)} className="min-h-11 rounded-full bg-spotlight px-4 text-sm font-bold text-gold-ink">
          혹시 『{guess.title}』을(를) 찾으셨나요?
        </button>
      )}
      <div className="flex justify-center gap-3">
        {recs.map((b) => (
          <button key={b.id} type="button" onClick={() => onOpenBook(b)} aria-label={b.title} style={{ minHeight: 0, minWidth: 0 }}>
            <BookCover book={b} size="sm" />
          </button>
        ))}
      </div>
    </div>
  )
}
