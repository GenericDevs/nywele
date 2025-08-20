import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import FeaturedWigs from '@/app/components/FeaturedWigs';
import About from '@/app/components/About';
import Testimonials from '@/app/components/Testimonials';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedWigs />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
