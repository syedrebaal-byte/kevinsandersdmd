import React from 'react';
import { IMAGES, handleImageError } from '../data/images';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2, Stethoscope, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

export const DoctorSection: React.FC<{ onBookConsultation: () => void }> = ({ onBookConsultation }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Doctor Image & Clinical Artistry */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Background architectural frame */}
            <div className="absolute -inset-3 bg-[#EAE4D8] rounded-3xl -rotate-1 -z-10" />

            {/* Main Portrait */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E5DECF] shadow-lg bg-white">
              <img
                src={IMAGES.doctor}
                alt="Dr. Kevin Sanders, DMD - Tallahassee Dentist"
                onError={(e) => handleImageError(e, IMAGES.doctor)}
                className="w-full h-[460px] object-cover object-top"
              />

              {/* Sub-card badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E5DECF] shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-lg text-[#19231E]">
                      Dr. Kevin Sanders, DMD
                    </div>
                    <div className="text-xs text-[#55605B]">
                      Sanders Family Dentistry · Tallahassee, FL
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1F4E3D] text-white flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5 text-emerald-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary clinic snapshot */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src={IMAGES.clinicInterior}
                alt="Sanders Family Dentistry Care Drive Clinic Interior"
                onError={(e) => handleImageError(e, IMAGES.clinicInterior)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Doctor Narrative & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>Meet Your Tallahassee Dentist</span>
              <span aria-hidden="true">·</span>
              <span>Patient-First Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#19231E] font-medium mt-1.5 leading-tight">
              Honest Dentistry Built on Trust, Integrity, and Gentle Care.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A5550] leading-relaxed">
            At Sanders Family Dentistry, our practice is rooted in a simple conviction: patients deserve compassionate dental care delivered with complete clinical honesty. Dr. Kevin Sanders has earned a reputation across the Tallahassee community for recommending only what is genuinely necessary for your health and comfort—never pressuring you into aggressive or unwanted procedures.
          </p>

          <p className="text-sm text-[#4A5550] leading-relaxed">
            By combining high levels of clinical accreditation with modern diagnostic technology—including digital low-dose radiography, electric handpieces, and intraoral cameras—Dr. Sanders and our dedicated hygiene team ensure your dental visits are gentle, transparent, and respectful of your schedule.
          </p>

          {/* Pillars of Clinical Practice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#E5DECF] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] mb-1">
                <HeartHandshake className="w-4 h-4 text-[#C5A059]" />
                <span>Zero Sales Pressure</span>
              </div>
              <p className="text-xs text-[#55605B] leading-relaxed">
                We present clear findings and honest treatment options, giving you full autonomy over your dental health choices.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E5DECF] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>OSHA & CDC Certified</span>
              </div>
              <p className="text-xs text-[#55605B] leading-relaxed">
                Our 2600 Care Drive office strictly adheres to and surpasses all national CDC and OSHA infection-control guidelines.
              </p>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="pt-2 border-t border-[#EBE5D9] space-y-2">
            {[
              'Comprehensive cosmetic, restorative, and family preventative dentistry',
              'Special Thursday early-bird appointments starting at 7:00 AM',
              'Same-day priority care for urgent toothaches and emergencies',
              'Warm, accommodating team treating patients like family for decades'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#2C3832]">
                <CheckCircle2 className="w-4 h-4 text-[#1F4E3D] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onBookConsultation}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-all shadow-sm"
            >
              Schedule Consultation with Dr. Sanders
            </button>
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#D6CDBD] text-[#19231E] hover:border-[#1F4E3D] text-xs font-semibold text-center transition-all"
            >
              Call Our Office: (850) 878-7916
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
