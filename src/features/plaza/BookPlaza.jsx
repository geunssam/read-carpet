import { useState } from 'react'
import BookCover from '../../components/BookCover'
import books from '../../data/books.json'
import TodayBook from './TodayBook'
import TitleQuiz from './TitleQuiz'
import BookForum from './BookForum'
import EmptySearch from './BookSearch'
import { CATEGORIES, filterBooks } from './plazaUtils'

// 검색어는 새로고침해도 남도록 세션 저장소에 보관
const SKEY = 'rc_search'
const readSearch = () => { try { return sessionStorage.getItem(SKEY) || '' } catch { return '' } }

export default function BookPlaza() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [category, setCategory] = useState('all')
  const [query, setQueryState] = useState(readSearch)
  const setQuery = (q) => { setQueryState(q); try { sessionStorage.setItem(SKEY, q) } catch { /* 무시 */ } }
  const list = filterBooks(books, category, query)

  if (selectedBook) return <BookForum book={selectedBook} onBack={() => setSelectedBook(null)} />
  return (
    <div className="space-y-6">
      <TodayBook />
      <section aria-labelledby="book-grid-title" className="space-y-4">
        <h2 id="book-grid-title" className="font-serif-kr text-2xl font-bold">카테고리별 책</h2>
        <label className="block">
          <span className="sr-only">책 제목이나 지은이 검색</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="책 제목이나 지은이 검색" className="h-12 w-full rounded-xl border border-line bg-surface-200 px-4 text-ink" />
        </label>
        <div role="tablist" aria-label="카테고리" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={category === c.id} onClick={() => setCategory(c.id)}
              className={`h-11 shrink-0 rounded-full px-4 text-sm font-bold ${category === c.id ? 'bg-carpet-red text-white' : 'border border-line text-ink-muted'}`}>
              {c.label}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <EmptySearch query={query || '이 칸'} onPickQuery={(q) => { setCategory('all'); setQuery(q) }} onOpenBook={setSelectedBook} />
        ) : (
          <div className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-3 sm:grid-cols-4">
            {list.map((book) => (
              <button key={book.id} type="button" onClick={() => setSelectedBook(book)} className="min-h-11 min-w-0 text-left">
                <BookCover book={book} size="md" />
                <span className="mt-2 block text-sm font-bold break-keep">{book.title}</span>
              </button>
            ))}
          </div>
        )}
      </section>
      <TitleQuiz />
    </div>
  )
}
