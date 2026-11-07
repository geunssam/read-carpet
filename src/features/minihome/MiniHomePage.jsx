import HomeHeader from './HomeHeader'
import CollectForm from './CollectForm'
import Bookshelf from './Bookshelf'
import ReadingList from './ReadingList'
import Recommendations from './Recommendations'
import SettingsPanel from './SettingsPanel'

export default function MiniHomePage({ goTo }) {
  return (
    <div className="flex flex-col gap-8">
      <HomeHeader goTo={goTo} />
      <ReadingList />
      <CollectForm />
      <Bookshelf />
      <Recommendations />
      <SettingsPanel />
    </div>
  )
}
