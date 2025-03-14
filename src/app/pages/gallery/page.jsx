import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Footer from '@/components/Footer'
import TopNavigationBar from '@/components/TopNavigationBar'

const GalleryPage = () => {
  return (
    <>
      <TopNavigationBar />
      <main>
        <Hero />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

export default GalleryPage
