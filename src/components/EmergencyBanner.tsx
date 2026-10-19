import React, { useState } from 'react';
import { Phone, AlertCircle, Clock, ShieldAlert, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

export const EmergencyBanner: React.FC<{ onBookEmergency: () => void }> = ({ onBookEmergency }) => {
  const [showTriageGuide, setShowTriageGuide] = useState(false);

  return (
    <div className="w-full bg-[#19231E] text-white rounded-2xl p-6 lg:p-8 border border-stone-800 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Urgent Dental Care in Tallahassee</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="text-stone-300">Same-Day Priority Slots</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white">
            Experiencing Severe Tooth Pain or a Broken Tooth?
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Sanders Family Dentistry reserves dedicated daily schedule time to address urgent toothaches, cracked restorations, and dental trauma. Call our office immediately for priority relief.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now: (850) 878-7916</span>
          </a>

          <button
            type="button"
            onClick={onBookEmergency}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-all"
          >
            <span>Request Urgent Slot</span>
          </button>
        </div>
      </div>

      {/* Triage Accordion Toggle */}
      <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col">
        <button
          onClick={() => setShowTriageGuide(!showTriageGuide)}
          className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-200 self-start transition-colors"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>{showTriageGuide ? 'Hide Immediate At-Home Emergency Steps' : 'View What to Do Right Now (Immediate Triage Steps)'}</span>
          {showTriageGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showTriageGuide && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-stone-300 animate-in fade-in duration-200">
            <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
              <strong className="text-white block font-semibold mb-1 text-sm">
                Severe Toothache
              </strong>
              <p className="text-stone-400 leading-relaxed">
                Rinse gently with warm salt water. Floss carefully to remove trapped food debris. Do not apply aspirin directly to gums. Call us at (850) 878-7916 for diagnosis.
              </p>
            </div>

            <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
              <strong className="text-white block font-semibold mb-1 text-sm">
                Broken or Chipped Tooth
              </strong>
              <p className="text-stone-400 leading-relaxed">
                Save any broken tooth fragments. Rinse mouth with warm water and apply a cold compress to your cheek to minimize swelling until you reach our clinic.
              </p>
            </div>

            <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
              <strong className="text-white block font-semibold mb-1 text-sm">
                Dislodged Crown or Filling
              </strong>
              <p className="text-stone-400 leading-relaxed">
                Keep the crown clean. You may temporarily seat it with a tiny dab of over-the-counter dental cement or toothpaste. Avoid chewing on that side and call us.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
