import { useMemo, useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import books from '../../data/books.json'
import sentences from '../../data/sentences.json'
import useToast from './useToast'
import { localDateKey, stableNumber } from './plazaUtils'

function getQuestion(index) {
  const base = stableNumber(localDateKey())
  const sentence = sentences[(base + index) % sentences.length]
  const answer = books.find((book) => book.id === sentence.bookId)
  const others = books.filter((book) => book.id !== answer.id)
  const wrong = [0, 1, 2].map((offset) => others[(base + index * 7 + offset * 5) % others.length])
  const choices = [answer, ...wrong]
  return { sentence, answer, choices: choices.sort((a, b) => stableNumber(`${a.id}${index}`) - stableNumber(`${b.id}${index}`)) }
}

export default function TitleQuiz() {
  const { actions } = useStore()
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const { message, showMessage } = useToast()
  const question = useMemo(() => getQuestion(index), [index])

  const answerQuestion = (choice) => {
    if (answered) return
    setAnswered(true)
    if (choice.id === question.answer.id) showMessage(actions.earn('quiz').message)
    else showMessage(`정답은 『${question.answer.title}』이에요. 다음 문제도 천천히 풀어 봐요.`)
  }
  const nextQuestion = () => {
    setIndex((value) => value + 1)
    setAnswered(false)
    showMessage('')
  }

  return (
    <section className="rounded-2xl border border-line bg-surface-200 p-5" aria-labelledby="quiz-title">
      <h2 id="quiz-title" className="font-serif-kr text-xl font-bold">책 제목 맞히기</h2>
      <p className="mt-3 rounded-lg bg-spotlight p-4 font-serif-kr leading-relaxed break-keep">{question.sentence.text}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {question.choices.map((choice) => (
          <button key={choice.id} type="button" onClick={() => answerQuestion(choice)} className="min-h-11 rounded-lg border border-line px-3 text-left text-sm break-keep">
            {choice.title}
          </button>
        ))}
      </div>
      {message && <p className="mt-3 text-sm text-gold-ink" role="status">{message}</p>}
      {answered && <button type="button" onClick={nextQuestion} className="mt-3 min-h-11 rounded-lg bg-carpet-red px-4 text-sm font-bold text-white">다음 문제</button>}
    </section>
  )
}
