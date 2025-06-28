import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import QuickActions from "../components/QuickActions";
import Services from "../components/Services";
import Stats from "../components/Stats";
import AnnouncementsEvents from "../components/AnnouncementsEvents";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import About from "../components/About";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroCarousel />
      <QuickActions />
      <Services />
      <Stats />
      <AnnouncementsEvents />
      <Testimonials />
      <About />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;