import React from 'react';
import { CLINIC_INFO } from '../data/dentalData';
import { MapPin, Phone, Mail, Clock, ArrowUp, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: (type: 'privacy' | 'terms' | 'accessibility') => void;
  onNavigate: (sectionId: string) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onNavigate, onOpenAppointment }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#16211C] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Practice Info */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="font-serif text-2xl font-bold text-white tracking-tight">
                Sanders Family Dentistry
              </div>
              <div className="text-xs text-[#C5A059] uppercase tracking-wider font-semibold mt-1">
                Dr. Kevin Sanders, DMD
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Providing thoughtful, conservative cosmetic, restorative, and preventative dental care in Tallahassee, Florida. Honest treatment recommendations and gentle patient comfort.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>2600 Care Drive, Tallahassee, FL 32308</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="text-white hover:text-amber-200 font-semibold transition-colors"
                >
                  (850) 878-7916
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Explore Practice
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Dental Treatments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('interactive-3d')}
                  className="hover:text-white transition-colors"
                >
                  3D Precision Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Before & After Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctor')}
                  className="hover:text-white transition-colors"
                >
                  About Dr. Sanders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('financing')}
                  className="hover:text-white transition-colors"
                >
                  Insurance & Financing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors"
                >
                  Patient Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Location & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Treatments List */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Clinical Procedures
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Porcelain Veneers</li>
              <li>Custom Ceramic Crowns</li>
              <li>Professional In-Office Whitening</li>
              <li>Precision Dental Bridges</li>
              <li>Aesthetic Composite Bonding</li>
              <li>Comprehensive Cleanings & X-Rays</li>
              <li>Emergency Dental Care</li>
            </ul>
          </div>

          {/* Hours & Booking CTA */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Office Hours
            </div>
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>Mon – Wed:</span>
                <span className="text-white">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday:</span>
                <span className="text-amber-300 font-medium">7:00 AM – 3:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri – Sun:</span>
                <span>Closed</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-2.5 rounded-xl bg-[#1F4E3D] hover:bg-[#28634e] text-white text-xs font-semibold transition-colors text-center shadow-xs"
              >
                Request Appointment Online
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Sanders Family Dentistry · Dr. Kevin Sanders, DMD. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => onOpenPrivacy('privacy')}
              className="hover:text-white transition-colors"
            >
              HIPAA Privacy Notice
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenPrivacy('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Medical Disclaimer
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenPrivacy('accessibility')}
              className="hover:text-white transition-colors"
            >
              Accessibility Statement
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
