import { useStore } from '../../storage/StoreContext'
import { baseClaps } from './plazaUtils'

// 리뷰에 박수 보내기 (한 글에 한 번, 다시 누르면 취소)
export default function ClapButton({ postId }) {
  const { state, actions } = useStore()
  const mine = Boolean(state.forum.claps?.[postId])
  const count = (postId.startsWith('mp') ? 0 : baseClaps(postId)) + (mine ? 1 : 0)
  return (
    <button type="button" onClick={(e) => { e.stopPropagation(); actions.toggleClap(postId) }} aria-pressed={mine}
      className={`min-h-11 rounded-full px-4 text-sm font-bold ${mine ? 'bg-carpet-red text-white' : 'border border-line text-ink-muted'}`}>
      박수 {count}
    </button>
  )
}
