import { KEYS } from './storageKeys'

export const todayStr = () => {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export const defaultState = () => ({
  user: {
    nickname: '', taste: 'classic', bodyColor: 'red',
    equipped: { hat: null, glasses: null, effect: null, bg: null, frame: null, wallpaper: null, room: null },
    title: '', mastery: 0, hideScore: false, onboardingStep: 0,
    picks: { bookIds: [], sentenceIds: [] },
    reading: [], // 내 서재에 담은(읽기 시작한) 책 id
  },
  shelf: [], items: [], battles: [],
  daily: { date: todayStr(), counts: {} },
  forum: { posts: [], comments: {}, claps: {} }, // claps: 내가 박수 친 글 id -> true
})

// 저장소 읽기: 깨진 값이면 기본값으로 (사생활 모드 등에서도 앱이 죽지 않게)
export function loadAll() {
  const base = defaultState()
  const out = { ...base }
  Object.keys(KEYS).forEach((name) => {
    try {
      const raw = localStorage.getItem(KEYS[name])
      if (raw) out[name] = Array.isArray(base[name]) ? JSON.parse(raw) : { ...base[name], ...JSON.parse(raw) }
    } catch { /* 기본값 유지 */ }
  })
  // 날짜가 바뀌었으면 하루 횟수 초기화
  if (out.daily.date !== todayStr()) out.daily = { date: todayStr(), counts: {} }
  // 예전 버전 저장값에 새 칸이 없으면 기본값으로 채움
  out.user.equipped = { ...base.user.equipped, ...out.user.equipped }
  out.user.reading = out.user.reading || []
  out.forum.claps = out.forum.claps || {}
  return out
}

export function saveAll(state) {
  Object.keys(KEYS).forEach((name) => {
    try { localStorage.setItem(KEYS[name], JSON.stringify(state[name])) } catch { /* 저장 실패는 무시 */ }
  })
}

export function clearAll() {
  Object.values(KEYS).forEach((k) => { try { localStorage.removeItem(k) } catch { /* 무시 */ } })
}
