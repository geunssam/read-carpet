import { useState } from 'react'
import BookPlaza from './BookPlaza'
import FreePlaza from './FreePlaza'

const TABS = ['책 광장', '자유 광장']

export default function PlazaPage() {
  const [tab, setTab] = useState(TABS[0])

  return (
    <div className="min-w-0 py-2 text-ink">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6">
          <p className="text-sm text-ink-muted">읽고, 나누고, 서로의 서재를 만나요.</p>
          <h1 className="mt-1 font-serif-kr text-3xl font-bold break-keep">광장</h1>
        </header>
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-surface-200 p-2" role="tablist" aria-label="광장 탭">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`min-h-11 rounded-lg px-3 font-serif-kr break-keep ${tab === item ? 'bg-carpet-red text-white' : 'text-ink-muted'}`}
            >
              {item}
            </button>
          ))}
        </div>
        {tab === '책 광장' ? <BookPlaza /> : <FreePlaza />}
      </div>
    </div>
  )
}
