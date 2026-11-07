import Character from '../../components/Character'
import BookCover from '../../components/BookCover'
import SentenceCard from '../../components/SentenceCard'
import books from '../../data/books.json'
import sentences from '../../data/sentences.json'
import { useStore } from '../../storage/StoreContext'
import { useNav } from '../../navigation/NavContext'
import Notice from '../../components/Notice'
import { useState } from 'react'

export default function VisitHome({ user, onBack }) {
  const { state } = useStore()
  const { goTo } = useNav()
  const [notice, setNotice] = useState(null)
  const challenge = () => {
    if (state.shelf.length < 3) return setNotice({ ok: false, message: '대결하려면 문장 카드 3장이 필요해요.' })
    goTo('arena', { opponentId: user.id })
  }
  const favorites = user.favoriteBookIds.map((id) => books.find((book) => book.id === id)).filter(Boolean)
  const cards = user.shelf.map((item) => {
    const sentence = sentences.find((value) => value.id === item.sentenceId)
    const book = books.find((value) => value.id === sentence?.bookId)
    return { text: sentence?.text || '', title: book?.title || '알 수 없는 책', author: book?.author || '', score: item.power }
  })

  return (
    <section className="space-y-6">
      <button type="button" onClick={onBack} className="min-h-11 rounded-lg border border-line px-4 text-sm">자유 광장으로</button>
      <header className="rounded-2xl bg-velvet p-5 text-white">
        <div className="flex min-w-0 items-center gap-4"><Character bodyColor={user.bodyColor} equipped={user.equipped} size={144} /><div className="min-w-0"><p className="text-sm">{user.title}</p><h1 className="mt-1 font-serif-kr text-2xl font-bold break-keep">{user.nickname}</h1><p className="mt-3 text-sm leading-relaxed break-keep">{user.intro}</p></div></div>
      </header>
      <button type="button" onClick={challenge} className="min-h-12 w-full rounded-xl bg-carpet-red font-bold text-white">{user.nickname}에게 대결 신청</button>
      <Notice notice={notice} />
      <section><h2 className="font-serif-kr text-xl font-bold">좋아하는 책</h2><div className="mt-3 flex flex-wrap gap-3">{favorites.map((book) => <BookCover key={book.id} book={book} size="sm" />)}</div></section>
      <section><h2 className="font-serif-kr text-xl font-bold">문장 책장</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{cards.map((card, index) => <SentenceCard key={`${user.id}-${index}`} card={card} showScore />)}</div></section>
    </section>
  )
}
