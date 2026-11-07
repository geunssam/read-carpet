import { useMemo, useState } from 'react'
import { useStore } from '../../storage/StoreContext'
import Character from '../../components/Character'
import users from '../../data/users.json'
import PhotoProof from './PhotoProof'
import VisitHome from './VisitHome'

export default function FreePlaza() {
  const { state } = useStore()
  const [visitor, setVisitor] = useState(null)
  const orderedUsers = useMemo(() => [...users].sort((a, b) => Number(b.taste === state.user.taste) - Number(a.taste === state.user.taste)), [state.user.taste])

  if (visitor) return <VisitHome user={visitor} onBack={() => setVisitor(null)} />
  return (
    <div className="space-y-6">
      <section aria-labelledby="friends-title"><h2 id="friends-title" className="font-serif-kr text-2xl font-bold">독서 친구</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">
        {orderedUsers.map((user) => { const similar = user.taste === state.user.taste; return <button key={user.id} type="button" onClick={() => setVisitor(user)} className="flex min-h-24 min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface-200 p-3 text-left"><Character bodyColor={user.bodyColor} equipped={user.equipped} size={96} /><span className="min-w-0"><span className="font-serif-kr font-bold break-keep">{user.nickname}</span><span className="mt-1 block text-sm text-ink-muted break-keep">{user.title}</span><span className="mt-2 block text-sm break-keep">{user.intro}</span>{similar && <span className="mt-2 inline-block rounded-full bg-trophy-gold px-2 py-1 text-xs font-bold text-[#141012]">나와 취향이 비슷해요</span>}</span></button> })}
      </div></section>
      <PhotoProof />
    </div>
  )
}
