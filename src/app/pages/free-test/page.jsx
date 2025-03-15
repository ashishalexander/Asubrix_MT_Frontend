import Banner from './components/Banner'
import FreeTestsList from './components/FreeTestsList'
import TopNavigationBar from '@/components/TopNavigationBar'
import Footer from '@/components/Footer'
import Hero from './components/Hero'

const FreeTest = () => {
  return (
    <>
      <TopNavigationBar />
      <main>
        <Hero/>
        {/* <Banner /> */}
        <FreeTestsList />
      </main>
      <Footer className="bg-light" />
    </>
  )
}

export default FreeTest
