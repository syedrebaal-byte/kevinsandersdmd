import React, { useState } from 'react';
import { PRACTICE_FAQS } from '../data/dentalData';
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4 text-[#C5A059]" />
          <span>Patient Clarity & Information</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#19231E] font-medium">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#55605B] mt-2">
          Everything you need to know about our Tallahassee dental practice, insurances, scheduling, and clinical approach.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {PRACTICE_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E5DECF] overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-serif text-base sm:text-lg text-[#19231E] font-medium">
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-[#E5DECF] transition-transform ${
                    isOpen ? 'rotate-180 bg-[#1F4E3D] text-white' : 'text-[#7A7366] bg-[#FAF8F5]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A5550] leading-relaxed border-t border-[#F0ECE1] bg-[#FAF8F5]/50 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="mt-8 text-center bg-[#FAF8F5] rounded-xl border border-[#E5DECF] p-4 max-w-lg mx-auto text-xs text-[#55605B] flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>Have an inquiry not listed here?</span>
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          className="font-semibold text-[#1F4E3D] hover:underline inline-flex items-center gap-1"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call our office at (850) 878-7916</span>
        </a>
      </div>
    </div>
  );
};
