export function localDateKey() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function stableNumber(value) {
  return [...value].reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) >>> 0, 0)
}

export function findUserName(userId, users, myNickname) {
  if (userId === 'me') return myNickname || '나'
  return users.find((user) => user.id === userId)?.nickname || '독서 친구'
}

export function orderForumPosts(posts) {
  return [...posts].sort((a, b) => Number(b.userId === 'me') - Number(a.userId === 'me'))
}

// 카테고리 (벽돌책 = 두껍고 긴 책)
export const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'classic', label: '고전 문학' },
  { id: 'humanities', label: '인문·철학' },
  { id: 'essay', label: '에세이·시' },
  { id: 'brick', label: '벽돌책' },
]
export const BRICK_IDS = ['b04', 'b05', 'b06', 'b18']

export function filterBooks(books, category, query) {
  const q = query.trim().replace(/\s/g, '')
  return books.filter((b) => {
    const inCat = category === 'all' || (category === 'brick' ? BRICK_IDS.includes(b.id) : b.taste === category)
    const text = `${b.title}${b.author}`.replace(/\s/g, '')
    return inCat && (!q || text.includes(q))
  })
}

// 오타 추천: 글자가 가장 많이 겹치는 책 하나
export function closestBook(books, query) {
  const chars = new Set(query.replace(/\s/g, ''))
  if (chars.size === 0) return null
  let best = null
  books.forEach((b) => {
    const score = [...new Set(b.title.replace(/\s/g, ''))].filter((c) => chars.has(c)).length
    if (score > 0 && (!best || score > best.score)) best = { book: b, score }
  })
  return best?.book ?? null
}

// 예시 글의 박수 수 (글 id로 고정된 숫자)
export const baseClaps = (postId) => (stableNumber(postId) % 23) + 3

// 이 책과 인연 있는 대결 상대 (같은 책 문장을 가진 사람 → 좋아하는 책 → 입문 상대)
export function opponentForBook(users, sentences, bookId) {
  const ids = new Set(sentences.filter((s) => s.bookId === bookId).map((s) => s.id))
  return users.find((u) => u.shelf.some((c) => ids.has(c.sentenceId)))
    || users.find((u) => u.favoriteBookIds.includes(bookId))
    || users.find((u) => u.tier === 'beginner')
}
