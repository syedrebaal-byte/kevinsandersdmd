import React, { useState } from 'react';
import { CLINIC_INFO, getOfficeStatus } from '../data/dentalData';
import { Phone, MapPin, Clock, Menu, X, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAppointment: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const status = getOfficeStatus();

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'interactive-3d', label: '3D Precision' },
    { id: 'gallery', label: 'Before & After' },
    { id: 'doctor', label: 'Meet Dr. Sanders' },
    { id: 'financing', label: 'Insurance & Financing' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Location & Hours' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE5D9]">
      {/* Top Banner (Address, Live Hours, Telephone) */}
      <div className="bg-[#1F4E3D] text-white py-1.5 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>2600 Care Drive, Tallahassee, FL 32308</span>
            </span>
            <span aria-hidden="true" className="text-emerald-700">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{status.isOpen ? status.statusText : status.nextOpenText}</span>
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <span className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
              Sanders Family Dentistry
            </span>
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>(850) 878-7916</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#19231E] group-hover:text-[#1F4E3D] transition-colors leading-none">
            Sanders Family Dentistry
          </div>
          <div className="text-[11px] tracking-widest text-[#7A7366] uppercase font-sans mt-1">
            Kevin Sanders, DMD · Tallahassee, FL
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-xs font-medium tracking-wide transition-colors relative py-1 focus:outline-none ${
                activeSection === link.id
                  ? 'text-[#1F4E3D] font-semibold'
                  : 'text-[#4A5550] hover:text-[#19231E]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4E3D] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="px-4 py-2.5 rounded-xl border border-[#D6CDBD] text-xs font-semibold text-[#19231E] hover:border-[#1F4E3D] transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#1F4E3D]" />
            <span>(850) 878-7916</span>
          </a>

          <button
            type="button"
            onClick={onOpenAppointment}
            className="px-5 py-2.5 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Visit</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenAppointment}
            className="p-2 rounded-lg bg-[#1F4E3D] text-white text-xs"
            aria-label="Book visit"
          >
            <Calendar className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#19231E] hover:bg-[#EAE4D8] border border-[#E5DECF]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5DECF] px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 text-sm font-medium text-[#19231E] border-b border-[#FAF8F5] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#A89E8D]">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="w-full py-3 rounded-xl bg-[#FAF8F5] border border-[#E5DECF] text-xs font-semibold text-[#19231E] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#1F4E3D]" />
              <span>Call Clinic: (850) 878-7916</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Appointment Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
