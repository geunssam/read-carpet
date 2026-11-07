import Character from '../../components/Character'
import { COLS, ROWS } from './lobbyMap'

// 지도 위에 서 있는 캐릭터. 칸 좌표를 퍼센트로 바꿔 화면 크기가 달라도 맞음
const pct = (x, y) => ({ left: `${(x / COLS) * 100}%`, top: `${(y / ROWS) * 100}%` })

export default function Walker({ x, y, face, user, size = 1.5, npc = false }) {
  const w = (size / COLS) * 100
  return (
    <div
      className="absolute transition-[left,top] duration-150 ease-linear"
      style={{ ...pct(x, y), width: `${w}%`, aspectRatio: '1', transform: `translate(${-(size - 1) / 2 * 100 / size}%, ${-(size - 1) * 100 / size}%)` }}
      aria-hidden="true"
    >
      <div className="h-full w-full" style={{ transform: `scaleX(${face})` }}>
        <Character
          bodyColor={npc ? 'ink' : user.bodyColor}
          equipped={npc ? { hat: 'hat-scholar', glasses: 'glasses-round' } : { ...user.equipped, bg: null, effect: user.equipped.effect }}
          size="100%" rounded={false} transparent
        />
      </div>
    </div>
  )
}
