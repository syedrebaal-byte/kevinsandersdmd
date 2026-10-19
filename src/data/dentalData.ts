/**
 * Verified Practice Data for Sanders Family Dentistry
 * Dr. Kevin Sanders, DMD - Tallahassee, Florida
 * Source of truth: https://www.kevinsandersdmd.net/
 */

export interface ServiceDetail {
  id: string;
  name: string;
  category: 'cosmetic' | 'restorative' | 'preventative' | 'technology';
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  keyBenefits: string[];
  procedureSteps: { title: string; desc: string }[];
  idealFor: string[];
  techHighlight: string;
  faqs: { q: string; a: string }[];
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  procedureTag: string;
  verifiedSource: string;
  rating: number;
}

export const CLINIC_INFO = {
  name: "Sanders Family Dentistry",
  doctorName: "Dr. Kevin Sanders, DMD",
  doctorTitle: "General & Cosmetic Dentist",
  address: "2600 Care Drive",
  city: "Tallahassee",
  state: "FL",
  zip: "32308",
  fullAddress: "2600 Care Drive, Tallahassee, FL 32308",
  phone: "(850) 878-7916",
  phoneRaw: "8508787916",
  emergencyPhone: "(850) 878-7916",
  email: "care@kevinsandersdmd.net",
  websiteUrl: "https://www.kevinsandersdmd.net/",
  cancellationNotice: "24 Hours Notice Appreciated",
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM", isOpen: true },
    { day: "Tuesday", open: "8:00 AM", close: "5:00 PM", isOpen: true },
    { day: "Wednesday", open: "8:00 AM", close: "5:00 PM", isOpen: true },
    { day: "Thursday", open: "7:00 AM", close: "3:30 PM", isOpen: true, note: "Early Bird Hours from 7:00 AM" },
    { day: "Friday", open: "Closed", close: "Closed", isOpen: false },
    { day: "Saturday", open: "Closed", close: "Closed", isOpen: false },
    { day: "Sunday", open: "Closed", close: "Closed", isOpen: false }
  ],
  insurancesSummary: "We accept most traditional dental PPO plans and file claims on your behalf. Flexible financing available via CareCredit.",
  acceptedPaymentMethods: ["CareCredit 0% APR Financing", "Delta Dental PPO", "MetLife", "Cigna Dental", "Aetna PPO", "Guardian", "Major Credit Cards (Visa, MC, Amex, Discover)", "Checks & Cash"],
  googleRating: 4.9,
  yearsOfExperience: 25,
  safetyStandards: "Surpasses all OSHA and CDC infection control and sterilization guidelines."
};

/**
 * Returns current Tallahassee office open status
 */
export function getOfficeStatus(): { isOpen: boolean; statusText: string; nextOpenText: string } {
  const now = new Date();
  // Tallahassee is US Eastern Time (ET)
  const estString = now.toLocaleString("en-US", { timeZone: "America/New_York" });
  const estDate = new Date(estString);
  const day = estDate.getDay(); // 0 is Sun, 1 is Mon, 4 is Thu, 5 is Fri, 6 is Sat
  const hours = estDate.getHours();
  const minutes = estDate.getMinutes();
  const currentDecimalTime = hours + minutes / 60;

  if (day >= 1 && day <= 3) {
    // Mon, Tue, Wed: 8:00 to 17:00
    if (currentDecimalTime >= 8 && currentDecimalTime < 17) {
      return { isOpen: true, statusText: "Open Today until 5:00 PM", nextOpenText: "Closes at 5:00 PM" };
    }
  } else if (day === 4) {
    // Thu: 7:00 to 15.5
    if (currentDecimalTime >= 7 && currentDecimalTime < 15.5) {
      return { isOpen: true, statusText: "Open Today until 3:30 PM", nextOpenText: "Closes at 3:30 PM" };
    }
  }

  // If currently closed, calculate next opening
  let nextText = "Opens Mon at 8:00 AM";
  if (day >= 1 && day <= 3 && currentDecimalTime < 8) {
    nextText = "Opens Today at 8:00 AM";
  } else if (day === 4 && currentDecimalTime < 7) {
    nextText = "Opens Today at 7:00 AM";
  } else if (day >= 1 && day <= 2 && currentDecimalTime >= 17) {
    nextText = "Opens Tomorrow at 8:00 AM";
  } else if (day === 3 && currentDecimalTime >= 17) {
    nextText = "Opens Tomorrow at 7:00 AM (Early Bird)";
  }

  return { isOpen: false, statusText: "Currently Closed", nextOpenText: nextText };
}

