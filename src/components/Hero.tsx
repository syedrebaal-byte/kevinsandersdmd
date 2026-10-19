import React from 'react';
import { IMAGES, handleImageError } from '../data/images';
import { CLINIC_INFO, getOfficeStatus } from '../data/dentalData';
import { Phone, Calendar, ShieldCheck, Star, Sparkles, ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenAppointment: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onExploreServices }) => {
  const status = getOfficeStatus();

  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background ambient architectural tint */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#EAE4D8]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Conversion Messaging */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata & Category Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#55605B]">
              <span className="font-semibold text-[#1F4E3D] tracking-wider uppercase">
                Sanders Family Dentistry
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Tallahassee, FL</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-[#C5A059] font-medium">Dr. Kevin Sanders, DMD</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#19231E] font-medium tracking-tight leading-[1.12]">
              Exceptional Dental Care, Thoughtfully Practiced in Tallahassee.
            </h1>

            {/* Subtitle with verified positioning */}
            <p className="text-base sm:text-lg text-[#4A5550] max-w-2xl leading-relaxed">
              Dr. Kevin Sanders provides conservative cosmetic, restorative, and family dentistry built on complete honesty, clinical precision, and patient comfort. Experience high-standard dental care with zero high-pressure sales.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="px-7 py-4 rounded-xl bg-[#1F4E3D] text-white text-xs sm:text-sm font-semibold hover:bg-[#16382C] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span>Request an Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="px-6 py-4 rounded-xl bg-white border border-[#D6CDBD] text-[#19231E] hover:border-[#1F4E3D] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#1F4E3D]" />
                <span>Call (850) 878-7916</span>
              </a>
            </div>

            {/* Verified Trust Proof Points */}
            <div className="pt-6 border-t border-[#EBE5D9] grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-semibold text-[#19231E]">4.9★ Patient Praised</div>
                <div className="text-[11px] text-[#7A7366]">Gentle, honest reputation</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#1F4E3D] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#1F4E3D]" />
                  <span className="text-xs font-semibold text-[#19231E]">CDC & OSHA</span>
                </div>
                <div className="text-[11px] text-[#7A7366]">Surpassing safety standards</div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1 text-[#C5A059] mb-1">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-semibold text-[#19231E]">Early Bird Hours</span>
                </div>
                <div className="text-[11px] text-[#7A7366]">Thursday 7:00 AM slots</div>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Imagery & Live Practice Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image Frame */}
              <div className="rounded-2xl overflow-hidden border border-[#E5DECF] shadow-xl bg-white aspect-[4/5]">
                <img
                  src={IMAGES.hero}
                  alt="Healthy, confident patient smile at Sanders Family Dentistry Tallahassee"
                  onError={(e) => handleImageError(e, IMAGES.hero)}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>

              {/* Floating Live Status Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#E5DECF] shadow-lg max-w-xs animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                    }`}
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1F4E3D]">
                    {status.statusText}
                  </span>
                </div>
                <div className="text-xs font-medium text-[#19231E]">
                  2600 Care Drive, Tallahassee
                </div>
                <div className="text-[11px] text-[#7A7366] mt-0.5">
                  Accepting New & Returning Patients
                </div>
                <button
                  type="button"
                  onClick={onExploreServices}
                  className="mt-3 text-xs font-semibold text-[#1F4E3D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore 8 Clinical Services</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Floating Badge top right */}
              <div className="absolute -top-3 -right-3 sm:-right-4 bg-[#1F4E3D] text-white px-3.5 py-2 rounded-xl shadow-md text-xs font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Zero Pressure Dentistry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
