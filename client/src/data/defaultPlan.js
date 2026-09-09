export const MOUNTAIN_IMAGE = "https://static.prod-images.emergentagent.com/jobs/5cc885fb-1767-4d26-b52d-1f49103ebf49/images/d2df60d6b337097356fcc87f64e54213a5236d943579d232be31dd00eebe7a35.jpeg";

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

export const DEFAULT_PLAN = {
  start: "Hyderabad",
  destination: "Araku Valley",
  travellers: 4,
  days: 4,
  budget: 30000,
  total: 30000,
  remaining: 0,
  spent: 18450,
  preferences: "Nature + Local Food + Relaxation",
  budget_breakdown: [
    { label: "Transport", amount: 8000, color: "cyan" },
    { label: "Stay", amount: 7500, color: "green" },
    { label: "Food", amount: 5000, color: "orange" },
    { label: "Activities", amount: 4000, color: "blue" },
    { label: "Local experiences", amount: 2500, color: "lime" },
    { label: "Emergency buffer", amount: 3000, color: "slate" }
  ],
  transport_options: [
    { name: "Train", recommended: true, cost: 2400, time: "8h 20m", comfort: "High" },
    { name: "Bus", recommended: false, cost: 1600, time: "10h", comfort: "Medium" },
    { name: "Car", recommended: false, cost: 5500, time: "6h", comfort: "High" },
    { name: "Flight", recommended: false, cost: 7800, time: "1h 20m", comfort: "High" }
  ],
  stay_options: [
    {
      name: "Mountain View Homestay",
      tag: "Best value",
      type: "Local family hosted",
      distance: "2.1 km",
      nightly: 2500,
      rating: "4.8",
      image: MOUNTAIN_IMAGE
    },
    {
      name: "Araku Eco Lodge",
      tag: "Low impact",
      type: "Eco lodge",
      distance: "4.5 km",
      nightly: 3600,
      rating: "4.8",
      image: MOUNTAIN_IMAGE
    },
    {
      name: "Valley Guest House",
      tag: "Budget pick",
      type: "Local guest house",
      distance: "3.0 km",
      nightly: 1900,
      rating: "4.4",
      image: MOUNTAIN_IMAGE
    }
  ],
  food_spots: [
    {
      name: "Famous Bamboo Chicken Spot",
      kind: "Local famous food",
      detail: "Bamboo chicken · Ragi dishes",
      cost: 250,
      distance: "1.4 km",
      time: "12:00–21:00"
    },
    {
      name: "Araku Coffee Trail",
      kind: "Local experience",
      detail: "Estate roast · Tasting",
      cost: 180,
      distance: "2.8 km",
      time: "08:00–18:00"
    },
    {
      name: "Tribal Food Market",
      kind: "Traditional market",
      detail: "Millet breakfast · Local coffee",
      cost: 320,
      distance: "900 m",
      time: "07:00–14:00"
    }
  ],
  hidden_gems: [
    {
      name: "Katiki Waterfalls",
      crowd: "28%",
      category: "Hidden waterfall",
      detail: "₹120",
      best_time: "Early morning"
    },
    {
      name: "Galikonda Viewpoint",
      crowd: "18%",
      category: "Secret viewpoint",
      detail: "Free",
      best_time: "Golden hour"
    },
    {
      name: "Sunkarimetta Village",
      crowd: "12%",
      category: "Local culture",
      detail: "₹350",
      best_time: "Afternoon"
    }
  ],
  crowd: {
    name: "Borra Caves",
    crowd_percent: "92%",
    status: "OVERCROWDED",
    description: "Borra Caves is at peak capacity. Instead of waiting in the crowd, discover something new nearby.",
    alternatives: [
      { name: "Chaparai Waterfalls", level: "34%", distance: "18 km · 35 min", saving: "—₹350" },
      { name: "Katiki Waterfalls", level: "28%", distance: "10 km · 24 min", saving: "—₹420" },
      { name: "Hidden Viewpoint", level: "18%", distance: "6 km · 16 min", saving: "—₹600" }
    ]
  },
  itinerary: [
    {
      day: "01",
      title: "Hyderabad → Araku Valley",
      cost: "₹4,200",
      items: [
        ["08:00", "Train journey"],
        ["16:30", "Homestay check-in"],
        ["18:00", "Local coffee experience"],
        ["19:30", "Tribal food market"]
      ]
    },
    {
      day: "02",
      title: "Caves, waterfalls & forest air",
      cost: "₹3,850",
      items: [
        ["08:00", "Borra Caves · crowd watch"],
        ["11:30", "Katiki Waterfalls alternative"],
        ["16:00", "Forest trail"],
        ["19:00", "Bamboo chicken dinner"]
      ]
    },
    {
      day: "03",
      title: "The places others miss",
      cost: "₹2,700",
      items: [
        ["07:00", "Galikonda Viewpoint"],
        ["10:30", "Sunkarimetta village"],
        ["15:00", "Hidden valley picnic"],
        ["18:30", "Handicraft market"]
      ]
    },
    {
      day: "04",
      title: "Slow morning, easy return",
      cost: "₹3,950",
      items: [
        ["08:00", "Araku coffee tasting"],
        ["10:00", "Local shopping"],
        ["12:30", "Return journey"]
      ]
    }
  ]
};

export const POPULAR_DESTINATIONS = [
  {
    id: "araku-valley",
    name: "Araku Valley",
    state: "Andhra Pradesh",
    tag: "Cool Valley & Tribal Culture",
    rating: 4.8,
    crowd: "Low",
    bestTime: "Oct – Mar",
    image: MOUNTAIN_IMAGE,
    description: "Nestled in the Eastern Ghats, famous for scenic coffee plantations, limestone caves, and serene waterfalls."
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    tag: "Tea Estates & Misty Peaks",
    rating: 4.9,
    crowd: "Moderate",
    bestTime: "Sep – May",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    description: "Rolling hills blanketed with emerald tea plantations, rare flora, and misty mountain viewpoints."
  },
  {
    id: "coorg",
    name: "Coorg (Kodagu)",
    state: "Karnataka",
    tag: "Coffee Groves & Spice Trails",
    rating: 4.7,
    crowd: "Moderate",
    bestTime: "Oct – Apr",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    description: "Known as the Scotland of India, famed for aromatic spices, lush coffee estates, and gentle cascades."
  },
  {
    id: "spiti-valley",
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    tag: "High Altitude Wilderness",
    rating: 4.9,
    crowd: "Very Low",
    bestTime: "May – Oct",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    description: "Cold desert mountain valley offering ancient monasteries, turquoise rivers, and star-filled night skies."
  }
];

export const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
