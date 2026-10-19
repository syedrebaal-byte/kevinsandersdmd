import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Interactive3DTooth } from './components/Interactive3DTooth';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { ServicesSection } from './components/ServicesSection';
import { SmileAssessmentQuiz } from './components/SmileAssessmentQuiz';
import { DoctorSection } from './components/DoctorSection';
import { FinancingCalculator } from './components/FinancingCalculator';
import { ReviewsSection } from './components/ReviewsSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { ContactAndLocation } from './components/ContactAndLocation';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { PrivacyModal } from './components/PrivacyModal';
import { CLINIC_INFO } from './data/dentalData';
import { Phone, Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  // Legal modal state
  const [privacyModalState, setPrivacyModalState] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms' | 'accessibility';
  }>({
    isOpen: false,
    type: 'privacy'
  });

  const handleOpenAppointment = (serviceName = '') => {
    setSelectedServiceForBooking(serviceName);
    setIsAppointmentOpen(true);
  };

  const handleOpenPrivacy = (type: 'privacy' | 'terms' | 'accessibility') => {
    setPrivacyModalState({ isOpen: true, type });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#19231E] flex flex-col font-sans selection:bg-[#1F4E3D] selection:text-white">
      {/* Sticky Header & Nav */}
      <Navbar
        onOpenAppointment={() => handleOpenAppointment()}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section id="hero">
          <Hero
            onOpenAppointment={() => handleOpenAppointment()}
            onExploreServices={() => scrollToSection('services')}
          />
        </section>

        {/* 2. Urgent / Emergency Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <EmergencyBanner onBookEmergency={() => handleOpenAppointment('Emergency Dental Care')} />
        </section>

        {/* 3. Clinical Services Showcase */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Comprehensive Dental Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#19231E]">
              Clinical Excellence Tailored to You
            </h2>
            <p className="text-sm sm:text-base text-[#4A5550] mt-3 leading-relaxed">
              From gentle routine cleanings and digital cancer screenings to handcrafted porcelain crowns and veneers, Dr. Kevin Sanders delivers precision dental care with conservative artistry.
            </p>
          </div>

          <ServicesSection onBookService={(serviceName) => handleOpenAppointment(serviceName)} />
        </section>

        {/* 4. Interactive 3D Anatomy & Precision Explorer */}
        <section id="interactive-3d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Interactive3DTooth />
        </section>

        {/* 5. Before & After Transformation Slider */}
        <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Conservative Aesthetic Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#19231E]">
              Real Results, Natural Translucency
            </h2>
            <p className="text-sm sm:text-base text-[#4A5550] mt-3 leading-relaxed">
              Slide to compare our conservative smile transformations. We focus on natural harmony, light reflection, and long-term biological tooth preservation.
            </p>
          </div>

          <BeforeAfterGallery onRequestConsultation={(service) => handleOpenAppointment(service || 'Cosmetic Consultation')} />
        </section>

        {/* 6. Interactive Smile Assessment Consultation Quiz */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SmileAssessmentQuiz onSelectService={(service) => handleOpenAppointment(service)} />
        </section>

        {/* 7. Meet Dr. Kevin Sanders, DMD & Clinical Philosophy */}
        <section id="doctor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <DoctorSection onBookConsultation={() => handleOpenAppointment('Comprehensive Exam & Consultation')} />
        </section>

        {/* 8. Insurance Guidance & Interactive CareCredit Payment Calculator */}
        <section id="financing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FinancingCalculator onBookWithFinancing={() => handleOpenAppointment('Treatment Planning & Financing')} />
        </section>

        {/* 9. Verified Patient Testimonials & Community Praise */}
        <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <ReviewsSection />
        </section>

        {/* 10. Contact, Location Map & Office Hours */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <ContactAndLocation onRequestAppointment={() => handleOpenAppointment()} />
        </section>

        {/* 11. Frequently Asked Questions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-t border-[#EBE5D9]">
          <FaqSection />
        </section>

        {/* 12. Bottom Conversion Callout */}
        <section className="w-full bg-[#1F4E3D] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
              Sanders Family Dentistry · Tallahassee, FL
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight">
              Ready for a Calm, Patient-First Dental Experience?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Dr. Kevin Sanders and our friendly team are here to answer your questions, care for your oral health, and treat you like family.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenAppointment()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#1F4E3D] text-sm font-semibold hover:bg-emerald-50 transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Your Appointment</span>
              </button>
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-emerald-400 text-white hover:bg-emerald-800 text-sm font-semibold transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call (850) 878-7916</span>
              </a>
            </div>
            <div className="pt-4 text-xs text-emerald-200">
              Located at 2600 Care Drive, Tallahassee, FL 32308 · Complimentary Parking On-Site
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={handleOpenPrivacy}
        onNavigate={scrollToSection}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5DECF] p-3 flex items-center gap-2.5 shadow-lg">
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          className="flex-1 py-3 px-3 rounded-xl bg-[#FAF8F5] border border-[#E5DECF] text-xs font-semibold text-[#19231E] flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#1F4E3D]" />
          <span>Call (850) 878-7916</span>
        </a>

        <button
          onClick={() => handleOpenAppointment()}
          className="flex-1 py-3 px-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Request Visit</span>
        </button>
      </div>

      {/* Interactive Appointment Request Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedService={selectedServiceForBooking}
      />

      {/* Legal & Privacy Practices Modal */}
      <PrivacyModal
        isOpen={privacyModalState.isOpen}
        onClose={() => setPrivacyModalState({ ...privacyModalState, isOpen: false })}
        type={privacyModalState.type}
      />
    </div>
  );
}
