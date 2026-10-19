import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface SmileAssessmentQuizProps {
  onSelectService: (serviceName: string) => void;
}

export const SmileAssessmentQuiz: React.FC<SmileAssessmentQuizProps> = ({ onSelectService }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 0,
      title: 'What is your primary smile goal or dental concern?',
      options: [
        { label: 'Deeply brighten yellowed or coffee-stained teeth', category: 'whitening', recommendation: 'Professional Teeth Whitening' },
        { label: 'Repair a cracked, broken, or deeply aching tooth', category: 'crown', recommendation: 'Custom Porcelain Crowns' },
        { label: 'Fix chipped front edges or close small gaps between teeth', category: 'bonding', recommendation: 'Aesthetic Composite Bonding' },
        { label: 'Achieve a complete, harmonious smile transformation', category: 'veneers', recommendation: 'Porcelain Veneers' },
        { label: 'Gentle, thorough dental cleaning and health checkup', category: 'preventative', recommendation: 'Comprehensive Exams & Ultrasonic Hygiene' }
      ]
    },
    {
      id: 1,
      title: 'How do your teeth typically feel with hot, cold, or sweet foods?',
      options: [
        { label: 'Mild to severe sensitivity to cold drinks or air', note: 'Desensitizing treatment recommended' },
        { label: 'Occasional ache when chewing tough food', note: 'Bite and structural exam suggested' },
        { label: 'No sensitivity, teeth feel strong and healthy', note: 'Ideal baseline candidate' },
        { label: 'I experience dental anxiety and prefer gentle, paced visits', note: 'Gentle patient-first protocol applied' }
      ]
    },
    {
      id: 2,
      title: 'What is your preferred timeline for treatment?',
      options: [
        { label: 'As soon as possible / upcoming event or wedding', note: 'Priority scheduling' },
        { label: 'Within the next few weeks at my convenience', note: 'Flexible morning/afternoon' },
        { label: 'Thursday early morning (7:00 AM) before work', note: 'Tallahassee early bird slot' },
        { label: 'Just researching conservative options for now', note: 'Honest consultation with Dr. Sanders' }
      ]
    }
  ];

  const handleSelectOption = (optionIndex: number) => {
    const q = questions[currentQuestion];
    const selected = q.options[optionIndex];
    setAnswers({ ...answers, [currentQuestion]: selected.label });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsCompleted(false);
  };

  // Derive customized recommendation based on Question 0
  const getRecommendation = () => {
    const q0Answer = answers[0] || '';
    if (q0Answer.includes('brighten')) {
      return {
        service: 'Professional Teeth Whitening',
        description: 'Our medical-grade in-office whitening combined with potassium nitrate desensitizers lifts up to 8 shades while protecting sensitive enamel.',
        benefits: ['Completed in 75 minutes', 'Zero enamel erosion', 'Custom take-home trays for lasting touch-ups'],
        doctorNote: 'Dr. Sanders ensures your enamel is healthy prior to whitening to ensure safe, even, and pain-free brightening.'
      };
    } else if (q0Answer.includes('cracked') || q0Answer.includes('aching')) {
      return {
        service: 'Custom Porcelain Crowns',
        description: 'A full-coverage ceramic restoration will protect your compromised tooth from further fracture and restore complete chewing strength.',
        benefits: ['Metal-free porcelain', 'Protects against tooth loss', 'Balanced for seamless natural bite'],
        doctorNote: 'Dr. Sanders emphasizes sub-gingival margin precision so your gumline remains healthy and pink.'
      };
    } else if (q0Answer.includes('chipped') || q0Answer.includes('gaps')) {
      return {
        service: 'Aesthetic Composite Bonding',
        description: 'A single-appointment conservative treatment where tooth-colored resin is sculpted by hand to close gaps and restore chips.',
        benefits: ['Completed in one appointment', 'Preserves 100% of healthy enamel', 'Budget-friendly with immediate results'],
        doctorNote: 'Often accomplished without local anesthesia shots, providing instant aesthetic harmony.'
      };
    } else if (q0Answer.includes('harmonious')) {
      return {
        service: 'Porcelain Veneers',
        description: 'Ultra-thin handcrafted ceramic shells individually designed to create balance, light-refracting luster, and natural symmetry.',
        benefits: ['Highly stain-resistant', '15+ year clinical durability', 'Conservative facial preparation'],
        doctorNote: 'We avoid the artificial flat "chiclet" look in favor of lifelike translucency and organic tooth contours.'
      };
    } else {
      return {
        service: 'Comprehensive Exams & Ultrasonic Hygiene',
        description: 'Our celebrated Tallahassee dental hygienists provide gentle ultrasonic plaque removal, low-radiation digital imaging, and oral cancer screening.',
        benefits: ['Warm ultrasonic irrigation', 'Gentle for sensitive gums', 'Straightforward review with Dr. Sanders'],
        doctorNote: 'We never pressure you into treatments you don’t need. We show you your digital images chairside.'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5DECF] p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F0ECE1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4E3D] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Personalized Care Guide</span>
            <span aria-hidden="true">·</span>
            <span>3-Step Consultation Tool</span>
          </div>
          <h3 className="text-xl font-serif text-[#19231E] font-medium mt-1">
            Find the Right Dental Treatment for Your Goals
          </h3>
        </div>

        {!isCompleted && (
          <div className="text-xs text-[#7A7366] font-medium">
            Step {currentQuestion + 1} of {questions.length}
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1F4E3D] h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-medium text-[#19231E] mb-4">
              {questions[currentQuestion].title}
            </h4>
            <div className="space-y-2.5">
              {questions[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full p-4 rounded-xl border border-[#E5DECF] bg-[#FAF8F5] hover:bg-white hover:border-[#1F4E3D] hover:shadow-xs text-left transition-all group flex items-center justify-between"
                >
                  <span className="text-sm text-[#2C3832] font-medium group-hover:text-[#1F4E3D]">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#A89E8D] group-hover:text-[#1F4E3D] shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#E5DECF] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#1F4E3D]" />
              <span>Recommended Starting Consultation</span>
            </div>

            <h4 className="text-2xl font-serif text-[#19231E] font-semibold">
              {recommendation.service}
            </h4>

            <p className="text-sm text-[#4A5550] mt-2 leading-relaxed">
              {recommendation.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-[#EBE5D9]">
              {recommendation.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#2C3832]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F4E3D] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#EBE5D9] text-xs text-[#665D4F] italic">
              <strong>Clinical Note:</strong> "{recommendation.doctorNote}"
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-1.5 text-xs text-[#7A7366] hover:text-[#19231E] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Smile Assessment</span>
            </button>

            <button
              onClick={() => onSelectService(recommendation.service)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F4E3D] text-white text-xs font-semibold hover:bg-[#16382C] transition-all shadow-sm"
            >
              <span>Schedule Consultation for {recommendation.service}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
