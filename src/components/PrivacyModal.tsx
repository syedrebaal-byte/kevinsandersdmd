import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'accessibility';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5DECF] overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#1F4E3D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
            <h3 className="text-lg font-serif font-medium">
              {type === 'privacy' && 'HIPAA & Patient Privacy Practices'}
              {type === 'terms' && 'Website Terms of Use & Medical Disclaimer'}
              {type === 'accessibility' && 'ADA Digital Accessibility Statement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#4A5550] leading-relaxed flex-1">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Notice of Privacy Practices (HIPAA):</strong> Sanders Family Dentistry (Office of Dr. Kevin Sanders, DMD) is committed to safeguarding your personal and protected health information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA) and applicable Florida state laws.
              </p>
              <h4 className="font-semibold text-[#19231E] text-sm pt-2">How We Protect Your Health Data:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>We collect personal contact and insurance information solely to facilitate clinical care, appointments, and insurance claim processing.</li>
                <li>Your health records are stored in secure, encrypted systems adhering to federal privacy standards.</li>
                <li>We do not sell, rent, or distribute patient contact details to commercial third parties.</li>
                <li>You have the right to inspect, obtain copies, and request amendments to your dental records by contacting our Tallahassee office at (850) 878-7916.</li>
              </ul>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>Educational Disclaimer:</strong> The clinical descriptions, service explanations, and smile assessment tools provided on this website are intended solely for educational information and patient convenience. They do not constitute a definitive medical diagnosis or create a formal doctor-patient relationship until an in-person clinical examination is conducted by Dr. Kevin Sanders, DMD.
              </p>
              <h4 className="font-semibold text-[#19231E] text-sm pt-2">Appointment Requests:</h4>
              <p className="text-xs">
                Submissions through our online appointment request forms represent requested timeframes. All appointments are finalized and confirmed directly by our Tallahassee front office team via telephone or written confirmation.
              </p>
              <h4 className="font-semibold text-[#19231E] text-sm pt-2">Cancellation Policy:</h4>
              <p className="text-xs">
                Because dedicated doctor and hygienist operatories are reserved exclusively for your scheduled visit, we kindly request a minimum of 24 hours advance notice for appointment cancellations or rescheduling.
              </p>
            </>
          )}

          {type === 'accessibility' && (
            <>
              <p>
                <strong>Commitment to Digital Accessibility:</strong> Sanders Family Dentistry is dedicated to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We actively work to adhere to Level AA standards of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG 2.1).
              </p>
              <h4 className="font-semibold text-[#19231E] text-sm pt-2">Accessibility Features Implemented:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>High-contrast text complying with WCAG AA ratios.</li>
                <li>Keyboard navigation support and visible focus indicators.</li>
                <li>Descriptive alternative text for dental imagery.</li>
                <li>Accessible form labels and clear error validation messages.</li>
                <li>Respect for operating system reduced-motion preferences.</li>
              </ul>
              <p className="pt-2 text-xs">
                If you encounter any difficulty accessing content or completing an appointment request, please call our Tallahassee team directly at (850) 878-7916 and we will be delighted to assist you.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E5DECF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
