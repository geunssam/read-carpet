// 로비 지도: 15칸 x 11칸, 한 칸 32px (docs/LOBBY_SPEC.md 와 같은 약속)
export const COLS = 15
export const ROWS = 11
export const TILE = 32
export const START = { x: 7, y: 9 }

// 막힌 칸 (벽, 가구)
const blockedRects = [
  [0, 0, 14, 1], // 뒷벽
  [0, 10, 14, 10], // 아래 벽
  [0, 2, 0, 9], [14, 2, 14, 9], // 옆 벽
  [3, 4, 5, 5], // 책 광장 게시판
  [9, 4, 11, 5], // 안내 데스크
  [1, 7, 2, 9], [12, 7, 13, 9], // 책장
  [4, 9, 4, 9], [10, 9, 10, 9], // 화분
  [10, 3, 10, 3], // 사서(NPC)가 서 있는 자리
]
export const isBlocked = (x, y) =>
  x < 0 || y < 0 || x >= COLS || y >= ROWS || blockedRects.some(([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2)

// 문 앞에 서면 나오는 장소 (kind: go=화면 이동, attend=출석 체크)
export const PLACES = [
  { id: 'home', x: 2, y: 2, name: '내 서재', desc: '내 캐릭터와 책장이 있는 미니홈피로 들어가요.', kind: 'go', to: 'home', label: { x: 2, y: 1 } },
  { id: 'shop', x: 12, y: 2, name: '꾸미기 가게', desc: '숙련도로 모자와 방을 사서 꾸며요.', kind: 'go', to: 'shop', label: { x: 12, y: 1 } },
  { id: 'arena', x: 7, y: 2, name: '독서 아레나', desc: '문장 카드로 책 친구와 겨뤄요.', kind: 'go', to: 'arena', label: { x: 7, y: 1 } },
  { id: 'plaza', x: 4, y: 6, name: '책 광장', desc: '게시판에서 책을 고르고 리뷰를 읽어요.', kind: 'go', to: 'plaza', label: { x: 4, y: 4 } },
  { id: 'desk', x: 10, y: 6, name: '안내 데스크', desc: '사서님께 출석 도장을 받아요.', kind: 'attend', label: { x: 10, y: 4 } },
]
export const placeAt = (x, y) => PLACES.find((p) => p.x === x && p.y === y) || null
