import { useStore } from '../storage/StoreContext'

// 로고 그림은 크림 바탕이 들어 있어서 어두운 모드에서도 크림 판 위에 올려 둠
export default function AppHeader() {
  const { state } = useStore()
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface-100 px-4 py-2">
      <div className="overflow-hidden rounded-lg bg-[#F4EEE4]">
        <img src="/assets/brand/logo-horizontal.png" alt="Read Carpet" className="h-10 w-auto" />
      </div>
      <span className="rounded-full bg-carpet-red px-3 py-1 text-sm font-bold text-white">숙련도 {state.user.hideScore ? '비공개' : state.user.mastery}</span>
    </header>
  )
}
