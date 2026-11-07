import { useMemo, useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import BookCover from '../../components/BookCover'
import users from '../../data/users.json'
import forum from '../../data/forum.json'
import ReviewForm from './ReviewForm'
import BookActions from './BookActions'
import ClapButton from './ClapButton'
import PostDetail from './PostDetail'
import { findUserName, orderForumPosts } from './plazaUtils'

export default function BookForum({ book, onBack }) {
  const { state } = useStore()
  const [selectedPost, setSelectedPost] = useState(null)
  const posts = useMemo(() => orderForumPosts([...state.forum.posts, ...forum].filter((post) => post.bookId === book.id)), [book.id, state.forum.posts])

  if (selectedPost) return <PostDetail post={selectedPost} book={book} onBack={() => setSelectedPost(null)} />
  return (
    <section className="space-y-6">
      <button type="button" onClick={onBack} className="min-h-11 rounded-lg border border-line px-4 text-sm">책 목록으로</button>
      <header className="flex gap-4 rounded-2xl bg-velvet p-5 text-white">
        <BookCover book={book} size="sm" />
        <div className="min-w-0"><p className="text-sm">도서 페이지</p><h1 className="mt-1 font-serif-kr text-2xl font-bold break-keep">{book.title}</h1><p className="mt-2 text-sm break-keep">{book.blurb}</p></div>
      </header>
      <BookActions book={book} />
      <section aria-labelledby="forum-list-title">
        <h2 id="forum-list-title" className="font-serif-kr text-xl font-bold">리뷰와 포럼</h2>
        <div className="mt-3 space-y-3">
          {posts.length === 0 && <p className="rounded-xl bg-surface-200 p-4 text-sm text-ink-muted">아직 글이 없어요. 첫 평론을 남겨 보세요.</p>}
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-2 rounded-xl border border-line bg-surface-200 p-3">
              <button type="button" onClick={() => setSelectedPost(post)} className="min-h-11 min-w-0 flex-1 text-left">
                <p className="font-bold break-keep">{post.title}</p>
                <p className="mt-1 text-sm text-ink-muted break-keep">{findUserName(post.userId, users, state.user.nickname)} · {post.createdAt}</p>
              </button>
              <ClapButton postId={post.id} />
            </div>
          ))}
        </div>
      </section>
      <ReviewForm book={book} onSaved={() => {}} />
    </section>
  )
}
