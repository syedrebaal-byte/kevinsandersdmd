import React, { useState } from 'react';
import { CLINIC_INFO, getOfficeStatus } from '../data/dentalData';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2, Send, AlertCircle, Calendar } from 'lucide-react';

export const ContactAndLocation: React.FC<{ onRequestAppointment: () => void }> = ({ onRequestAppointment }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const status = getOfficeStatus();
  const currentDayIndex = new Date().getDay(); // 0 is Sun, 1 is Mon...

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSent(true);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Office Details & Hours */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Practice Location & Hours</span>
              <span aria-hidden="true">·</span>
              <span>Tallahassee, Florida</span>
            </div>
            <h3 className="text-3xl font-serif text-[#19231E] font-medium mt-1">
              Visit Sanders Family Dentistry
            </h3>
            <p className="text-sm text-[#4A5550] mt-2 leading-relaxed">
              Conveniently located off Care Drive in Tallahassee, our facility offers easy ground-level access, complimentary parking, and a peaceful, welcoming atmosphere.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#E5DECF] shadow-xs">
              <div className="text-xs font-semibold text-[#7A7366] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1F4E3D]" />
                <span>Office Address</span>
              </div>
              <div className="text-sm font-semibold text-[#19231E]">
                2600 Care Drive
              </div>
              <div className="text-xs text-[#55605B]">
                Tallahassee, FL 32308
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=2600+Care+Drive+Tallahassee+FL+32308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1F4E3D] hover:underline inline-flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Google Maps</span>
                </a>
                <span className="text-stone-300">·</span>
                <a
                  href="https://maps.apple.com/?q=2600+Care+Drive+Tallahassee+FL+32308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1F4E3D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E5DECF] shadow-xs">
              <div className="text-xs font-semibold text-[#7A7366] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#1F4E3D]" />
                <span>Telephone & Urgent Care</span>
              </div>
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="text-sm font-semibold text-[#19231E] hover:text-[#1F4E3D] block transition-colors"
              >
                (850) 878-7916
              </a>
              <div className="text-xs text-[#55605B]">
                Direct Front Office Line
              </div>
              <div className="mt-3 text-[11px] text-[#7A7366]">
                24h notice appreciated for reschedules
              </div>
            </div>
          </div>

          {/* Office Hours Table */}
          <div className="bg-white rounded-xl border border-[#E5DECF] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F0ECE1]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#19231E] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#1F4E3D]" />
                <span>Operating Schedule</span>
              </div>
              <div
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  status.isOpen
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {status.isOpen ? '● Currently Open' : `○ ${status.statusText}`}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {CLINIC_INFO.hours.map((h, idx) => {
                const dayMap = [0, 1, 2, 3, 4, 5, 6]; // Sun=0, Mon=1...
                const isToday =
                  (idx === 0 && currentDayIndex === 1) ||
                  (idx === 1 && currentDayIndex === 2) ||
                  (idx === 2 && currentDayIndex === 3) ||
                  (idx === 3 && currentDayIndex === 4) ||
                  (idx === 4 && currentDayIndex === 5) ||
                  (idx === 5 && currentDayIndex === 6) ||
                  (idx === 6 && currentDayIndex === 0);

                return (
                  <div
                    key={h.day}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${
                      isToday ? 'bg-emerald-50/70 font-semibold text-[#19231E]' : 'text-[#4A5550]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#1F4E3D]" />}
                      <span>{h.day}</span>
                      {h.note && (
                        <span className="text-[10px] text-[#C5A059] font-medium hidden sm:inline">
                          ({h.note})
                        </span>
                      )}
                    </span>
                    <span>
                      {h.isOpen ? `${h.open} – ${h.close}` : 'Closed'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* General Inquiry Contact Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E5DECF] p-6 lg:p-8 shadow-xs">
          <div className="mb-6">
            <div className="text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-1">
              Direct Communication
            </div>
            <h4 className="text-2xl font-serif text-[#19231E] font-medium">
              Send a Note to Our Care Team
            </h4>
            <p className="text-xs text-[#55605B] mt-1">
              Have a question about insurance, treatments, or scheduling? Fill out the note below or call us directly.
            </p>
          </div>

          {isSent ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#1F4E3D] mx-auto" />
              <h5 className="font-serif text-lg font-bold text-[#19231E]">
                Message Sent Successfully
              </h5>
              <p className="text-xs text-[#38433E]">
                Thank you, <strong>{formName}</strong>. Our front desk staff will respond to <strong>{formEmail}</strong> promptly during business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setFormMessage('');
                }}
                className="text-xs text-[#1F4E3D] underline font-semibold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Margaret Taylor"
                  className="w-full p-3 rounded-xl border border-[#E5DECF] text-xs text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="margaret@example.com"
                    className="w-full p-3 rounded-xl border border-[#E5DECF] text-xs text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="(850) 555-0144"
                    className="w-full p-3 rounded-xl border border-[#E5DECF] text-xs text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#665D4F] uppercase tracking-wider mb-1">
                  How can we help you? *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Inquire about crowns, veneers, accepted insurance plans, or scheduling..."
                  className="w-full p-3 rounded-xl border border-[#E5DECF] text-xs text-[#19231E] focus:outline-none focus:ring-1 focus:ring-[#1F4E3D]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Clinic</span>
                </button>

                <button
                  type="button"
                  onClick={onRequestAppointment}
                  className="text-xs text-[#1F4E3D] hover:underline font-semibold"
                >
                  Ready to book? Request Visit Online →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
