import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import users from '../../data/users.json'
import useToast from './useToast'
import { findUserName } from './plazaUtils'
import ClapButton from './ClapButton'

export default function PostDetail({ post, book, onBack }) {
  const { state, actions } = useStore()
  const [text, setText] = useState('')
  const { message, showMessage } = useToast()
  const comments = [...(post.comments || []), ...(state.forum.comments[post.id] || [])]

  const submitComment = (event) => {
    event.preventDefault()
    const cleanText = text.trim()
    if (!cleanText) return showMessage('댓글을 적어 주세요.')
    actions.addForumComment(post.id, cleanText, book.id)
    setText('')
    showMessage(actions.earn('comment').message)
  }

  return (
    <section className="space-y-5">
      <button type="button" onClick={onBack} className="min-h-11 rounded-lg border border-line px-4 text-sm">글 목록으로</button>
      <article className="rounded-2xl border border-line bg-surface-200 p-5">
        <p className="text-sm text-ink-muted">{findUserName(post.userId, users, state.user.nickname)} · {post.createdAt}</p>
        <h2 className="mt-2 font-serif-kr text-2xl font-bold break-keep">{post.title}</h2>
        <p className="mt-5 whitespace-pre-wrap leading-relaxed break-keep">{post.body}</p>
        <div className="mt-4"><ClapButton postId={post.id} /></div>
      </article>
      <section className="rounded-2xl border border-line bg-surface-200 p-5" aria-labelledby="comment-title">
        <h3 id="comment-title" className="font-serif-kr text-lg font-bold">댓글 {comments.length}개</h3>
        <div className="mt-3 space-y-3">
          {comments.map((comment, index) => <div key={`${comment.userId}-${index}`} className="border-t border-line pt-3"><p className="text-sm font-bold">{findUserName(comment.userId, users, state.user.nickname)}</p><p className="mt-1 text-sm break-keep">{comment.text}</p></div>)}
        </div>
        <form onSubmit={submitComment} className="mt-4">
          <label className="sr-only" htmlFor="forum-comment">댓글</label>
          <textarea id="forum-comment" value={text} onChange={(event) => setText(event.target.value)} rows={3} className="w-full rounded-lg border border-line bg-surface-100 p-3 text-ink" placeholder="댓글을 적어 주세요" />
          <button type="submit" className="mt-2 min-h-11 rounded-lg bg-carpet-red px-4 text-sm font-bold text-white">댓글 올리기</button>
        </form>
        {message && <p className="mt-3 text-sm text-gold-ink" role="status">{message}</p>}
      </section>
    </section>
  )
}
