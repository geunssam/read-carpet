import sentences from '../data/sentences.json'

// 문장 카드 한 장. showScore가 true면 숙련도 점수도 보여 줌
// sentenceId가 있으면 '원문' 또는 '풀어 쓴 문장' 표시를 붙임
export default function SentenceCard({ card, showScore = false, hidden = false, onClick, selected = false }) {
  const Tag = onClick ? 'button' : 'div'
  const origin = sentences.find((x) => x.id === card.sentenceId)?.origin
  return (
    <Tag
      onClick={onClick}
      className={`flex w-full flex-col gap-2 rounded-xl border bg-surface-200 p-4 text-left ${selected ? 'border-carpet-red ring-2 ring-carpet-red' : 'border-line'}`}
    >
      <p className="font-serif-kr text-[15px] leading-relaxed text-ink">
        <span className="bg-spotlight px-0.5">{card.text}</span>
      </p>
      <p className="flex items-center justify-between gap-2 text-xs text-ink-muted">
        <span className="break-keep">『{card.title}』 {card.author}{origin && <em className="ml-1 rounded bg-surface-100 px-1 not-italic text-[10px]">{origin === '원문' ? '원문' : '풀어 쓴 문장'}</em>}</span>
        {showScore && <span className="shrink-0 font-bold text-gold-ink">{hidden ? '점수 숨김' : `${card.score ?? card.power}점`}</span>}
      </p>
    </Tag>
  )
}
