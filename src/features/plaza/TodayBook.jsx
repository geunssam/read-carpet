import { useStore } from '../../storage/StoreContext'
import BookCover from '../../components/BookCover'
import books from '../../data/books.json'
import useToast from './useToast'
import { localDateKey, stableNumber } from './plazaUtils'

export default function TodayBook() {
  const { actions } = useStore()
  const { message, showMessage } = useToast()
  const book = books[stableNumber(localDateKey()) % books.length]

  const confirmBook = () => {
    showMessage(actions.earn('todayBook').message)
  }

  return (
    <section className="rounded-2xl border border-line bg-surface-200 p-5" aria-labelledby="today-book-title">
      <p className="text-sm text-gold-ink">오늘의 추천 도서</p>
      <div className="mt-3 flex min-w-0 gap-4">
        <BookCover book={book} size="sm" />
        <div className="min-w-0 flex-1">
          <h2 id="today-book-title" className="font-serif-kr text-xl font-bold break-keep">{book.title}</h2>
          <p className="mt-1 text-sm text-ink-muted break-keep">{book.author}</p>
          <p className="mt-3 text-sm leading-relaxed break-keep">{book.blurb}</p>
          <button type="button" onClick={confirmBook} className="mt-4 min-h-11 rounded-lg bg-carpet-red px-4 text-sm font-bold text-white">
            확인했어요
          </button>
        </div>
      </div>
      {message && <p className="mt-3 text-sm text-gold-ink" role="status">{message}</p>}
    </section>
  )
}
