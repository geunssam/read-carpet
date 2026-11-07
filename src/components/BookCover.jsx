// 표지 그림 없이 제목 글자로 만든 표지
const SIZES = { sm: 'w-16 h-24 text-[10px] leading-tight p-1.5', md: 'w-28 h-40 text-sm p-3', lg: 'w-36 h-52 text-base p-4' }

// 밝은 표지색이면 글자를 어둡게 (밝기 계산)
function textColorFor(hex) {
  const n = parseInt((hex || '#4E1220').replace('#', ''), 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum > 0.62 ? '#141012' : '#F4EEE4'
}

export default function BookCover({ book, size = 'md' }) {
  const fg = textColorFor(book.coverColor)
  return (
    <div
      className={`${SIZES[size]} relative flex shrink-0 flex-col justify-between overflow-hidden rounded-md shadow-md`}
      style={{ background: book.coverColor || '#4E1220', color: fg }}
    >
      <span className="absolute inset-y-0 left-1.5 w-px opacity-30" style={{ background: fg }} />
      <span className="line-clamp-4 pl-2 font-serif-kr font-bold leading-snug break-keep">{book.title}</span>
      <span className="line-clamp-1 pl-2 text-[0.8em] opacity-80 break-keep">{book.author}</span>
    </div>
  )
}
