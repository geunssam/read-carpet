import { useStore } from '../../storage/StoreContext'
import StepIntro from './StepIntro'
import StepCharacter from './StepCharacter'

const LABELS = ['시작', '캐릭터']

// 2단계: 별명 → 캐릭터 고르기. 단계는 user.onboardingStep에 저장되어 중간에 나가도 이어짐.
// (예전 4단계 저장값이 남아 있어도 캐릭터 단계로 보냄)
export default function OnboardingFlow() {
  const { state, actions } = useStore()
  const step = Math.min(Number(state.user.onboardingStep) || 0, 1)
  const go = (n, patch = {}) => actions.updateUser({ onboardingStep: n, ...patch })

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col bg-surface-100 px-5 py-6">
      <div className="mb-6" role="progressbar" aria-valuemin={0} aria-valuemax={1} aria-valuenow={step} aria-label="온보딩 진행">
        <div className="grid grid-cols-2 gap-1.5">
          {LABELS.map((l, i) => <div key={l} className={`h-1.5 rounded-full ${i <= step ? 'bg-carpet-red' : 'bg-line'}`} />)}
        </div>
        <p className="mt-2 text-xs text-ink-muted">{step + 1} / 2  {LABELS[step]}</p>
      </div>
      {step === 0 && <StepIntro go={go} />}
      {step === 1 && <StepCharacter go={go} />}
    </div>
  )
}
