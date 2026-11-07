import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import MiniRoom from './MiniRoom'
import ShareButton from './ShareButton'
import Notice from '../../components/Notice'


export default function HomeHeader({ goTo }) {
  const { state, actions } = useStore()
  const { user } = state
  const [notice, setNotice] = useState(null)

  const attend = () => setNotice(actions.earn('attendance'))

  return (
    <section className="flex flex-col gap-3">
      <MiniRoom user={user} hasReading={(user.reading || []).length > 0 || state.shelf.length > 0} />
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-gold-ink">{user.title}</p>
          <h1 className="font-serif-kr text-2xl font-bold text-ink">{user.nickname}의 책장</h1>
        </div>
        <button onClick={() => actions.updateUser({ hideScore: !user.hideScore })} aria-pressed={user.hideScore} className="rounded-full border border-line px-4 text-sm text-ink-muted">
          점수 {user.hideScore ? '숨김' : '공개'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={attend} className="h-12 flex-1 rounded-xl bg-carpet-red font-bold text-white">출석 체크</button>
        <button onClick={() => goTo('shop')} className="h-12 flex-1 rounded-xl border border-line bg-surface-200 font-bold text-ink">꾸미기</button>
        <ShareButton />
      </div>
      <Notice notice={notice} />
    </section>
  )
}
