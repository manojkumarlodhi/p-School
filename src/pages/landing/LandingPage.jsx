import HeaderSection        from './sections/HeaderSection';
import HeroSection          from './sections/HeroSection';
import WhatIsSection        from './sections/WhatIsSection';
import VirtualLabsSection   from './sections/VirtualLabsSection';
import WhoIsForSection      from './sections/WhoIsForSection';
import CoursesSection       from './sections/CoursesSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection       from './sections/ContactSection';
import CTABannerSection     from './sections/CTABannerSection';
import FooterSection        from './sections/FooterSection';
import './landing.css';

export default function LandingPage() {
  return (
    <div className="lp">
      <HeaderSection />
      <main>
        <HeroSection />
        <WhatIsSection />
        <VirtualLabsSection />
        <WhoIsForSection />
        <CoursesSection />
        <CertificationsSection />
        <ContactSection />
        <CTABannerSection />
      </main>
      <FooterSection />
    </div>
  );
}
