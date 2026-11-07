import Character from '../../components/Character'

const hide = (e) => { e.currentTarget.style.display = 'none' }
const Layer = ({ src }) => <img src={src} alt="" className="absolute inset-0 h-full w-full" onError={hide} />

// 싸이월드식 미니룸: 방 → 러그·가구 → 캐릭터 → 테두리 (그림은 public/assets/miniroom)
export default function MiniRoom({ user, hasReading }) {
  const eq = user.equipped
  const room = eq.room || 'room-01'
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface-200" style={{ imageRendering: 'pixelated' }}>
      <Layer src={`/assets/miniroom/${room}.svg`} />
      {['rug-carpet', 'shelf', 'lamp', 'trophy'].map((f) => <Layer key={f} src={`/assets/miniroom/${f}.svg`} />)}
      {hasReading && <Layer src="/assets/miniroom/reading-spot.svg" />}
      <div className="absolute inset-x-0 top-[22%] flex justify-center">
        <Character bodyColor={user.bodyColor} equipped={{ ...eq, bg: null }} size={150} rounded={false} transparent />
      </div>
      {eq.frame && <img src={`/assets/minihome/${eq.frame}.svg`} alt="" className="pointer-events-none absolute inset-0 h-full w-full" onError={hide} />}
    </div>
  )
}
