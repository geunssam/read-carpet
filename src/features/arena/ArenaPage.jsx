import { useEffect, useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import { pickOpponentCards } from '../../lib/battle'
import { useNav } from '../../navigation/NavContext'
import users from '../../data/users.json'
import OpponentList from './OpponentList'
import PickCards from './PickCards'
import BattleReveal from './BattleReveal'

// 화면 순서: 상대 고르기(list) → 내 카드 3장 고르기(pick) → 한 장씩 공개(battle)
export default function ArenaPage() {
  const { state } = useStore()
  const [phase, setPhase] = useState('list')
  const [opponent, setOpponent] = useState(null)
  const [myCards, setMyCards] = useState([])
  const [oppCards, setOppCards] = useState([])

  const challenge = (u) => { setOpponent(u); setPhase('pick') }
  const start = (cards) => { setMyCards(cards); setOppCards(pickOpponentCards(opponent)); setPhase('battle') }
  const back = () => { setPhase('list'); setOpponent(null) }

  // 도서 페이지·남의 홈피에서 넘어오면 그 상대로 바로 카드 고르기
  const { intent, clearIntent } = useNav()
  useEffect(() => {
    const u = intent?.opponentId && users.find((x) => x.id === intent.opponentId)
    if (u) challenge(u)
    if (intent) clearIntent()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'pick') return <PickCards shelf={state.shelf} opponent={opponent} onStart={start} onBack={back} />
  if (phase === 'battle') return <BattleReveal opponent={opponent} myCards={myCards} oppCards={oppCards} onDone={back} />
  return <OpponentList onChallenge={challenge} />
}
