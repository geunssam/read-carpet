import { useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import shopItems from '../../data/shopItems.json'
import Character from '../../components/Character'
import Notice from '../../components/Notice'
import ItemCard from './ItemCard'

const CATS = [
  { id: 'hat', label: '모자' }, { id: 'glasses', label: '안경' }, { id: 'effect', label: '효과' },
  { id: 'bg', label: '배경' }, { id: 'room', label: '방' }, { id: 'frame', label: '테두리' }, { id: 'title', label: '칭호' },
]

export default function ShopPage() {
  const { state, actions } = useStore()
  const { user, items } = state
  const [cat, setCat] = useState('hat')
  const [notice, setNotice] = useState(null)
  const list = shopItems.filter((i) => i.category === cat)

  const buy = (item) => setNotice(actions.buyItem(item))
  const toggleWear = (item) => {
    if (item.category === 'title') return actions.updateUser({ title: item.name })
    actions.equip(item.category, user.equipped[item.category] === item.id ? null : item.id)
  }
  const isWorn = (item) => (item.category === 'title' ? user.title === item.name : user.equipped[item.category] === item.id)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Character bodyColor={user.bodyColor} equipped={user.equipped} size={120} />
        <div>
          <p className="text-sm font-bold text-gold-ink">{user.title}</p>
          <p className="font-serif-kr text-xl font-bold text-ink">{user.nickname}</p>
          <p className="text-sm text-ink-muted">쓸 수 있는 숙련도 <b className="text-ink">{user.mastery}</b></p>
        </div>
      </div>
      <div role="tablist" aria-label="물건 종류" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => { setCat(c.id); setNotice(null) }}
            className={`h-11 shrink-0 rounded-full px-4 text-sm font-bold ${cat === c.id ? 'bg-carpet-red text-white' : 'border border-line text-ink-muted'}`}>
            {c.label}
          </button>
        ))}
      </div>
      <Notice notice={notice} />
      <ul className="grid grid-cols-2 gap-3">
        {list.map((item) => (
          <li key={item.id}><ItemCard item={item} owned={items.includes(item.id)} worn={isWorn(item)} canAfford={user.mastery >= item.price} onBuy={() => buy(item)} onWear={() => toggleWear(item)} /></li>
        ))}
      </ul>
      {list.length === 0 && <p className="text-center text-sm text-ink-muted">이 종류는 곧 들어와요.</p>}
    </div>
  )
}
