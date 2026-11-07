// 숙련도 점수표: 행동키 -> { 점수, 하루 상한(null이면 무제한), 이름 }
export const MASTERY_TABLE = {
  attendance: { points: 5, cap: 1, label: '출석 체크' },
  todayBook: { points: 5, cap: 1, label: '오늘의 추천 도서 확인' },
  collect: { points: 10, cap: 10, label: '문장 수집' },
  quiz: { points: 10, cap: 3, label: '책 제목 맞히기' },
  comment: { points: 10, cap: 5, label: '책 포럼 댓글' },
  photo: { points: 20, cap: 3, label: '책 문장 인증샷' },
  review: { points: 50, cap: 2, label: '독후감 올리기' },
  event: { points: 50, cap: null, label: '독서 행사 참여' },
  arenaWin: { points: 30, cap: 5, label: '아레나 승리' },
  arenaLose: { points: 5, cap: null, label: '아레나 참가' },
}
