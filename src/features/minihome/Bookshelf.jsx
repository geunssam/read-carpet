import { useStore } from '../../storage/StoreContext'
import SentenceCard from '../../components/SentenceCard'

export default function Bookshelf() {
  const { state } = useStore()
  const { shelf, user } = state
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-serif-kr text-lg font-bold text-ink">문장 책장 <span className="text-sm font-normal text-ink-muted">문장 {shelf.length}장</span></h2>
      {shelf.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-ink-muted">아직 꽂힌 문장이 없어요. 위에서 첫 문장을 수집해 보세요.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {[...shelf].reverse().map((c) => (
            <li key={c.id}>
              <SentenceCard card={c} showScore hidden={user.hideScore} />
              {c.source === 'copied' && <p className="mt-1 text-right text-xs text-gold-ink">아레나에서 복사해 온 문장</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
