import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'

export default function SettingsPanel() {
  const { actions } = useStore()
  const [sure, setSure] = useState(false)
  return (
    <section className="border-t border-line pt-4 text-center">
      {sure ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-bold text-carpet-red">캐릭터, 책장, 숙련도가 모두 지워져요. 정말 지울까요?</p>
          <div className="flex gap-2">
            <button onClick={() => setSure(false)} className="h-11 rounded-xl border border-line px-5 text-ink-muted">취소</button>
            <button onClick={actions.resetAll} className="h-11 rounded-xl bg-carpet-red px-5 font-bold text-white">모두 지우기</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setSure(true)} className="h-11 text-sm text-ink-muted underline">내 기록 지우기</button>
      )}
    </section>
  )
}
