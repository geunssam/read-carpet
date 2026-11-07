import Notice from '../../components/Notice'

// 문 앞에 서면 나오는 안내 카드. Enter / 스페이스 / 단추로 들어감
export default function PlacePrompt({ place, notice, onEnter }) {
  if (!place) {
    return <p className="rounded-xl bg-surface-200 p-3 text-center text-sm text-ink-muted">지도를 눌러 걸어가 보세요. 문 앞 발판에 서면 이곳에 안내가 떠요.</p>
  }
  return (
    <div className="pop flex flex-col gap-1.5 rounded-xl border border-carpet-red bg-surface-200 p-3" role="group" aria-label={`${place.name} 앞`}>
      <p className="font-bold text-ink">{place.name}</p>
      <p className="text-sm text-ink-muted">{place.desc}</p>
      <button type="button" onClick={onEnter} className="h-11 rounded-xl bg-carpet-red font-bold text-white">
        {place.kind === 'attend' ? '출석 도장 받기' : '들어가기'} <span className="text-xs opacity-80">(Enter)</span>
      </button>
      <Notice notice={notice} />
    </div>
  )
}
