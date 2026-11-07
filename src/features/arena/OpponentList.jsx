import { useStore } from '../../storage/StoreContext'
import users from '../../data/users.json'
import Character from '../../components/Character'
import Notice from '../../components/Notice'
import { TIER_LABEL } from '../../lib/battle'

export default function OpponentList({ onChallenge }) {
  const { state } = useStore()
  const lacking = state.shelf.length < 3
  const wins = state.battles.filter((b) => b.won).length

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-serif-kr text-2xl font-bold text-ink">아레나</h1>
        <p className="mt-1 text-sm text-ink-muted">문장 카드 3장으로 3판 2선승. 카드마다 숨은 점수가 있어요. 이기면 상대 문장을 복사해 와요.</p>
        <p className="mt-1 text-xs text-ink-muted">지금까지 {state.battles.length}번 싸워 {wins}번 이겼어요.</p>
      </div>
      {lacking && <Notice notice={{ ok: false, message: '카드가 3장 이상 있어야 도전할 수 있어요. 내 홈피에서 문장을 더 모아 보세요.' }} />}
      <ul className="flex flex-col gap-3">
        {users.map((u) => (
          <li key={u.id} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-200 p-3">
            <Character bodyColor={u.bodyColor} equipped={u.equipped} size={80} />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink">{u.nickname}</p>
              <p className="text-xs text-gold-ink">{TIER_LABEL[u.tier]} · {u.title}</p>
              <p className="truncate text-xs text-ink-muted">{u.intro}</p>
              {u.tier === 'beginner' && <p className="text-xs font-bold text-carpet-red">처음이라면 여기부터!</p>}
            </div>
            <button disabled={lacking} onClick={() => onChallenge(u)} className="h-11 shrink-0 rounded-xl bg-carpet-red px-4 font-bold text-white disabled:opacity-40">도전</button>
          </li>
        ))}
      </ul>
      {state.battles.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-bold text-ink">최근 기록</h2>
          <ul className="flex flex-col gap-1 text-sm text-ink-muted">
            {state.battles.slice(0, 5).map((b) => (
              <li key={b.id}>{b.at} · {users.find((u) => u.id === b.opponentId)?.nickname} · <b className={b.won ? 'text-gold-ink' : 'text-ink-muted'}>{b.won ? '승' : '패'}</b></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
