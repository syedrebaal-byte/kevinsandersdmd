import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { handleImageError } from '../data/images';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  concern: string;
  solution: string;
  timeframe: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  doctorNote: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'case-veneers',
    title: 'Porcelain Veneer Smile Harmonization',
    category: 'Cosmetic Dentistry',
    concern: 'Worn, uneven incisal edges with intrinsic coffee staining and minor gap.',
    solution: 'Conservative preparation of 6 maxillary porcelain veneers with multi-layer opalescence.',
    timeframe: '2 appointments over 2 weeks',
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=70',
    afterImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1000&q=90',
    beforeLabel: 'Initial Presentation',
    afterLabel: 'Completed Porcelain Veneers',
    doctorNote: 'Our priority was respecting the patient’s natural facial line without over-contouring. Translucent ceramic allows natural light refraction.'
  },
  {
    id: 'case-crown',
    title: 'Full Ceramic Restorative Crown',
    category: 'Restorative Care',
    concern: 'Fractured lingual cusp on upper first molar beneath a large deteriorating silver amalgam filling.',
    solution: 'Gentle amalgam removal, structural tooth core reinforcement, and custom monolithic ceramic crown.',
    timeframe: 'Same-week restoration',
    beforeImg: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=70',
    afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=90',
    beforeLabel: 'Fractured Molar',
    afterLabel: 'All-Ceramic Crown Seal',
    doctorNote: 'Sub-gingival margins were placed with extreme precision to safeguard periodontal tissue. Patient experienced zero bite discomfort.'
  },
  {
    id: 'case-whitening',
    title: 'Medical-Grade Enamel Brightening',
    category: 'Preventative & Cosmetic',
    concern: 'Decades of dark tea, red wine, and enamel matrix yellowing.',
    solution: 'Professional in-office whitening with pH-balanced desensitizing fluoride treatment.',
    timeframe: 'Single 75-minute visit',
    beforeImg: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=70',
    afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=90',
    beforeLabel: 'Shade Baseline A3.5',
    afterLabel: 'Post-Whitening Shade B1',
    doctorNote: 'Zero post-treatment sensitivity reported due to potassium nitrate integration and customized gingival shielding.'
  }
];

export const BeforeAfterGallery: React.FC<{ onRequestConsultation: (service?: string) => void }> = ({
  onRequestConsultation
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIndex];

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <div className="w-full">
      {/* Case Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CASES.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCaseIndex(index);
              setSliderPosition(50);
            }}
            className={`px-4 py-2.5 text-xs font-medium rounded-xl transition-all ${
              activeCaseIndex === index
                ? 'bg-[#1F4E3D] text-white shadow-sm'
                : 'bg-white text-[#4A5550] border border-[#E5DECF] hover:border-[#1F4E3D]'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#E5DECF] p-6 lg:p-8 shadow-sm">
        {/* Interactive Comparison Slider */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[340px] sm:h-[420px] w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-[#E5DECF]"
          >
            {/* After Image (Full background) */}
            <img
              src={activeCase.afterImg}
              alt={activeCase.afterLabel}
              onError={(e) => handleImageError(e, activeCase.afterImg)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-emerald-100 text-xs px-3 py-1 rounded-full font-medium z-10">
              {activeCase.afterLabel}
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImg}
                alt={activeCase.beforeLabel}
                onError={(e) => handleImageError(e, activeCase.beforeImg)}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-stone-200 text-xs px-3 py-1 rounded-full font-medium z-10">
                {activeCase.beforeLabel}
              </div>
            </div>

            {/* Divider Line & Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-[#1F4E3D] shadow-lg flex items-center justify-center border-2 border-[#1F4E3D]">
                <div className="flex items-center gap-0.5 text-xs font-bold">
                  ‹›
                </div>
              </div>
            </div>

            {/* Drag instruction overlay hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full pointer-events-none z-10">
              Slide left or right to compare results
            </div>
          </div>
        </div>

        {/* Case Narrative & Clinical Details */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#C5A059] uppercase tracking-wider">
              <span>{activeCase.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeCase.timeframe}</span>
            </div>
            <h3 className="text-2xl font-serif text-[#19231E] mt-1 font-semibold">
              {activeCase.title}
            </h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EBE5D9]">
              <div className="text-xs font-semibold text-[#7A7366] uppercase tracking-wider mb-1">
                Patient Concern
              </div>
              <p className="text-[#38433E]">{activeCase.concern}</p>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EBE5D9]">
              <div className="text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider mb-1">
                Restorative Approach
              </div>
              <p className="text-[#38433E]">{activeCase.solution}</p>
            </div>
          </div>

          {/* Doctor Chairside Note */}
          <div className="border-l-2 border-[#C5A059] pl-3.5 py-1 text-xs text-[#55605B] italic leading-relaxed">
            "{activeCase.doctorNote}"
            <div className="not-italic font-semibold text-[#19231E] mt-1 text-[11px]">
              — Dr. Kevin Sanders, DMD
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onRequestConsultation(activeCase.title)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-all shadow-sm"
            >
              <span>Explore Treatment Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-[#6B7670]">
              <ShieldCheck className="w-4 h-4 text-[#1F4E3D]" />
              <span>Conservative Philosophy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
