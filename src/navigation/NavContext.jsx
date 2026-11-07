import { createContext, useContext } from 'react'

// 탭 사이 이동 + 들고 갈 정보(intent). 예: goTo('arena', { opponentId: 'u2' })
export const NavContext = createContext({ goTo: () => {}, intent: null, clearIntent: () => {} })
export const useNav = () => useContext(NavContext)
