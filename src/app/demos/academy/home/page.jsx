import PageMetaData from '@/components/PageMetaData'
import CourseSlider from './components/CourseSlider'
import Footer from '@/components/Footer'
import PopularCourses from './components/PopularCourses'
import TopNavigationBar from '@/components/TopNavigationBar'
// import TopNavigationBar from './components/TopNavigationBar'
import TrendingCourses from './components/TrendingCourses'
import HeroSlider from './components/HeroSlider'
import OfferCourses from './components/OfferCourses'
import FeaturedCourses from './components/FeaturedCourses'
import Testimonials from './components/Testimonials'
import UpcomingEvents from './components/UpcomingEvents'
import AboutAndNoticeBoard from './components/AboutAndNoticeBoard'
import EnrolledCourses from './components/EnrolledCourses'

const AcademicHome = () => {
  return (
    <>
      <PageMetaData title="Academy" />
      <TopNavigationBar />
      <main>
        <HeroSlider />
        <AboutAndNoticeBoard/>
        <OfferCourses />
        <EnrolledCourses />
        {/* <CourseSlider /> */}
        {/* <TrendingCourses /> */}
        <FeaturedCourses />
        <PopularCourses />
        {/* <UpcomingEvents/> */}
        <Testimonials />
      </main>
      <Footer className="custom-footer" />
    </>
  )
}
export default AcademicHome