import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import Character from '../../components/Character'
import { TASTE_MAP } from '../../lib/tasteMap'

const WELCOME_GIFT = 30 // 입장 선물 숙련도 (첫 꾸미기 물건을 살 수 있게)
const CHOICES = ['classic', 'humanities', 'essay'] // 캐릭터를 고르면 취향도 함께 정해짐

export default function StepCharacter({ go }) {
  const { state, actions } = useStore()
  const [taste, setTaste] = useState('classic')
  const pick = TASTE_MAP[taste]

  const finish = () => {
    actions.updateUser({ taste, bodyColor: pick.bodyColor, title: pick.title, mastery: state.user.mastery + WELCOME_GIFT, onboardingStep: 'done' })
  }

  return (
    <section className="flex flex-1 flex-col items-center gap-5 text-center">
      <div>
        <h2 className="font-serif-kr text-2xl font-bold text-ink">{state.user.nickname}님, 누구로 입장할까요?</h2>
        <p className="mt-1 text-sm text-ink-muted">마음에 드는 캐릭터를 골라요. 나중에 바꿀 수 있어요.</p>
      </div>
      <ul className="grid w-full grid-cols-3 gap-2" role="radiogroup" aria-label="캐릭터 고르기">
        {CHOICES.map((t) => {
          const c = TASTE_MAP[t]
          const on = taste === t
          return (
            <li key={t}>
              <button
                role="radio" aria-checked={on} onClick={() => setTaste(t)}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl border p-2 ${on ? 'border-carpet-red bg-spotlight ring-2 ring-carpet-red' : 'border-line bg-surface-200'}`}
                style={{ minHeight: 44 }}
              >
                <Character bodyColor={c.bodyColor} equipped={{}} size={88} />
                <span className="text-xs font-bold text-ink break-keep">{c.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="flex flex-col items-center gap-2">
        <Character bodyColor={pick.bodyColor} equipped={{}} size={180} />
        <p className="rounded-full bg-spotlight px-4 py-1.5 font-bold text-gold-ink">{pick.title}</p>
        <p className="text-xs text-ink-muted">{pick.label} 쪽 책을 먼저 추천해 드려요.</p>
      </div>
      <p className="rounded-xl bg-surface-200 px-4 py-2 text-sm text-ink-muted">입장 선물로 숙련도 <b className="text-ink">{WELCOME_GIFT}점</b>을 드려요.</p>
      <div className="mt-auto flex w-full gap-3 pt-2">
        <button onClick={() => go(0)} className="h-12 rounded-xl border border-line px-5 font-bold text-ink-muted">이전</button>
        <button onClick={finish} className="h-12 flex-1 rounded-xl bg-carpet-red font-bold text-white">도서관 입장</button>
      </div>
    </section>
  )
}
