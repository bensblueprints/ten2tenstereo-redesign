export const site = {
  name: "Ten 2 Ten Stereo",
  short: "Ten 2 Ten",
  tagline: "Car audio. Done right. Since day one.",
  metaTagline: "Quality Car Stereo & Installation Services",
  phone: "(626) 858-2777",
  phoneLink: "tel:6268582777",
  email: "petermichelboshra@icloud.com",
  address: "Azusa, CA 91702",
  mapQuery: "Ten 2 Ten Stereo, Azusa, CA",
  region: "San Gabriel Valley · Azusa, CA",
  hours: [
    { days: "Mon — Sat", time: "9AM — 7PM" },
    { days: "Sunday", time: "10AM — 6PM" },
  ],
  yearsInBusiness: 15,
  mission:
    "We are passionate about cars, which is why every vehicle we customize or restore is treated like one of our own.",
  about:
    "We are passionate about cars — which is why every vehicle we customize or restore is treated like one of our own. Whether you want to bring a classic back to showroom quality or add custom details to personalize your ride, our team of skilled experts has you covered and will surpass your expectations.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  name: string;
  code: string;
  short: string;
  description: string;
  image: string;
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "car-stereo-installation",
    name: "Car Stereo Installation",
    code: "SVC 01",
    short:
      "Precision head-unit, speaker, sub, and amp installs with factory-finish fit.",
    description:
      "From premium head units to full audio systems, our techs are careful and precise. We take the dash apart with care and put everything back so it looks factory-fresh — Apple CarPlay, Android Auto, backup cameras, and clean wire management included.",
    image: "/images/stereo-install.jpg",
    benefits: [
      "Factory-finish dash fit — no gaps, no rattles",
      "Head units, speakers, subs, amps, DSPs",
      "Apple CarPlay & Android Auto setup",
      "Hidden wire runs & clean cable management",
      "USB & aux ports integrated into original trim",
    ],
  },
  {
    slug: "vehicle-wraps",
    name: "Vehicle Wraps",
    code: "SVC 02",
    short:
      "Full color changes, commercial branding, and paint-protection wraps in matte, gloss, or satin.",
    description:
      "Change the color, protect the paint, or launch a commercial fleet. We apply precision-cut vinyl from the pros — long-lasting, UV-resistant, and removable without damaging the factory finish.",
    image: "/images/vehicle-wrap.jpg",
    benefits: [
      "Full and partial wraps",
      "Matte, gloss, satin, and chrome finishes",
      "Commercial fleet branding",
      "Paint-protection film (PPF) options",
      "Removable without paint damage",
    ],
  },
  {
    slug: "tire-installation",
    name: "Tire Installation",
    code: "SVC 03",
    short:
      "Mount, balance, and road-test every wheel — rolling out feels brand new.",
    description:
      "Our skilled staff gets your vehicle rolling in no time. Mount, balance, alignment, and a road test — it's not done until it drives straight. We stock all major brands and custom wheel packages.",
    image: "/images/tire-install.jpg",
    benefits: [
      "Mount, balance & road-test included",
      "All major tire brands in stock",
      "Custom wheel & tire packages",
      "Fast turnaround on walk-ins",
      "Honest, competitive pricing",
    ],
  },
  {
    slug: "car-security-systems",
    name: "Car Security Systems",
    code: "SVC 04",
    short:
      "Smart alarms, remote start, GPS tracking — real peace of mind for a fair price.",
    description:
      "Don't delay the security your vehicle deserves. Modern alarm and security systems with smartphone integration, remote start, GPS tracking, and shock sensors — installed by people who actually know your car's wiring.",
    image: "/images/car-security.jpg",
    benefits: [
      "Smartphone-connected alarm systems",
      "Remote start compatibility",
      "GPS tracking options",
      "Shock, tilt & glass-break sensors",
      "Half the price of the next shop over",
    ],
  },
  {
    slug: "led-headlights",
    name: "LED Headlights",
    code: "SVC 05",
    short:
      "Brighter, whiter, safer nighttime driving — OEM-fit LED upgrades.",
    description:
      "Upgrade the way you see the road. Our LED headlight installations are clean, professional, and fit your exact vehicle — brighter output without the scatter that blinds oncoming drivers.",
    image: "/images/power-button.jpg",
    benefits: [
      "Brighter, whiter nighttime visibility",
      "Direct OEM-fit replacement",
      "Proper beam pattern alignment",
      "Long-life LED bulbs",
      "Works on nearly every make & model",
    ],
  },
  {
    slug: "window-tinting",
    name: "Window Tinting",
    code: "SVC 06",
    short:
      "Heat rejection, UV protection, and privacy — legal California tint levels, bubble-free.",
    description:
      "Protect your interior, your privacy, and your skin. Our advanced tint service keeps your cabin cooler and your ride looking sharp — ceramic, carbon, and standard films available, all with a lifetime warranty.",
    image: "/images/window-tint.jpg",
    benefits: [
      "Ceramic, carbon & standard films",
      "Legal California tint percentages",
      "Heat & UV rejection",
      "Bubble-free install — lifetime warranty",
      "Protects interior upholstery",
    ],
  },
];

