import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'

// 프로필 외부 공유: 휴대폰 공유창, 안 되면 주소 복사
export default function ShareButton() {
  const { state } = useStore()
  const [msg, setMsg] = useState('')
  const share = async () => {
    const data = { title: 'Read Carpet', text: `${state.user.nickname}의 레드카펫 서재 · ${state.user.title} · 문장 ${state.shelf.length}장`, url: location.origin }
    try {
      if (navigator.share) { await navigator.share(data); return }
      await navigator.clipboard.writeText(`${data.text} ${data.url}`)
      setMsg('주소를 복사했어요. 원하는 곳에 붙여 넣으세요.')
    } catch { setMsg('공유를 취소했거나 지원하지 않는 브라우저예요.') }
  }
  return (
    <>
      <button onClick={share} className="h-12 flex-1 rounded-xl border border-line bg-surface-200 font-bold text-ink">프로필 공유</button>
      {msg && <p role="status" className="w-full text-sm text-ink-muted">{msg}</p>}
    </>
  )
}
