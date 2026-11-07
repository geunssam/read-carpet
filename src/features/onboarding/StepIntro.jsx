import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'

export default function StepIntro({ go }) {
  const { state } = useStore()
  const [name, setName] = useState(state.user.nickname)
  const [err, setErr] = useState('')

  const next = () => {
    const n = name.trim()
    if (!n) return setErr('별명을 먼저 적어 주세요.')
    if (n.length > 12) return setErr('별명은 12자 이하로 적어 주세요.')
    go(1, { nickname: n })
  }
  return (
    <section className="flex flex-1 flex-col justify-center gap-6">
      <div>
        {/* 진입 연출: 로고 → 레드카펫이 펼쳐짐 → 글이 떠오름 */}
        <div className="mx-auto mb-2 w-56 overflow-hidden rounded-2xl bg-[#F4EEE4]">
          <img src="/assets/brand/logo-square.png" alt="Read Carpet 로고" className="w-full" />
        </div>
        <div className="carpet-unroll mx-auto mb-6 h-2 w-56 rounded-full bg-carpet-red" aria-hidden="true" />
        <h1 className="fade-up font-serif-kr text-3xl font-bold leading-tight text-ink">책 한 권 안 읽어도,<br />레드 카펫은 걸을 수 있어요</h1>
        <p className="mt-3 text-ink-muted">마음에 드는 문장 하나로 시작해요. 나만의 캐릭터와 미니홈피가 기다려요.</p>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-bold text-ink">내 별명</span>
        <input
          value={name} onChange={(e) => { setName(e.target.value); setErr('') }} maxLength={20} placeholder="예: 새벽서재"
          className="h-12 w-full rounded-xl border border-line bg-surface-200 px-4 text-ink outline-none focus:border-carpet-red"
        />
      </label>
      {err && <p role="alert" className="text-sm font-bold text-carpet-red">{err}</p>}
      <button onClick={next} className="h-14 rounded-xl bg-carpet-red text-lg font-bold text-white">시작하기</button>
    </section>
  )
}
