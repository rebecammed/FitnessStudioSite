// ============================================
// CONTENT DATA
// All site content lives here as arrays of objects.
// Components import what they need and map over it.
// ============================================

// --- Navigation links ---
export const navLinks = [
  { id: 1, label: "Classes", href: "#schedule" },
  { id: 2, label: "Trainers", href: "#trainers" },
  { id: 3, label: "Prices", href: "#pricing" },
  { id: 4, label: "Contact", href: "#contact" },
  { id: 5, label: "About", href: "#about" },
];

// --- Days of the week ---
export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// --- Class schedule ---
export const classes = [
  // Mon
  {
    id: 1,
    time: "07:00",
    name: "HIIT",
    trainer: "Marta R.",
    level: "Intermediate",
    day: "Mon",
  },
  {
    id: 2,
    time: "09:00",
    name: "Yoga",
    trainer: "Nerea P.",
    level: "All levels",
    day: "Mon",
  },
  {
    id: 3,
    time: "18:00",
    name: "Strength",
    trainer: "Diego L.",
    level: "Advanced",
    day: "Mon",
  },
  // Tue
  {
    id: 4,
    time: "07:00",
    name: "Cycling",
    trainer: "Iván S.",
    level: "All levels",
    day: "Tue",
  },
  {
    id: 5,
    time: "12:00",
    name: "Yoga",
    trainer: "Nerea P.",
    level: "All levels",
    day: "Tue",
  },
  // Wed
  {
    id: 6,
    time: "08:00",
    name: "HIIT",
    trainer: "Marta R.",
    level: "Advanced",
    day: "Wed",
  },
  {
    id: 7,
    time: "19:00",
    name: "Strength",
    trainer: "Diego L.",
    level: "Intermediate",
    day: "Wed",
  },
  // Thu
  {
    id: 8,
    time: "07:00",
    name: "Cycling",
    trainer: "Iván S.",
    level: "Advanced",
    day: "Thu",
  },
  {
    id: 9,
    time: "17:00",
    name: "Yoga",
    trainer: "Nerea P.",
    level: "All levels",
    day: "Thu",
  },
  // Fri
  {
    id: 10,
    time: "09:00",
    name: "HIIT",
    trainer: "Marta R.",
    level: "All levels",
    day: "Fri",
  },
  {
    id: 11,
    time: "18:00",
    name: "Cycling",
    trainer: "Iván S.",
    level: "Intermediate",
    day: "Fri",
  },
  // Sat
  {
    id: 12,
    time: "10:00",
    name: "Yoga",
    trainer: "Nerea P.",
    level: "All levels",
    day: "Sat",
  },
  {
    id: 13,
    time: "12:00",
    name: "Strength",
    trainer: "Diego L.",
    level: "All levels",
    day: "Sat",
  },
];

// --- Trainers ---
export const trainers = [
  {
    id: 1,
    name: "Marta R.",
    specialty: "HIIT",
    bio: "High-intensity and mobility specialist.",
  },
  {
    id: 2,
    name: "Diego L.",
    specialty: "Strength",
    bio: "Functional strength and lifting technique.",
  },
  {
    id: 3,
    name: "Nerea P.",
    specialty: "Yoga",
    bio: "Dynamic yoga and conscious breathing.",
  },
  {
    id: 4,
    name: "Iván S.",
    specialty: "Cycling",
    bio: "Rhythm, endurance and a great playlist.",
  },
];

// --- Membership tiers ---
export const memberships = [
  {
    id: 1,
    name: "Basic",
    price: 29,
    features: ["Group classes in off-peak hours", "App access"],
    featured: false,
  },
  {
    id: 2,
    name: "Pro",
    price: 49,
    features: [
      "Full access to all classes",
      "1 personal session per month",
      "App access",
    ],
    featured: true,
    badge: "Most popular",
  },
  {
    id: 3,
    name: "Premium",
    price: 79,
    features: ["Everything in Pro", "Assigned trainer", "Nutrition plan"],
    featured: false,
  },
];

// --- About section values ---
export const values = [
  {
    id: 1,
    title: "Personalised training",
    text: "Small groups and real follow-up.",
  },
  {
    id: 2,
    title: "Real community",
    text: "People who know each other and push each other.",
  },
  {
    id: 3,
    title: "Flexible schedule",
    text: "Classes from 6:00 to 22:00, every day.",
  },
];

// --- Footer information ---
export const footerInfo = {
  studio: {
    name: "PULSO Studio",
    address: "123 Example Street, Madrid",
  },
  hours: ["Mon–Fri: 6:00–22:00", "Sat–Sun: 8:00–20:00"],
  social: [
    { id: 1, label: "Instagram", href: "#" },
    { id: 2, label: "TikTok", href: "#" },
  ],
};
