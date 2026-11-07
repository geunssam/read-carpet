import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'

// 로비 위에 뜨는 창. Esc·바깥 누르기·닫기 단추로 닫힘. 열면 안으로 포커스, 닫으면 원래 자리로 포커스 복귀.
export default function Modal({ title, onClose, children, scrollKey }) {
  const dialogRef = useRef(null)
  const bodyRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // 뒤 화면 스크롤 막기
    dialogRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onCloseRef.current(); return }
      if (e.key !== 'Tab') return
      // Tab 키가 창 밖으로 나가지 않게 안에서 돌림
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (items.length === 0) { e.preventDefault(); return }
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
  }, [])

  // 창 안에서 다른 화면으로 바뀌면 맨 위로
  useEffect(() => { bodyRef.current?.scrollTo(0, 0) }, [scrollKey])

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/60 sm:items-center sm:p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div
        ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}
        className="pop flex h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-surface-100 shadow-2xl outline-none sm:h-[85dvh] sm:rounded-3xl"
      >
        <header className="flex items-center justify-between gap-3 border-b border-line bg-surface-200 px-4 py-2">
          <h2 className="font-serif-kr text-lg font-bold text-ink">{title}</h2>
          <button type="button" onClick={onClose} className="h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink">
            로비로 <span className="text-xs font-normal text-ink-muted">(Esc)</span>
          </button>
        </header>
        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">{children}</div>
      </div>
    </div>
  )
}
