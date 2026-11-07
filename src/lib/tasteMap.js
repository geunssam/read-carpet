// 고른 책 성향 -> 캐릭터 몸 색, 기본 칭호 (PRD 03 취향→캐릭터 규칙)
export const TASTE_MAP = {
  classic: { bodyColor: 'red', title: '서재의 귀족', label: '고전 문학' },
  humanities: { bodyColor: 'ink', title: '냉철한 관찰자', label: '과학·인문' },
  essay: { bodyColor: 'gold', title: '밤의 낭독가', label: '에세이·시' },
}

// 고른 책들의 taste 중 가장 많은 것 (동률이면 첫 번째)
export function pickTaste(books) {
  const count = {}
  books.forEach((b) => { count[b.taste] = (count[b.taste] || 0) + 1 })
  return Object.keys(count).sort((a, b) => count[b] - count[a])[0] || 'classic'
}
