import Banner from './components/Banner'
import FreeTestsList from './components/FreeTestsList'
import TopNavigationBar from '@/components/TopNavigationBar'
import Footer from '@/components/Footer'

const FreeTest = () => {
  return (
    <>
      <TopNavigationBar />
      <main>
        <Banner />
        <FreeTestsList />
      </main>
      <Footer className="bg-light" />
    </>
  )
}

export default FreeTest
