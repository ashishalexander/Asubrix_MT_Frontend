import PageMetaData from '@/components/PageMetaData';
import CourseSlider from './components/CourseSlider';
import Footer from './components/Footer';
import PopularCourses from './components/PopularCourses';
import TopNavigationBar from './components/TopNavigationBar';
import TrendingCourses from './components/TrendingCourses';
import HeroSlider from './components/HeroSlider';
import OfferCourses from './components/OfferCourses';
import FeaturedCourses from './components/FeaturedCourses';

const AcademicHome = () => {
  return <>
      <PageMetaData title="Academy" />
      <TopNavigationBar />
      <main>
        <HeroSlider />
        <OfferCourses />
        <CourseSlider />
        <TrendingCourses />
        <FeaturedCourses/>
        <PopularCourses />
      </main>
      <Footer />
    </>;
};
export default AcademicHome;
