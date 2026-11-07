// 화면 안에 보이는 한 줄 안내 (ok면 금색 강조, 아니면 빨강)
export default function Notice({ notice }) {
  if (!notice) return null
  return (
    <p role="status" className={`rounded-lg px-3 py-2 text-sm font-bold ${notice.ok ? 'bg-spotlight text-gold-ink' : 'bg-carpet-red/10 text-carpet-red'}`}>
      {notice.message}
    </p>
  )
}
