import { useStore } from './storage/StoreContext'
import AppHeader from './components/AppHeader'
import OnboardingFlow from './features/onboarding/OnboardingFlow'
import LobbyPage from './features/lobby/LobbyPage'

// 화면은 도서관 로비 하나. 내 서재·꾸미기·광장·아레나는 로비의 문을 열면 창(모달)으로 뜸.
export default function App() {
  const { state } = useStore()

  // 온보딩을 끝내지 않았으면 마지막 단계부터 이어서 진행
  if (state.user.onboardingStep !== 'done') return <OnboardingFlow />

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col bg-surface-100">
      <AppHeader />
      <main className="flex-1 px-4 pb-8 pt-4"><LobbyPage /></main>
    </div>
  )
}
