import { useEffect, useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import useToast from './useToast'

export default function PhotoProof() {
  const { actions } = useStore()
  const [preview, setPreview] = useState('')
  const { message, showMessage } = useToast()

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])
  const choosePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setPreview((current) => { if (current) URL.revokeObjectURL(current); return URL.createObjectURL(file) })
    showMessage('')
  }
  const uploadPhoto = () => {
    if (!preview) return showMessage('사진을 먼저 골라 주세요.')
    showMessage(actions.earn('photo').message)
  }

  return (
    <section className="rounded-2xl border border-line bg-surface-200 p-5" aria-labelledby="photo-title">
      <h2 id="photo-title" className="font-serif-kr text-xl font-bold">인증샷 올리기</h2>
      <p className="mt-2 text-sm text-ink-muted">사진은 이 화면에서만 미리 보여요. 저장하거나 전송하지 않아요.</p>
      <input type="file" accept="image/*" onChange={choosePhoto} className="mt-4 block min-h-11 w-full text-sm" />
      {preview && <img src={preview} alt="고른 인증 사진 미리보기" className="mt-4 max-h-64 w-full rounded-xl border border-line object-contain" />}
      <button type="button" onClick={uploadPhoto} className="mt-4 min-h-11 rounded-lg bg-carpet-red px-4 text-sm font-bold text-white">올리기</button>
      {message && <p className="mt-3 text-sm text-gold-ink" role="status">{message}</p>}
    </section>
  )
}
