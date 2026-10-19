import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Phone, MapPin, Download, AlertCircle, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService = ''
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [service, setService] = useState(preselectedService || 'Comprehensive Exam & Cleaning');
  const [patientType, setPatientType] = useState<'new' | 'returning'>('new');
  const [preferredDay, setPreferredDay] = useState('Monday');
  const [preferredTime, setPreferredTime] = useState('Morning (8:00 AM – 12:00 PM)');
  const [preferredDate, setPreferredDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleNextStep1 = () => {
    if (!service) {
      setErrorMessage('Please select a visit reason');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleNextStep2 = () => {
    setErrorMessage('');
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 600);
  };

  // Generate downloadable .ics calendar file
  const downloadCalendarInvite = () => {
    const title = `Dental Appointment with Dr. Kevin Sanders, DMD`;
    const description = `Requested ${service} at Sanders Family Dentistry. Phone: (850) 878-7916. Address: 2600 Care Drive, Tallahassee, FL 32308.`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sanders Family Dentistry//Tallahassee FL//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:2600 Care Drive, Tallahassee, FL 32308`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sanders-Dentistry-Appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5DECF] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#1F4E3D] text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold">
              Sanders Family Dentistry · Tallahassee, FL
            </div>
            <h2 className="text-xl font-serif font-medium mt-0.5">
              Request Your Dental Appointment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-800/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="flex border-b border-[#F0ECE1] bg-[#FAF8F5] px-6 py-3 text-xs text-[#7A7366] items-center justify-between">
            <span className={step >= 1 ? 'font-semibold text-[#1F4E3D]' : ''}>1. Visit Reason</span>
            <span>→</span>
            <span className={step >= 2 ? 'font-semibold text-[#1F4E3D]' : ''}>2. Preferred Time</span>
            <span>→</span>
            <span className={step >= 3 ? 'font-semibold text-[#1F4E3D]' : ''}>3. Patient Info</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Visit Reason & Patient Type */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-2">
                  Are you a new or returning patient?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPatientType('new')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      patientType === 'new'
                        ? 'border-[#1F4E3D] bg-emerald-50/50 text-[#19231E] font-medium ring-1 ring-[#1F4E3D]'
                        : 'border-[#E5DECF] bg-white text-[#4A5550] hover:border-[#1F4E3D]'
                    }`}
                  >
                    <div className="text-sm font-semibold">New Patient</div>
                    <div className="text-xs text-[#7A7366]">First visit to Sanders Family Dentistry</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientType('returning')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      patientType === 'returning'
                        ? 'border-[#1F4E3D] bg-emerald-50/50 text-[#19231E] font-medium ring-1 ring-[#1F4E3D]'
                        : 'border-[#E5DECF] bg-white text-[#4A5550] hover:border-[#1F4E3D]'
                    }`}
                  >
                    <div className="text-sm font-semibold">Returning Patient</div>
                    <div className="text-xs text-[#7A7366]">I am an existing patient of Dr. Sanders</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-2">
                  What is the primary reason for your visit?
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Comprehensive Exam, X-Rays & Gentle Cleaning', desc: 'Routine preventative care' },
                    { label: 'Porcelain Veneers / Cosmetic Consultation', desc: 'Smile enhancement & aesthetics' },
                    { label: 'Dental Crown, Bridge or Broken Tooth Repair', desc: 'Restore damaged or aching tooth' },
                    { label: 'Professional In-Office Teeth Whitening', desc: 'Deep stain removal & brightening' },
                    { label: 'Emergency Toothache / Sudden Discomfort', desc: 'Priority relief & evaluation' },
                    { label: 'Second Opinion / Treatment Consultation', desc: 'Honest review of existing treatment plan' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setService(item.label)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        service === item.label
                          ? 'border-[#1F4E3D] bg-[#FAF8F5] text-[#19231E] ring-1 ring-[#1F4E3D]'
                          : 'border-[#E5DECF] bg-white text-[#4A5550] hover:border-[#1F4E3D]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-[#7A7366]">{item.desc}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          service === item.label ? 'border-[#1F4E3D] bg-[#1F4E3D]' : 'border-gray-300'
                        }`}
                      >
                        {service === item.label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={handleNextStep1}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-colors"
                >
                  <span>Continue to Preferred Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Preferred Schedule */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-2">
                  Select Preferred Day of the Week
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { day: 'Monday', hours: '8 AM – 5 PM' },
                    { day: 'Tuesday', hours: '8 AM – 5 PM' },
                    { day: 'Wednesday', hours: '8 AM – 5 PM' },
                    { day: 'Thursday', hours: '7 AM – 3:30 PM', badge: 'Early Bird' }
                  ].map((d) => (
                    <button
                      key={d.day}
                      type="button"
                      onClick={() => setPreferredDay(d.day)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        preferredDay === d.day
                          ? 'border-[#1F4E3D] bg-emerald-50/50 ring-1 ring-[#1F4E3D]'
                          : 'border-[#E5DECF] bg-white hover:border-[#1F4E3D]'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#19231E]">{d.day}</div>
                      <div className="text-[11px] text-[#7A7366]">{d.hours}</div>
                      {d.badge && (
                        <div className="mt-1 text-[10px] font-medium text-[#C5A059] uppercase tracking-wide">
                          {d.badge}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-2">
                  Select Preferred Time of Day
                </label>
                <div className="space-y-2">
                  {[
                    { time: 'Early Morning (Thursday 7:00 AM – 9:00 AM)', desc: 'Before work or school starts' },
                    { time: 'Morning (8:00 AM – 12:00 PM)', desc: 'Standard morning schedule' },
                    { time: 'Afternoon (1:00 PM – 4:30 PM)', desc: 'Convenient afternoon slots' },
                    { time: 'First Available Slot', desc: 'Any open time this week' }
                  ].map((t) => (
                    <button
                      key={t.time}
                      type="button"
                      onClick={() => setPreferredTime(t.time)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        preferredTime === t.time
                          ? 'border-[#1F4E3D] bg-[#FAF8F5] ring-1 ring-[#1F4E3D]'
                          : 'border-[#E5DECF] bg-white hover:border-[#1F4E3D]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium text-[#19231E]">{t.time}</div>
                        <div className="text-xs text-[#7A7366]">{t.desc}</div>
                      </div>
                      <Clock className="w-4 h-4 text-[#1F4E3D]" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                  Optional: Specific Preferred Date (if any)
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5DECF] text-sm text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5DECF] text-xs font-medium text-[#4A5550] hover:bg-[#FAF8F5]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep2}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-colors"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Patient Info */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full p-3 rounded-xl border border-[#E5DECF] text-sm text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                    Phone Number (Cell) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(850) 555-0192"
                    className="w-full p-3 rounded-xl border border-[#E5DECF] text-sm text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full p-3 rounded-xl border border-[#E5DECF] text-sm text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                    Dental Insurance Provider (Optional)
                  </label>
                  <input
                    type="text"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    placeholder="e.g. Delta Dental PPO, MetLife, Self-Pay"
                    className="w-full p-3 rounded-xl border border-[#E5DECF] text-sm text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                  Notes or Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us if you have any sensitive areas, dental anxiety, or specific cosmetic goals..."
                  className="w-full p-3 rounded-xl border border-[#E5DECF] text-sm text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE5D9] text-xs text-[#665D4F] flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#1F4E3D] shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy & Security:</strong> We respect your confidentiality. Your contact information is used exclusively by Sanders Family Dentistry to coordinate your appointment.
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5DECF] text-xs font-medium text-[#4A5550] hover:bg-[#FAF8F5]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment Request</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation */}
          {step === 4 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1F4E3D] flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#19231E] font-medium">
                  Appointment Request Received
                </h3>
                <p className="text-sm text-[#4A5550] max-w-md mx-auto mt-1">
                  Thank you, <strong>{fullName}</strong>. Our front office coordinator at Sanders Family Dentistry will contact you shortly at <strong>{phone}</strong> to confirm your exact time slot.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAF8F5] rounded-xl border border-[#E5DECF] p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-[#EBE5D9] pb-2">
                  <span className="text-[#7A7366]">Requested Visit:</span>
                  <span className="font-semibold text-[#19231E]">{service}</span>
                </div>
                <div className="flex justify-between border-b border-[#EBE5D9] pb-2">
                  <span className="text-[#7A7366]">Preferred Timing:</span>
                  <span className="font-semibold text-[#19231E]">
                    {preferredDay} · {preferredTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#EBE5D9] pb-2">
                  <span className="text-[#7A7366]">Patient Status:</span>
                  <span className="font-semibold text-[#19231E]">
                    {patientType === 'new' ? 'New Patient' : 'Returning Patient'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7366]">Location:</span>
                  <span className="font-semibold text-[#19231E]">2600 Care Drive, Tallahassee, FL</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={downloadCalendarInvite}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#1F4E3D] text-[#1F4E3D] text-xs font-semibold hover:bg-emerald-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us: (850) 878-7916</span>
                </a>
              </div>

              <p className="text-[11px] text-[#7A7366]">
                Notice: If you need immediate emergency dental care, please call the office directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
