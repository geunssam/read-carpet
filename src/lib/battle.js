import books from '../data/books.json'
import sentences from '../data/sentences.json'

export const TIER_LABEL = { beginner: '입문', intermediate: '중급', advanced: '고수', master: '마스터' }

// 상대 책장 항목({sentenceId, power})에 문장·제목·저자를 붙임
export function hydrateOppCard(entry) {
  const s = sentences.find((x) => x.id === entry.sentenceId)
  const b = books.find((x) => x.id === s?.bookId)
  return { sentenceId: entry.sentenceId, bookId: s?.bookId ?? null, text: s?.text ?? '', title: b?.title ?? '', author: b?.author ?? '', power: entry.power }
}

// 상대 카드 3장을 무작위로 냄
export function pickOpponentCards(opponent) {
  const copy = [...opponent.shelf].sort(() => Math.random() - 0.5)
  return copy.slice(0, 3).map(hydrateOppCard)
}

// 3판 2선승. 동점이면 도전자(나)가 이김 (처음 하는 사람도 입문 상대는 꼭 이기게)
export function resolveBattle(myCards, oppCards) {
  const rounds = myCards.map((c, i) => ({ mine: c.score, theirs: oppCards[i].power, win: c.score >= oppCards[i].power }))
  return { rounds, won: rounds.filter((r) => r.win).length >= 2 }
}
