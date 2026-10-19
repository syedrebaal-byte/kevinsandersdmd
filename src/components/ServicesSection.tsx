import React, { useState } from 'react';
import { DENTAL_SERVICES, ServiceDetail } from '../data/dentalData';
import { Sparkles, ArrowRight, Check, X, Shield, Clock, ChevronRight, HelpCircle } from 'lucide-react';
import { handleImageError } from '../data/images';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cosmetic' | 'restorative' | 'preventative' | 'technology'>('all');
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const filteredServices = activeCategory === 'all'
    ? DENTAL_SERVICES
    : DENTAL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex p-1.5 bg-[#EFEAE1] rounded-xl border border-[#DFD7C7] max-w-full overflow-x-auto">
          {[
            { id: 'all', label: 'All Treatments' },
            { id: 'cosmetic', label: 'Cosmetic Dentistry' },
            { id: 'restorative', label: 'Restorative Care' },
            { id: 'preventative', label: 'Preventative & Hygiene' },
            { id: 'technology', label: 'Diagnostic Tech' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-white text-[#19231E] shadow-xs font-semibold'
                  : 'text-[#665D4F] hover:text-[#19231E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, idx) => (
          <div
            key={service.id}
            className="group bg-white rounded-2xl border border-[#E5DECF] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF8F5]">
                <img
                  src={service.image}
                  alt={service.name}
                  onError={(e) => handleImageError(e, service.image)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Subtle category stamp - unboxed text */}
                <div className="absolute top-3 left-3 bg-[#1F4E3D]/90 backdrop-blur-md text-emerald-100 text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {service.category.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider mb-1">
                  0{idx + 1}. Clinical Care
                </div>
                <h3 className="text-xl font-serif text-[#19231E] font-semibold group-hover:text-[#1F4E3D] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-[#55605B] mt-2 line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Key Benefits preview */}
                <div className="mt-4 pt-3 border-t border-[#F0ECE1] space-y-1.5">
                  {service.keyBenefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#38433E]">
                      <Check className="w-3.5 h-3.5 text-[#1F4E3D] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#FAF8F5] mt-4">
              <button
                type="button"
                onClick={() => setSelectedService(service)}
                className="text-xs font-semibold text-[#1F4E3D] hover:text-[#16382C] inline-flex items-center gap-1 transition-colors"
              >
                <span>View Details & Steps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onBookService(service.name)}
                className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#1F4E3D] text-[#19231E] hover:text-white border border-[#E5DECF] hover:border-[#1F4E3D] text-xs font-medium transition-all"
              >
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E5DECF] overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-[#1F4E3D] text-white flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                  {selectedService.category} Dentistry · Dr. Kevin Sanders, DMD
                </div>
                <h2 className="text-2xl font-serif font-medium mt-0.5">
                  {selectedService.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
                aria-label="Close service modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <p className="text-sm text-[#38433E] leading-relaxed">
                  {selectedService.fullDescription}
                </p>
              </div>

              {/* Technology Highlight */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DECF] flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#19231E] block font-semibold mb-0.5">
                    Advanced Technology in Use:
                  </strong>
                  <span className="text-[#55605B]">{selectedService.techHighlight}</span>
                </div>
              </div>

              {/* 4-Step Procedure Walkthrough */}
              <div>
                <h4 className="text-sm font-semibold text-[#19231E] uppercase tracking-wider mb-3">
                  What to Expect: Step-by-Step Procedure
                </h4>
                <div className="space-y-3">
                  {selectedService.procedureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#F0ECE1] bg-[#FAF8F5] flex items-start gap-3 text-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#1F4E3D] text-white flex items-center justify-center font-bold shrink-0 text-[11px]">
                        {idx + 1}
                      </div>
                      <div>
                        <strong className="text-[#19231E] block font-semibold">{step.title}</strong>
                        <span className="text-[#55605B] mt-0.5 block">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Checklist & Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DECF]">
                  <h5 className="text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-2">
                    Key Clinical Benefits
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#4A5550]">
                    {selectedService.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1F4E3D] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DECF]">
                  <h5 className="text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-2">
                    Ideal Candidate Profile
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#4A5550]">
                    {selectedService.idealFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Specific FAQs */}
              {selectedService.faqs.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#19231E] uppercase tracking-wider mb-3">
                    Frequently Asked Questions
                  </h4>
                  <div className="space-y-2.5">
                    {selectedService.faqs.map((faq, i) => (
                      <div key={i} className="p-3.5 bg-white border border-[#E5DECF] rounded-xl text-xs">
                        <div className="font-semibold text-[#19231E] mb-1">{faq.q}</div>
                        <div className="text-[#55605B] leading-relaxed">{faq.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E5DECF] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#7A7366]">
                Questions? Call our team directly at (850) 878-7916
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E5DECF] text-xs font-medium text-[#4A5550] hover:bg-white w-1/2 sm:w-auto"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedService.name;
                    setSelectedService(null);
                    onBookService(name);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-colors w-1/2 sm:w-auto"
                >
                  Request Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
