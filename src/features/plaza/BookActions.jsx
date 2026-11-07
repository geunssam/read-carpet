import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import { useNav } from '../../navigation/NavContext'
import users from '../../data/users.json'
import sentences from '../../data/sentences.json'
import Notice from '../../components/Notice'
import { opponentForBook } from './plazaUtils'

// 도서 페이지 단추: 내 서재에 담기 / 이 책으로 아레나
export default function BookActions({ book }) {
  const { state, actions } = useStore()
  const { goTo } = useNav()
  const [notice, setNotice] = useState(null)
  const inShelf = (state.user.reading || []).includes(book.id)
  const rival = opponentForBook(users, sentences, book.id)

  const toArena = () => {
    if (state.shelf.length < 3) return setNotice({ ok: false, message: '아레나에는 문장 카드 3장이 필요해요. 내 홈피에서 문장을 더 모아 보세요.' })
    goTo('arena', { opponentId: rival.id, bookTitle: book.title })
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setNotice(actions.addReading(book.id))} disabled={inShelf}
          className="min-h-12 rounded-xl bg-carpet-red px-3 font-bold text-white disabled:opacity-50">
          {inShelf ? '내 서재에 있어요' : '내 서재에 담기'}
        </button>
        <button type="button" onClick={toArena} className="min-h-12 rounded-xl border border-carpet-red px-3 font-bold text-carpet-red">
          이 책으로 아레나
        </button>
      </div>
      <p className="text-xs text-ink-muted">아레나 상대: {rival.nickname} (이 책을 아는 사람)</p>
      <Notice notice={notice} />
    </div>
  )
}
