import Footer from '@/components/Footer'
import PageMetaData from '@/components/PageMetaData'
import ContactCards from './components/ContactCards'
import ContactFormAndMap from './components/ContactFormAndMap'
import TopNavigationBar from '@/components/TopNavigationBar'
import HeroImage from './components/HeroImage'
const ContactUs = () => {
  return (
    <>
      <PageMetaData title="Contact Us" />
      <TopNavigationBar />
      <main>
        <HeroImage/>
        <ContactFormAndMap />
      </main>
      <Footer className="bg-light" />
    </>
  )
}
export default ContactUs
