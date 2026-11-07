import { NavContext } from '../../navigation/NavContext'
import Modal from '../../components/Modal'
import MiniHomePage from '../minihome/MiniHomePage'
import ShopPage from '../shop/ShopPage'
import PlazaPage from '../plaza/PlazaPage'
import ArenaPage from '../arena/ArenaPage'

const TITLES = { home: '내 서재', shop: '꾸미기 가게', plaza: '책 광장', arena: '독서 아레나' }

// 로비의 문을 열면 뜨는 창. 창 안에서 "다른 화면으로" 가는 단추도 창 안에서 바뀌게 이동 규칙을 바꿔 끼움.
export default function PlaceModal({ modal, setModal }) {
  const close = () => setModal(null)
  const goInside = (to, data = null) => {
    if (to === 'lobby') return close()
    setModal((m) => ({ to, intent: data, nonce: (m?.nonce || 0) + 1 }))
  }
  const nav = { goTo: goInside, intent: modal.intent, clearIntent: () => setModal((m) => (m ? { ...m, intent: null } : m)) }

  const pages = {
    home: <MiniHomePage goTo={goInside} />,
    shop: <ShopPage />,
    plaza: <PlazaPage />,
    arena: <ArenaPage />,
  }
  return (
    <Modal title={TITLES[modal.to]} onClose={close} scrollKey={`${modal.to}-${modal.nonce}`}>
      <NavContext.Provider value={nav}>
        <div key={`${modal.to}-${modal.nonce}`}>{pages[modal.to]}</div>
      </NavContext.Provider>
    </Modal>
  )
}
