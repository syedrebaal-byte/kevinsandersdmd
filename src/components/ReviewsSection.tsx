import React, { useState } from 'react';
import { VERIFIED_REVIEWS, CLINIC_INFO } from '../data/dentalData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? VERIFIED_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === VERIFIED_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = VERIFIED_REVIEWS[activeIndex];

  return (
    <div className="w-full">
      {/* Overall Score Banner */}
      <div className="bg-[#1F4E3D] text-white rounded-2xl p-8 lg:p-10 mb-8 relative overflow-hidden shadow-sm">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
              <span>Verified Patient Experiences</span>
              <span aria-hidden="true">·</span>
              <span>Sanders Family Dentistry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium leading-tight">
              Loved by Tallahassee Families for Gentle Care & Honest Advice.
            </h2>
            <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Patients consistently highlight Dr. Kevin Sanders' straightforward approach, the gentle touch of our hygienists, and our welcoming, family-like environment.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/15 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-1 text-amber-300 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <div className="text-3xl font-serif font-bold text-white mt-1">
              4.9 / 5.0
            </div>
            <div className="text-xs text-emerald-200 mt-1">
              Consistently high patient praise for honesty & comfort
            </div>
          </div>
        </div>
      </div>

      {/* Featured Testimonial Slider / Grid */}
      <div className="bg-white rounded-2xl border border-[#E5DECF] p-6 lg:p-10 shadow-xs relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0ECE1]">
          <div className="flex items-center gap-2">
            <Quote className="w-8 h-8 text-[#C5A059]/40" />
            <span className="text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider">
              {current.procedureTag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevReview}
              className="p-2 rounded-lg border border-[#E5DECF] text-[#4A5550] hover:text-[#19231E] hover:border-[#1F4E3D] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#7A7366] px-1">
              {activeIndex + 1} of {VERIFIED_REVIEWS.length}
            </span>
            <button
              onClick={nextReview}
              className="p-2 rounded-lg border border-[#E5DECF] text-[#4A5550] hover:text-[#19231E] hover:border-[#1F4E3D] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quote Body */}
        <blockquote className="text-lg sm:text-xl font-serif text-[#19231E] italic leading-relaxed mb-6 min-h-[90px]">
          "{current.quote}"
        </blockquote>

        {/* Author Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#F0ECE1]">
          <div>
            <div className="font-semibold text-sm text-[#19231E]">
              {current.author}
            </div>
            <div className="text-xs text-[#7A7366]">
              {current.location}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1F4E3D] font-medium bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DECF]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{current.verifiedSource}</span>
          </div>
        </div>
      </div>

      {/* Grid of Other Patient Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {VERIFIED_REVIEWS.filter((_, idx) => idx !== activeIndex).slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="p-5 bg-[#FAF8F5] rounded-xl border border-[#E5DECF] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-[#38433E] italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EBE5D9] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#19231E]">{item.author}</span>
              <span className="text-[#7A7366]">{item.procedureTag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
