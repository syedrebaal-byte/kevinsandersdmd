import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Check, Calculator, FileText, CreditCard, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

export const FinancingCalculator: React.FC<{ onBookWithFinancing: () => void }> = ({ onBookWithFinancing }) => {
  const [treatmentAmount, setTreatmentAmount] = useState(1400);
  const [termMonths, setTermMonths] = useState<6 | 12 | 24>(12);

  // Quick Presets
  const presets = [
    { label: 'Pro Whitening', amount: 450 },
    { label: 'Porcelain Crown', amount: 1350 },
    { label: '4 Ceramic Veneers', amount: 4800 },
    { label: 'Comprehensive Care', amount: 2400 }
  ];

  // Calculate monthly payment (CareCredit 0% APR promo terms for 6 and 12 mo, standard low rate for 24 mo)
  const calculateMonthly = () => {
    if (termMonths === 6 || termMonths === 12) {
      return (treatmentAmount / termMonths).toFixed(2);
    }
    // 24 months with typical 14.9% APR factor
    const monthlyRate = 0.149 / 12;
    const monthly =
      (treatmentAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    return monthly.toFixed(2);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5DECF] p-6 lg:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Insurance & Transparency Policy */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Transparent Healthcare Economics</span>
            </div>
            <h3 className="text-2xl font-serif text-[#19231E] font-medium mt-1">
              Insurance Friendly & Flexible Financing
            </h3>
            <p className="text-sm text-[#4A5550] mt-2 leading-relaxed">
              At Sanders Family Dentistry, we believe high-caliber dental care should never involve surprise bills or confusing financial fine print. We provide written estimates before beginning treatment and handle all claims paperwork for you.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5D9]">
              <FileText className="w-4 h-4 text-[#1F4E3D] shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-[#19231E] block font-semibold">We File Your Insurance Claims</strong>
                <span className="text-[#55605B]">
                  We accept most traditional dental PPO plans. Our front office handles direct filing to ensure you maximize your policy benefits.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5D9]">
              <CreditCard className="w-4 h-4 text-[#1F4E3D] shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-[#19231E] block font-semibold">CareCredit Promotional Financing</strong>
                <span className="text-[#55605B]">
                  Qualifying patients can divide restorative and cosmetic dental treatments into manageable monthly installments, often with 0% interest terms.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5D9]">
              <Check className="w-4 h-4 text-[#1F4E3D] shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-[#19231E] block font-semibold">Multiple Payment Methods</strong>
                <span className="text-[#55605B]">
                  We welcome Visa, MasterCard, American Express, Discover, personal checks, and cash.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Estimator Tool */}
        <div className="lg:col-span-6 bg-[#FAF8F5] rounded-xl border border-[#E0D7C6] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EBE5D9] pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-[#C5A059]" />
              <span>CareCredit Monthly Payment Estimator</span>
            </div>
            <span className="text-[11px] text-[#7A7366]">0% APR Promotional Plans</span>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-medium text-[#665D4F] mb-2">
              Select Common Procedure or Custom Amount:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setTreatmentAmount(p.amount)}
                  className={`px-2.5 py-2 text-xs rounded-lg border text-center transition-all ${
                    treatmentAmount === p.amount
                      ? 'bg-[#1F4E3D] text-white border-[#1F4E3D] font-medium shadow-xs'
                      : 'bg-white text-[#4A5550] border-[#D6CDBD] hover:border-[#1F4E3D]'
                  }`}
                >
                  <div className="truncate">{p.label}</div>
                  <div className="text-[10px] opacity-80">${p.amount}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#665D4F]">Estimated Treatment Total:</span>
              <span className="text-lg font-serif font-bold text-[#1F4E3D]">
                ${treatmentAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="8000"
              step="50"
              value={treatmentAmount}
              onChange={(e) => setTreatmentAmount(Number(e.target.value))}
              className="w-full accent-[#1F4E3D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7A7366] mt-1">
              <span>$300</span>
              <span>$4,000</span>
              <span>$8,000+</span>
            </div>
          </div>

          {/* Financing Term Selector */}
          <div>
            <label className="block text-xs font-medium text-[#665D4F] mb-2">
              Financing Duration:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { months: 6, label: '6 Months', rate: '0% APR Promo' },
                { months: 12, label: '12 Months', rate: '0% APR Promo' },
                { months: 24, label: '24 Months', rate: 'Extended Term' }
              ].map((term) => (
                <button
                  key={term.months}
                  type="button"
                  onClick={() => setTermMonths(term.months as 6 | 12 | 24)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    termMonths === term.months
                      ? 'bg-[#1F4E3D] text-white border-[#1F4E3D] font-medium shadow-xs'
                      : 'bg-white text-[#4A5550] border-[#D6CDBD] hover:border-[#1F4E3D]'
                  }`}
                >
                  <div className="text-xs font-semibold">{term.label}</div>
                  <div className={`text-[10px] ${termMonths === term.months ? 'text-emerald-100' : 'text-[#7A7366]'}`}>
                    {term.rate}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-white rounded-xl border border-[#D6CDBD] p-4 text-center">
            <div className="text-xs text-[#7A7366] uppercase tracking-wider">
              Estimated Monthly Investment
            </div>
            <div className="text-3xl font-serif font-bold text-[#1F4E3D] mt-1">
              ${calculateMonthly()}
              <span className="text-xs font-sans text-[#7A7366] font-normal"> / month</span>
            </div>
            <div className="text-[11px] text-[#665D4F] mt-1">
              For {termMonths} months · Based on ${treatmentAmount.toLocaleString()} treatment total
            </div>
          </div>

          <button
            type="button"
            onClick={onBookWithFinancing}
            className="w-full py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-all shadow-sm text-center"
          >
            Discuss Financial Options in Tallahassee
          </button>

          <p className="text-[10px] text-[#7A7366] text-center leading-normal">
            *Subject to CareCredit credit approval. Minimum monthly payments required. Additional terms may apply.
          </p>
        </div>
      </div>
    </div>
  );
};
