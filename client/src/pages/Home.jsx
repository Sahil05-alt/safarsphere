import { lazy, Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/layout/FloatingActions';
import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
// Below-the-fold sections are lazy
const Destinations = lazy(() => import('../components/sections/Destinations'));
const Packages = lazy(() => import('../components/sections/Packages'));
const Events = lazy(() => import('../components/sections/Events'));
const Services = lazy(() => import('../components/sections/Services'));
const TripTypes = lazy(() => import('../components/sections/TripTypes'));
const HowWeTravel = lazy(() => import('../components/sections/HowWeTravel'));
const Gallery = lazy(() => import('../components/sections/Gallery'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));
const PlanTrip = lazy(() => import('../components/sections/PlanTrip'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><Marquee />
        <Suspense fallback={<div className="h-40" />}>
          <Destinations /><Packages /><Events /><Services /><TripTypes /><HowWeTravel /><Gallery /><Testimonials /><PlanTrip />
        </Suspense>
      </main>
      <Footer /><FloatingActions />
    </>
  );
}
