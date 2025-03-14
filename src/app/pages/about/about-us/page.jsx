import Footer from '@/components/Footer';
import PageMetaData from '@/components/PageMetaData';
import About from './components/About';
import Hero from './components/Hero';
import TopNavigationBar from '@/components/TopNavigationBar';
const AboutUs = () => {
  return <>
      <PageMetaData title="About Us" />
      <TopNavigationBar />
      <main>
        <Hero />
        <About />
      </main>
      <Footer className="bg-light" />
    </>;
};
export default AboutUs;
