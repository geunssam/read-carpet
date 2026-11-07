import { MASTERY_TABLE } from '../lib/masteryTable'
import { defaultState, todayStr, clearAll } from './defaultState'

const newId = (p) => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`

// get(): 지금 상태, commit(patch): 상태 바꾸기. 같은 렌더 안에서 연달아 불러도 안전하게 ref 기반.
export function createActions(get, commit) {
  const bumpBookCards = (bookId, n) => {
    const shelf = get().shelf.map((c) => (c.bookId === bookId ? { ...c, score: c.score + n } : c))
    commit({ shelf })
  }

  const earn = (key) => {
    const rule = MASTERY_TABLE[key]
    if (!rule) return { ok: false, gained: 0, message: '알 수 없는 행동이에요.' }
    let { daily } = get()
    if (daily.date !== todayStr()) daily = { date: todayStr(), counts: {} }
    const used = daily.counts[key] || 0
    if (rule.cap !== null && used >= rule.cap) {
      commit({ daily })
      return { ok: false, gained: 0, message: `오늘 ${rule.label}은 다 했어요. 내일 또 와요!` }
    }
    const user = { ...get().user, mastery: get().user.mastery + rule.points }
    commit({ user, daily: { ...daily, counts: { ...daily.counts, [key]: used + 1 } } })
    return { ok: true, gained: rule.points, message: `${rule.label} +${rule.points}` }
  }

  const updateUser = (patch) => commit({ user: { ...get().user, ...patch } })

  // 문장 카드 추가: 비었거나 길이 어긋나거나 중복이면 안내만 하고 막음
  const addCard = ({ bookId = null, sentenceId = null, text, title, author, source = 'own', score = 10 }) => {
    const t = (text || '').trim()
    if (!t) return { ok: false, message: '문장을 먼저 적어 주세요.' }
    if (t.length < 10) return { ok: false, message: '문장이 너무 짧아요. 10자 이상 적어 주세요.' }
    if (t.length > 300) return { ok: false, message: '문장이 너무 길어요. 300자 이하로 줄여 주세요.' }
    const dup = get().shelf.find((c) => c.text === t || (sentenceId && c.sentenceId === sentenceId))
    if (dup) return { ok: false, message: '이미 책장에 있는 문장이에요.', existing: dup }
    const card = { id: newId('c'), bookId, sentenceId, text: t, title: title || '직접 입력', author: author || '', score, collectedAt: todayStr(), source }
    commit({ shelf: [...get().shelf, card] })
    return { ok: true, card, message: '책장에 꽂았어요!' }
  }

  const buyItem = (item) => {
    const { user, items } = get()
    if (items.includes(item.id)) return { ok: false, message: '이미 가지고 있어요.' }
    if (user.mastery < item.price) return { ok: false, message: `숙련도가 ${item.price - user.mastery}점 모자라요.` }
    commit({ user: { ...user, mastery: user.mastery - item.price }, items: [...items, item.id] })
    return { ok: true, message: `${item.name} 구입 완료!` }
  }

  const equip = (category, id) => {
    const { user } = get()
    commit({ user: { ...user, equipped: { ...user.equipped, [category]: id } } })
  }

  const addBattle = (b) => commit({ battles: [{ id: newId('bt'), at: todayStr(), ...b }, ...get().battles] })

  // 포럼: 글·댓글을 쓰면 같은 책 문장 카드 점수가 조금 오름 (PRD: 카드 점수 = 활동 점수의 10%)
  const addForumPost = ({ bookId, title, body }) => {
    const f = get().forum
    const post = { id: newId('mp'), bookId, userId: 'me', title, body, createdAt: todayStr(), comments: [] }
    commit({ forum: { ...f, posts: [post, ...f.posts] } })
    bumpBookCards(bookId, 5)
    return post
  }
  const addForumComment = (postId, text, bookId) => {
    const f = get().forum
    const list = f.comments[postId] || []
    commit({ forum: { ...f, comments: { ...f.comments, [postId]: [...list, { userId: 'me', text }] } } })
    if (bookId) bumpBookCards(bookId, 1)
  }

  // 도서 페이지 '내 서재에 담기' -> 미니홈피 '읽는 중'
  const addReading = (bookId) => {
    const { user } = get()
    const reading = user.reading || []
    if (reading.includes(bookId)) return { ok: false, message: '이미 내 서재에 있는 책이에요.' }
    commit({ user: { ...user, reading: [...reading, bookId] } })
    return { ok: true, message: '내 서재에 담았어요. 미니홈피 "읽는 중"에서 볼 수 있어요.' }
  }

  // 리뷰 박수: 글마다 한 번만, 다시 누르면 취소
  const toggleClap = (postId) => {
    const f = get().forum
    const claps = { ...(f.claps || {}) }
    if (claps[postId]) delete claps[postId]
    else claps[postId] = true
    commit({ forum: { ...f, claps } })
  }

  const resetAll = () => { clearAll(); commit(defaultState()) }

  return { earn, updateUser, addCard, buyItem, equip, addBattle, addForumPost, addForumComment, addReading, toggleClap, resetAll }
}
