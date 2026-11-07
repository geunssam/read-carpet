export default function ItemCard({ item, owned, worn, canAfford, onBuy, onWear }) {
  return (
    <div className={`flex h-full flex-col gap-2 rounded-xl border bg-surface-200 p-3 ${worn ? 'border-carpet-red' : 'border-line'}`}>
      {item.file ? (
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-surface-100">
          <img src={item.file.replace('/assets/character/', '/assets/character-pixel/')} alt="" className="h-full w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </div>
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-lg bg-spotlight px-2 text-center font-serif-kr font-bold text-gold-ink">{item.name}</div>
      )}
      <div className="flex-1">
        <p className="font-bold text-ink">{item.name}</p>
        <p className="text-xs text-ink-muted">{item.desc}</p>
      </div>
      {owned ? (
        <button onClick={onWear} className={`h-11 rounded-lg font-bold ${worn ? 'border border-carpet-red text-carpet-red' : 'bg-velvet text-white'}`}>{worn ? (item.category === 'title' ? '사용 중' : '벗기') : '착용'}</button>
      ) : (
        <button onClick={onBuy} className={`h-11 rounded-lg font-bold ${canAfford ? 'bg-carpet-red text-white' : 'bg-line text-ink-muted'}`}>{item.price}점으로 사기</button>
      )}
    </div>
  )
}
