// 캐릭터 조각을 같은 200x200 칸에 겹쳐 쌓는다. 아래부터: 배경 → 효과 → 몸 → 안경 → 모자
// 2차: 싸이월드식 픽셀 캐릭터 (이전 평면 그림은 /assets/character/ 에 그대로 남아 있음)
const base = '/assets/character-pixel/'

function Layer({ id }) {
  if (!id) return null
  return (
    <img
      src={`${base}${id}.svg`} alt="" draggable={false}
      className="absolute inset-0 h-full w-full select-none [image-rendering:pixelated]"
      onError={(e) => { e.currentTarget.style.display = 'none' }}
    />
  )
}

export default function Character({ bodyColor = 'red', equipped = {}, size = 160, rounded = true, transparent = false }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${transparent ? '' : 'bg-surface-200'} ${rounded ? 'rounded-2xl' : ''}`}
      style={{ width: size, height: size }} role="img" aria-label="내 캐릭터"
    >
      <Layer id={equipped.bg} />
      <Layer id={equipped.effect} />
      <Layer id={`body-${bodyColor}`} />
      <Layer id={equipped.glasses} />
      <Layer id={equipped.hat} />
    </div>
  )
}
