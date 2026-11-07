import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import { resolveBattle } from '../../lib/battle'
import Notice from '../../components/Notice'
import SentenceCard from '../../components/SentenceCard'

// 한 장씩 공개 → 결과 → 이겼으면 상대 문장 하나를 복사해 옴
export default function BattleReveal({ opponent, myCards, oppCards, onDone }) {
  const { actions } = useStore()
  const [shown, setShown] = useState(0)
  const [result, setResult] = useState(null)
  const [notice, setNotice] = useState(null)
  const [finished, setFinished] = useState(false)

  const reveal = () => {
    const n = shown + 1
    setShown(n)
    if (n < 3) return
    const r = resolveBattle(myCards, oppCards)
    setResult(r)
    if (!r.won) {
      actions.addBattle({ opponentId: opponent.id, won: false, rounds: r.rounds, gainedCardId: null })
      setNotice(actions.earn('arenaLose'))
      setFinished(true)
    }
  }

  const copyCard = (c) => {
    const r = actions.addCard({ bookId: c.bookId, sentenceId: c.sentenceId, text: c.text, title: c.title, author: c.author, source: 'copied', score: c.power })
    if (!r.ok) return setNotice({ ok: false, message: `${r.message} 다른 문장을 골라 보세요.` })
    actions.addBattle({ opponentId: opponent.id, won: true, rounds: result.rounds, gainedCardId: r.card.id })
    const e = actions.earn('arenaWin')
    setNotice({ ok: true, message: `문장을 복사해 왔어요! ${e.message}` })
    setFinished(true)
  }
  const skipCopy = () => {
    actions.addBattle({ opponentId: opponent.id, won: true, rounds: result.rounds, gainedCardId: null })
    setNotice(actions.earn('arenaWin'))
    setFinished(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-serif-kr text-2xl font-bold text-ink">나 vs {opponent.nickname}</h1>
      <ul className="flex flex-col gap-4">
        {myCards.map((mine, i) => {
          const open = i < shown
          const rd = result?.rounds[i]
          return (
            <li key={mine.id} className="grid grid-cols-2 gap-2">
              <div><p className="mb-1 text-xs text-ink-muted">{i + 1}번 판 · 나</p><SentenceCard card={mine} showScore /></div>
              <div>
                <p className="mb-1 text-xs text-ink-muted">상대</p>
                {open ? (
                  <div className="flip-in"><SentenceCard card={oppCards[i]} showScore /></div>
                ) : (
                  <div className="flex h-full min-h-28 items-center justify-center rounded-xl bg-velvet p-2">
                    <img src="/assets/ui/card-back.svg" alt="숨겨진 상대 카드" className="h-28 w-auto max-w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                )}
              </div>
              {rd && <p className={`col-span-2 text-center text-sm font-bold ${rd.win ? 'text-gold-ink' : 'text-ink-muted'}`}>{rd.win ? '이겼어요' : '졌어요'} ({rd.mine} 대 {rd.theirs})</p>}
            </li>
          )
        })}
      </ul>
      {!result && <button onClick={reveal} className="h-12 rounded-xl bg-carpet-red font-bold text-white">{shown === 0 ? '첫 카드 공개' : shown < 2 ? '다음 카드 공개' : '마지막 카드 공개'}</button>}
      {result && (
        <section className={`pop flex flex-col gap-3 rounded-2xl p-4 text-center ${result.won ? 'bg-spotlight' : 'bg-surface-200'}`}>
          <p className="font-serif-kr text-2xl font-bold text-ink">{result.won ? '승리!' : '아쉽게 졌어요'}</p>
          {result.won && !finished && (
            <>
              <p className="text-sm text-ink-muted">상대 문장 중 하나를 내 책장으로 복사해 와요.</p>
              <ul className="flex flex-col gap-2 text-left">
                {oppCards.map((c) => <li key={c.sentenceId}><SentenceCard card={c} onClick={() => copyCard(c)} /></li>)}
              </ul>
              <button onClick={skipCopy} className="h-11 text-sm text-ink-muted underline">복사 없이 끝내기</button>
            </>
          )}
          <Notice notice={notice} />
          {finished && <button onClick={onDone} className="h-12 rounded-xl bg-carpet-red font-bold text-white">아레나로 돌아가기</button>}
        </section>
      )}
    </div>
  )
}