export const valueProps = [
  {
    title: "Professional",
    body: "Top-rated. 15+ years of installs. Every bolt tightened, every wire tucked, every dash put back like it came from the factory.",
  },
  {
    title: "Fair Pricing",
    body: "Family-friendly pricing — we tell you straight up what the job costs and why. No upsell games, no surprise fees.",
  },
  {
    title: "On-Time",
    body: "We respect your day. Appointments start on time, walk-ins get real quotes, and your vehicle gets finished when we said it would.",
  },
];

export const stats = [
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 15, suffix: "+", label: "Years In Azusa" },
  { value: 1000, suffix: "+", label: "Installs Delivered" },
];

export type Testimonial = {
  name: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Carlos Hernandez",
    rating: 5,
    quote:
      "Awesome service, clean install, fair pricing. Very professional. Had my system for about 2 months with zero issues. Sounds clean. Highly recommend — just make an appointment, the place gets busy.",
  },
  {
    name: "Floyd Stalinski III",
    rating: 5,
    quote:
      "Super cool guys. Huge selection of speakers, subs, amps, and wheels. Hooked it up with a new powered sub for my brand-new car. Chris messaged me the info I needed and I was on my way there.",
  },
  {
    name: "Jay G.",
    rating: 5,
    quote:
      "Chris was super helpful the second I got to the shop. I had a million questions — David was attentive and cared about satisfaction. Drove 43 miles from Hermosa Beach. Worth every mile. Loved the stereo on my Rubicon.",
  },
  {
    name: "Jose Ramos",
    rating: 5,
    quote:
      "Told them everything I wanted and they delivered plus more. Changed all my speakers, installed an amp, two 12s, a head unit with Apple CarPlay, and a backup camera. Even threw in LEDs. Highly recommended.",
  },
  {
    name: "Fondulio",
    rating: 5,
    quote:
      "Just got a Civic and had to get an alarm. Called at least 8 places — all charging double what Ten 2 Ten quoted. Saved enough to add a better stereo. They even advised me not to overspend. That's real help.",
  },
  {
    name: "King Loma",
    rating: 5,
    quote:
      "Came in randomly from Los Angeles and got a great deal on a 3000-watt Class D amp. Great business, great customer service. If you're in the SGV — stop here.",
  },
  {
    name: "Jesse Silva",
    rating: 5,
    quote:
      "Best prices on the block. Got my system on payments — easy, didn't even have to run my credit. Ask for Pete, he'll take care of you.",
  },
  {
    name: "Daniel Mercado",
    rating: 5,
    quote:
      "Mike worked with my budget to pick the best head unit for my vehicle. Joe — the stereo tech — did an amazing job. Everything looks super sleek and fits clean. Best price in Covina/Azusa for sure.",
  },
  {
    name: "Cayden Parker",
    rating: 5,
    quote:
      "Best customer service I've gotten by far from any shop. 100% recommend — affordable prices, quick service. Love the placement of the Kicker and how well hidden the wires are.",
  },
];
