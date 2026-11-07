const TABS = [
  { id: 'lobby', label: '로비' },
  { id: 'home', label: '내 서재' },
  { id: 'shop', label: '꾸미기' },
  { id: 'plaza', label: '광장' },
  { id: 'arena', label: '아레나' },
]

export default function BottomNav({ tab, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface-200" aria-label="주 메뉴">
      <ul className="mx-auto grid max-w-2xl grid-cols-5">
        {TABS.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => onChange(t.id)} aria-current={tab === t.id ? 'page' : undefined}
              className={`h-14 w-full text-sm font-bold ${tab === t.id ? 'border-t-2 border-carpet-red text-carpet-red' : 'border-t-2 border-transparent text-ink-muted'}`}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