export const DENTAL_SERVICES: ServiceDetail[] = [
  {
    id: "porcelain-veneers",
    name: "Porcelain Veneers",
    category: "cosmetic",
    tagline: "Custom handcrafted ceramic shells designed for enduring beauty and balance.",
    shortDescription: "Ultra-thin, custom-fabricated dental porcelain veneers that correct chips, gaps, deep discoloration, or irregular spacing while preserving maximum natural enamel.",
    fullDescription: "At Sanders Family Dentistry, our cosmetic veneer philosophy is grounded in conservative tooth preservation and lifelike translucency. Rather than creating artificially flat or opaque smiles, Dr. Kevin Sanders carefully plans the micro-texture, incisal edge light refraction, and subtle shade gradients of each porcelain veneer to harmonize with your facial aesthetics and natural lip line.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "High stain resistance against coffee, tea, and red wine",
      "Conservative enamel preparation to protect underlying tooth health",
      "Custom shade and texture matching for natural, unforced beauty",
      "Durable ceramic construction engineered to last 15+ years with proper hygiene"
    ],
    procedureSteps: [
      { title: "1. Aesthetic Consultation & Photography", desc: "Detailed discussion of your smile goals, high-definition digital impressions, and facial proportion mapping." },
      { title: "2. Conservative Preparation & Provisionals", desc: "Sub-millimeter tooth preparation followed by comfortable temporary veneers so you can test-drive your new shape." },
      { title: "3. Precision Laboratory Fabrication", desc: "Master ceramists handcraft each custom porcelain veneer with multi-layered light refraction." },
      { title: "4. Definitive Bond & Polish", desc: "Dr. Sanders meticulously bonds each veneer with high-strength resin cement and verifies your bite harmony." }
    ],
    idealFor: [
      "Chipped, worn, or uneven teeth",
      "Intrinsic tetracycline or fluorosis stains unresponsive to whitening",
      "Minor gaps (diastemas) and slight cosmetic crowding",
      "Patients seeking an enduring, refined smile transformation"
    ],
    techHighlight: "Intraoral digital imaging and electric handpieces for ultra-quiet, micro-precise contouring.",
    faqs: [
      { q: "How long do porcelain veneers last?", a: "With routine cleanings and regular home flossing and brushing, high-quality porcelain veneers typically last 15 to 20 years." },
      { q: "Does getting veneers hurt?", a: "The procedure is very gentle. Local anesthesia is used during preparation, and patients report little to no discomfort throughout the process." },
      { q: "Can I eat normally with veneers?", a: "Yes. Once fully bonded, veneers function like healthy natural enamel. We only advise against biting directly into non-food items or ice." }
    ]
  },
  {
    id: "dental-crowns",
    name: "Custom Porcelain Crowns",
    category: "restorative",
    tagline: "Full-coverage biological restorations that restore 100% bite strength and natural appearance.",
    shortDescription: "Custom-fitted, metal-free ceramic crowns engineered to protect cracked, fractured, or deeply decayed teeth without dark metallic gum lines.",
    fullDescription: "When a tooth has undergone trauma, extensive decay, or large failing silver fillings, a custom crown acts as a protective shield. Dr. Kevin Sanders designs crowns with strict margin precision to preserve your gum health and ensure optimal chewing function. Patients routinely commend our gentle, painless crown appointments and seamless aesthetic integration.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Completely metal-free ceramic eliminating dark grey margins at the gumline",
      "Protects structurally compromised teeth from catastrophic fracture",
      "Restores full chewing power and bite stability",
      "Custom color-matched to your neighboring teeth for undetectable blending"
    ],
    procedureSteps: [
      { title: "1. Diagnostic Evaluation", desc: "Digital low-dose X-rays and intraoral photography to map the extent of damage." },
      { title: "2. Gentle Tooth Preparation", desc: "Careful removal of compromised structure while preserving maximum healthy tooth root." },
      { title: "3. Digital Capture & Provisional", desc: "Accurate impressions taken and a comfortable temporary crown placed immediately." },
      { title: "4. Permanent Cementation", desc: "Exact fit verification, occlusal balancing, and permanent bonding for lasting strength." }
    ],
    idealFor: [
      "Cracked, fractured, or broken teeth",
      "Teeth with large, deteriorating fillings",
      "Teeth restored with root canal therapy",
      "Severely worn down teeth requiring occlusal rehabilitation"
    ],
    techHighlight: "Whisper-quiet electric handpieces provide vibration-free comfort during crown preparation.",
    faqs: [
      { q: "How does a crown differ from a filling?", a: "A filling replaces a small portion of tooth structure within the tooth, whereas a crown encases the entire visible tooth above the gumline to prevent fracture." },
      { q: "Will my crown feel like a natural tooth?", a: "Yes! Dr. Sanders balances your bite so your crown feels completely natural when chewing, speaking, and smiling." }
    ]
  },
  {
    id: "teeth-whitening",
    name: "Professional Teeth Whitening",
    category: "cosmetic",
    tagline: "Safe, medical-grade brightening that eliminates years of stubborn coffee, tea, and age stains.",
    shortDescription: "In-office clinical brightening and custom take-home whitening trays formulated with desensitizing agents for maximum brightness with minimal sensitivity.",
    fullDescription: "Over-the-counter whitening strips often cause gum irritation and uneven streaks. At Sanders Family Dentistry, our professional whitening systems utilize calibrated peroxide concentrations combined with potassium nitrate desensitizers. Whether you choose our accelerated in-office procedure or custom-molded take-home trays, your results will be visibly brighter, uniform, and gentle on your enamel.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Lifts deep-set stains from coffee, tea, red wine, and natural aging",
      "Formulated with desensitizing agents to protect sensitive nerve endings",
      "Custom-fitted trays prevent gel from spilling onto delicate gum tissue",
      "Noticeably brighter smile up to 8 shades in a single clinical visit"
    ],
    procedureSteps: [
      { title: "1. Shade Baseline & Exam", desc: "We record your current VITA tooth shade and ensure gums and enamel are healthy." },
      { title: "2. Gingival Barrier Protection", desc: "Gums are carefully shielded with a protective resin isolation barrier." },
      { title: "3. Medical-Grade Whitening Application", desc: "Potent hydrogen peroxide gel is applied in monitored 15-minute cycles." },
      { title: "4. Fluoride Enamel Nourishment", desc: "Soothing remineralizing treatment applied to lock in brightness and prevent sensitivity." }
    ],
    idealFor: [
      "Yellowed or dull enamel from daily coffee, tea, or wine",
      "Pre-wedding, graduation, or professional photo preparation",
      "Revitalizing smiles prior to cosmetic restorative bonding"
    ],
    techHighlight: "Neutral pH clinical whitening formulas that safeguard enamel matrix integrity.",
    faqs: [
      { q: "Will whitening damage my enamel?", a: "Not at all. Professional whitening supervised by Dr. Sanders gently releases organic pigment molecules trapped within micro-pores without eroding enamel." },
      { q: "How long do professional whitening results last?", a: "Typically 1 to 3 years depending on dietary habits. Custom take-home trays allow easy, affordable touch-ups at home." }
    ]
  },
  {
    id: "dental-bridges",
    name: "Precision Dental Bridges",
    category: "restorative",
    tagline: "Seamlessly replace missing teeth to prevent dental shifting and restore chewing comfort.",
    shortDescription: "Fixed, natural-looking prosthetic restorations anchored securely to adjacent teeth or implants, filling the space left by one or more missing teeth.",
    fullDescription: "A missing tooth causes adjacent teeth to drift out of alignment, leading to bite collapse and jaw joint strain. A porcelain dental bridge provides a fixed, non-removable solution that seamlessly blends with your smile line. Dr. Sanders ensures the bridge contours match your gums for easy flossing and healthy longevity.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Permanent, fixed replacement that stays locked in place while eating",
      "Prevents remaining teeth from tipping or drifting into open spaces",
      "Restores clear phonetic speech and natural chewing mechanics",
      "Maintains natural facial contours and lip support"
    ],
    procedureSteps: [
      { title: "1. Anchor Tooth Preparation", desc: "The abutment teeth on either side of the space are gently contoured for supporting crowns." },
      { title: "2. Master Impression", desc: "High-precision digital capture of the gap and adjacent dental anatomy." },
      { title: "3. Temporary Bridge Placement", desc: "A functional temporary bridge is placed to protect teeth during fabrication." },
      { title: "4. Final Cementation", desc: "The custom porcelain bridge is bonded and checked for natural flossability." }
    ],
    idealFor: [
      "Replacing one or more missing consecutive teeth",
      "Patients who prefer a non-surgical alternative to dental implants",
      "Restoring stable chewing and preventing tooth migration"
    ],
    techHighlight: "Zirconia and high-translucency ceramic frameworks for maximum tensile strength.",
    faqs: [
      { q: "How do I clean under a dental bridge?", a: "We provide specialized bridge threaders and water flossers to make cleaning beneath the pontic quick and effortless." }
    ]
  },
  {
    id: "preventative-hygiene",
    name: "Comprehensive Exams & Ultrasonic Hygiene",
    category: "preventative",
    tagline: "Gentle, thorough prophylaxis that protects your smile and systemic wellness.",
    shortDescription: "Advanced ultrasonic cleanings, periodontal pocket evaluation, and comprehensive oral cancer screenings in a relaxed, caring atmosphere.",
    fullDescription: "Preventative care is the cornerstone of Sanders Family Dentistry. Our experienced dental hygienists are celebrated throughout Tallahassee for their gentle touch, thoroughness, and patient education. Every routine checkup includes an oral cancer screening, periodontal charting, and a conservative review by Dr. Sanders.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Removes hardened calculus and biofilm that daily toothbrushes cannot reach",
      "Gentle ultrasonic technology for pain-free tartar removal",
      "Early detection of gum disease (gingivitis) before bone loss occurs",
      "Full oral cancer screening included at every preventive visit"
    ],
    procedureSteps: [
      { title: "1. Diagnostic Low-Dose Imaging", desc: "Ultra-low radiation digital radiographs to inspect beneath the enamel and between teeth." },
      { title: "2. Gentle Ultrasonic Debridement", desc: "Warm-water ultrasonic scaling safely dissolves plaque without scraping or pinching." },
      { title: "3. Enamel Micro-Polish", desc: "Prophylaxis paste polish to remove surface coffee and tea stains." },
      { title: "4. Doctor Evaluation", desc: "Dr. Kevin Sanders reviews all findings with you and answers any questions without rush or sales pressure." }
    ],
    idealFor: [
      "All family members every 6 months for optimal oral health",
      "Patients seeking gentle hygienists who respect dental anxiety",
      "Individuals experiencing bleeding gums or chronic bad breath"
    ],
    techHighlight: "Piezoelectric ultrasonic scalers with warm water irrigation for maximum chairside comfort.",
    faqs: [
      { q: "How often should I have my teeth cleaned?", a: "Most adults and children benefit most from a cleaning every 6 months. Patients managing periodontal health may benefit from maintenance every 3 to 4 months." },
      { q: "I have sensitive teeth. Will the cleaning hurt?", a: "Our hygienists specialize in gentle care. We use warm ultrasonic water, topical numbing gels if desired, and tailor our technique to your comfort." }
    ]
  },
  {
    id: "digital-diagnostics",
    name: "Digital Low-Dose Radiography & Intraoral Cameras",
    category: "technology",
    tagline: "Crystal-clear diagnostic clarity with up to 90% less radiation than traditional film.",
    shortDescription: "Instant high-definition imaging that lets you see exactly what Dr. Sanders sees on high-resolution chairside monitors.",
    fullDescription: "Transparency is central to our philosophy. We believe you should never be told you need a procedure without clearly seeing the issue for yourself. Our digital intraoral cameras take magnified, high-resolution color photographs of each tooth, allowing Dr. Sanders to walk you through findings in plain, honest language.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Up to 90% reduction in radiation exposure compared to old film X-rays",
      "Instant on-screen display eliminates waiting for chemical film development",
      "Chairside monitor review empowers you to make informed decisions",
      "Eco-friendly process eliminating hazardous chemical developer disposal"
    ],
    procedureSteps: [
      { title: "1. Sensor Placement", desc: "Comfortable, rounded-edge digital sensors placed gently inside the mouth." },
      { title: "2. Instant Capture", desc: "Sub-second exposure produces immediate high-definition diagnostic images." },
      { title: "3. Guided Tour", desc: "Dr. Sanders explains your teeth, bone levels, and restorative margins side-by-side with you." }
    ],
    idealFor: [
      "Annual preventive checkups and new patient baseline assessments",
      "Patients who value visual transparency and conservative dental advice"
    ],
    techHighlight: "High-resolution CMOS sensors offering sub-millimeter diagnostic resolution.",
    faqs: [
      { q: "Are dental digital X-rays safe?", a: "Yes, exceptionally safe. Four digital bitewing X-rays expose you to roughly the same amount of background radiation as an ordinary 1-hour commercial airplane flight." }
    ]
  },
  {
    id: "cosmetic-bonding",
    name: "Aesthetic Composite Bonding",
    category: "cosmetic",
    tagline: "Single-visit conservative artistry to repair chips, gaps, and tooth irregularities.",
    shortDescription: "Sculpted tooth-colored composite resin blended directly onto enamel in one comfortable appointment with zero shots required in many cases.",
    fullDescription: "Composite bonding is one of the most conservative and cost-effective cosmetic dental treatments available. Using shade-layered restorative composite, Dr. Kevin Sanders expertly shapes and polishes the resin to repair chipped edges, close small spaces between front teeth, or smooth irregular contours.",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Completed in a single visit without dental lab delays",
      "Preserves nearly 100% of your natural enamel structure",
      "Often performed without any local anesthetic shots",
      "Budget-friendly cosmetic improvement with immediate transformation"
    ],
    procedureSteps: [
      { title: "1. Custom Shade Matching", desc: "Direct visual comparison under natural daylight spectrum to match your unique tooth hue." },
      { title: "2. Micro-Etch & Conditioning", desc: "Gentle preparation of the enamel surface to form microscopic mechanical lock." },
      { title: "3. Layered Sculpting", desc: "Dr. Sanders layers and sculpts the resin by hand to recreate natural anatomical ridges." },
      { title: "4. High-Gloss Polishing", desc: "Multi-step diamond polishing discs create a smooth, light-reflective finish." }
    ],
    idealFor: [
      "Small chips or fractured corners on front teeth",
      "Small gaps between teeth (diastema closure)",
      "Minor shape discrepancies or uneven tooth lengths"
    ],
    techHighlight: "Submicron nano-hybrid composites for glass-like polish retention and high fracture resistance.",
    faqs: [
      { q: "How long does cosmetic bonding last?", a: "With normal care and routine cleanings, composite bonding typically lasts 5 to 10 years before requiring minor repolishing or touch-ups." }
    ]
  },
  {
    id: "emergency-dentistry",
    name: "Urgent & Emergency Dental Care",
    category: "restorative",
    tagline: "Rapid pain relief and compassionate same-day care when the unexpected happens.",
    shortDescription: "Prompt evaluation and stabilization for severe toothaches, cracked teeth, lost crowns, or sports injuries in Tallahassee.",
    fullDescription: "A dental emergency can be frightening and painful. Sanders Family Dentistry reserves dedicated schedule blocks to accommodate urgent dental needs promptly. Whether you have an excruciating toothache, a broken crown, or dental trauma, Dr. Sanders and our team will relieve your discomfort and formulate a gentle, restorative solution.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
    keyBenefits: [
      "Dedicated priority slots for urgent toothache and trauma evaluations",
      "Immediate diagnostic X-rays to pinpoint the exact root of discomfort",
      "Effective pain management and infection containment",
      "Clear, honest treatment options without high-pressure tactics"
    ],
    procedureSteps: [
      { title: "1. Rapid Triage Call", desc: "Call (850) 878-7916 for immediate nurse/staff advice and priority booking." },
      { title: "2. Focused Diagnostic Exam", desc: "Digital imaging focused directly on the symptom area to isolate the nerve or fracture." },
      { title: "3. Discomfort Relief", desc: "Targeted soothing therapy, temporary restoration, or therapeutic prescription." },
      { title: "4. Permanent Restoration Plan", desc: "Clear explanation of long-term options to preserve your tooth permanently." }
    ],
    idealFor: [
      "Severe or throbbing toothaches keeping you awake at night",
      "Dislodged, loose, or fractured porcelain crowns or fillings",
      "Accidental dental impact, chipped front teeth, or mouth injury",
      "Swelling or abscess along the gumline"
    ],
    techHighlight: "Emergency digital diagnostic sensors and rapid-acting anesthetic protocols.",
    faqs: [
      { q: "What should I do if a tooth gets knocked out?", a: "Handle it only by the crown (not the root). Gently rinse with water if dirty, try placing it back in the socket, or store it in cold milk, and call our office immediately at (850) 878-7916." }
    ]
  }
];

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    quote: "Dr. Sanders and his staff are truly top-notch. I have been coming here for years and have never felt pressured into unnecessary procedures. He is straightforward, personable, and extremely knowledgeable. My crowns fit perfectly with zero pain afterward.",
    author: "Robert M.",
    location: "Tallahassee, FL",
    procedureTag: "Custom Porcelain Crown",
    verifiedSource: "Patient Review - Verified Source",
    rating: 5
  },
  {
    id: "rev-2",
    quote: "The hygienists here are the absolute gentlest in town! I used to have severe dental anxiety, but the entire team makes you feel like family the moment you step through the door. The Care Drive office is immaculately clean and peaceful.",
    author: "Sarah L.",
    location: "Tallahassee, FL",
    procedureTag: "Gentle Preventive Hygiene",
    verifiedSource: "Patient Review - Verified Source",
    rating: 5
  },
  {
    id: "rev-3",
    quote: "Honest dental care is hard to find, but Dr. Kevin Sanders is the real deal. He took the time to show me my digital x-rays on screen and explained everything clearly. Professional, compassionate, and on time. Highly recommend to anyone in North Florida.",
    author: "David K.",
    location: "Midtown Tallahassee",
    procedureTag: "Comprehensive Exam & Digital X-Ray",
    verifiedSource: "Patient Review - Verified Source",
    rating: 5
  },
  {
    id: "rev-4",
    quote: "I chipped my front tooth right before my daughter's wedding and was in panic mode. Dr. Sanders got me in immediately, did beautiful cosmetic work, and matched the color identically. You cannot tell it was ever chipped. Outstanding work!",
    author: "Patricia H.",
    location: "Tallahassee, FL",
    procedureTag: "Cosmetic Restoration & Bonding",
    verifiedSource: "Patient Review - Verified Source",
    rating: 5
  },
  {
    id: "rev-5",
    quote: "I love the 7:00 AM Thursday appointment slots! As a working professional, being able to get my routine cleaning done before heading to the office is incredible. Front desk staff are friendly, billing is transparent, and insurance claims are filed flawlessly.",
    author: "Mark C.",
    location: "Tallahassee, FL",
    procedureTag: "Early Bird Preventive Visit",
    verifiedSource: "Patient Review - Verified Source",
    rating: 5
  }
];

