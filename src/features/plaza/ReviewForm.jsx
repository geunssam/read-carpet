import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import useToast from './useToast'

export default function ReviewForm({ book, onSaved }) {
  const { actions } = useStore()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { message, showMessage } = useToast()

  const saveReview = (event) => {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanBody = body.trim()
    if (!cleanTitle || !cleanBody) return showMessage('제목과 본문을 모두 적어 주세요.')
    if (cleanTitle.length > 30) return showMessage('제목은 30자 이내로 적어 주세요.')
    if (cleanBody.length < 30 || cleanBody.length > 500) return showMessage('본문은 30자 이상 500자 이하로 적어 주세요.')
    actions.addForumPost({ bookId: book.id, title: cleanTitle, body: cleanBody })
    showMessage(actions.earn('review').message)
    setTitle('')
    setBody('')
    onSaved()
  }

  return (
    <form onSubmit={saveReview} className="rounded-2xl border border-line bg-surface-200 p-5">
      <h3 className="font-serif-kr text-lg font-bold">평론 쓰기</h3>
      <label className="mt-4 block text-sm">제목
        <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={30} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface-100 px-3 text-ink" />
      </label>
      <label className="mt-3 block text-sm">본문
        <textarea value={body} onChange={(event) => setBody(event.target.value)} minLength={30} maxLength={500} rows={5} className="mt-1 w-full rounded-lg border border-line bg-surface-100 p-3 text-ink" />
      </label>
      <button type="submit" className="mt-4 min-h-11 rounded-lg bg-carpet-red px-4 text-sm font-bold text-white">평론 올리기</button>
      {message && <p className="mt-3 text-sm text-gold-ink" role="status">{message}</p>}
    </form>
  )
}
