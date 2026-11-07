import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { loadAll, saveAll } from './defaultState'
import { createActions } from './createActions'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadAll)
  const ref = useRef(state)

  const value = useMemo(() => {
    const commit = (patch) => { ref.current = { ...ref.current, ...patch }; setState(ref.current) }
    return { actions: createActions(() => ref.current, commit) }
  }, [])

  // 바뀔 때마다 브라우저에 저장 (새로고침해도 복원)
  useEffect(() => { saveAll(state) }, [state])

  return <StoreContext.Provider value={{ state, actions: value.actions }}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