export const PRACTICE_FAQS = [
  {
    q: "Do you accept my dental insurance?",
    a: "Sanders Family Dentistry works with most traditional indemnity and PPO dental insurance plans. While we do not participate in restrictive HMO networks, our administrative team happily prepares and submits all insurance claims directly on your behalf to help you maximize your available benefits."
  },
  {
    q: "Where is Sanders Family Dentistry located in Tallahassee?",
    a: "Our practice is conveniently located at 2600 Care Drive, Tallahassee, FL 32308. We offer abundant, complimentary parking right outside our ground-floor front entrance with easy handicap accessibility."
  },
  {
    q: "What payment and financing options are available?",
    a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), personal checks, and cash. We also partner with CareCredit to offer flexible financing with zero percent interest promotional periods for qualifying restorative and cosmetic treatments."
  },
  {
    q: "How does Dr. Sanders approach treatment recommendations?",
    a: "Dr. Kevin Sanders is known throughout the Tallahassee medical community for his conservative, honest treatment philosophy. We never recommend aggressive or unnecessary procedures. We use digital photography and intraoral cameras so you can clearly see what we see and make fully informed decisions."
  },
  {
    q: "What should I do if I have a dental emergency in Tallahassee?",
    a: "Call our office immediately at (850) 878-7916. We reserve time in our daily schedule specifically to handle urgent patient emergencies, sudden toothaches, fractured restorations, or dental accidents."
  },
  {
    q: "What are your office hours?",
    a: "We are open Monday through Wednesday from 8:00 AM to 5:00 PM, and Thursday from 7:00 AM to 3:30 PM (ideal for early morning appointments before work or school). We are closed Friday through Sunday."
  },
  {
    q: "What is your appointment cancellation policy?",
    a: "Because we reserve dedicated one-on-one doctor and hygienist time exclusively for you, we kindly request at least 24 hours advance notice if you need to reschedule or cancel your visit."
  },
  {
    q: "What sterilization and infection control protocols do you follow?",
    a: "Your safety and health are paramount. Sanders Family Dentistry strictly adheres to and surpasses all Centers for Disease Control (CDC) and Occupational Safety and Health Administration (OSHA) infection-control and medical autoclave sterilization standards."
  }
];
