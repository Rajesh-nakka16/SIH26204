const Trip = require('../models/Trip');

// In-memory store fallback when MongoDB is not configured or offline
const memoryStore = [];

const DEFAULT_PLAN = {
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
      image: "https://static.prod-images.emergentagent.com/jobs/5cc885fb-1767-4d26-b52d-1f49103ebf49/images/d2df60d6b337097356fcc87f64e54213a5236d943579d232be31dd00eebe7a35.jpeg"
    },
    {
      name: "Araku Eco Lodge",
      tag: "Low impact",
      type: "Eco lodge",
      distance: "4.5 km",
      nightly: 3600,
      rating: "4.8",
      image: "https://static.prod-images.emergentagent.com/jobs/5cc885fb-1767-4d26-b52d-1f49103ebf49/images/d2df60d6b337097356fcc87f64e54213a5236d943579d232be31dd00eebe7a35.jpeg"
    },
    {
      name: "Valley Guest House",
      tag: "Budget pick",
      type: "Local guest house",
      distance: "3.0 km",
      nightly: 1900,
      rating: "4.4",
      image: "https://static.prod-images.emergentagent.com/jobs/5cc885fb-1767-4d26-b52d-1f49103ebf49/images/d2df60d6b337097356fcc87f64e54213a5236d943579d232be31dd00eebe7a35.jpeg"
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

exports.planTrip = async (req, res) => {
  try {
    const {
      start = "Hyderabad",
      destination = "Araku Valley",
      travellers = 4,
      days = 4,
      budget = 30000,
      preferences = "Nature + Local Food + Relaxation",
    } = req.body || {};

    const numBudget = Number(budget) || 30000;
    const numDays = Number(days) || 4;
    const numTravellers = Number(travellers) || 4;

    const transportCost = Math.round(numBudget * 0.27);
    const stayCost = Math.round(numBudget * 0.25);
    const foodCost = Math.round(numBudget * 0.17);
    const activitiesCost = Math.round(numBudget * 0.13);
    const localCost = Math.round(numBudget * 0.08);
    const emergencyCost = Math.max(1500, numBudget - (transportCost + stayCost + foodCost + activitiesCost + localCost));
    const spent = Math.round(numBudget * 0.615);

    const itinerary = [];
    for (let i = 1; i <= numDays; i++) {
      const dayStr = String(i).padStart(2, '0');
      let title = `${start} → ${destination}`;
      let est = `₹${Math.round(numBudget / numDays)}`;
      let items = [
        ["08:00", "Train journey"],
        ["16:30", "Homestay check-in"],
        ["18:00", "Local coffee experience"],
        ["19:30", "Tribal food market"]
      ];

      if (i === 2) {
        title = "Caves, waterfalls & forest air";
        items = [
          ["08:00", "Borra Caves · crowd watch"],
          ["11:30", "Katiki Waterfalls alternative"],
          ["16:00", "Forest trail"],
          ["19:00", "Bamboo chicken dinner"]
        ];
      } else if (i === 3) {
        title = "The places others miss";
        items = [
          ["07:00", "Galikonda Viewpoint"],
          ["10:30", "Sunkarimetta village"],
          ["15:00", "Hidden valley picnic"],
          ["18:30", "Handicraft market"]
        ];
      } else if (i === numDays) {
        title = "Slow morning, easy return";
        items = [
          ["08:00", "Araku coffee tasting"],
          ["10:00", "Local shopping"],
          ["12:30", "Return journey"]
        ];
      }

      itinerary.push({
        day: dayStr,
        title,
        cost: est,
        items
      });
    }

    const generated = {
      ...DEFAULT_PLAN,
      start,
      destination,
      travellers: numTravellers,
      days: numDays,
      budget: numBudget,
      total: numBudget,
      remaining: 0,
      spent,
      preferences,
      budget_breakdown: [
        { label: "Transport", amount: transportCost, color: "cyan" },
        { label: "Stay", amount: stayCost, color: "green" },
        { label: "Food", amount: foodCost, color: "orange" },
        { label: "Activities", amount: activitiesCost, color: "blue" },
        { label: "Local experiences", amount: localCost, color: "lime" },
        { label: "Emergency buffer", amount: emergencyCost, color: "slate" }
      ],
      itinerary
    };

    return res.status(200).json(generated);
  } catch (error) {
    console.error("planTrip error:", error);
    return res.status(500).json({ error: "Failed to generate trip plan", fallback: DEFAULT_PLAN });
  }
};

exports.saveTrip = async (req, res) => {
  try {
    const { plan } = req.body || {};
    if (!plan) {
      return res.status(400).json({ error: "Plan data is required" });
    }

    // Try MongoDB if connected
    if (Trip && Trip.db && Trip.db.readyState === 1) {
      const savedDoc = await Trip.create(plan);
      return res.status(201).json({ success: true, id: savedDoc._id });
    }

    // Fallback in-memory
    const memoryId = `mem_${Date.now()}`;
    memoryStore.unshift({ id: memoryId, ...plan });
    return res.status(200).json({ success: true, id: memoryId, inMemory: true });
  } catch (error) {
    console.error("saveTrip error:", error);
    return res.status(200).json({ success: true, id: `local_${Date.now()}`, inMemory: true });
  }
};

exports.getTrips = async (req, res) => {
  try {
    if (Trip && Trip.db && Trip.db.readyState === 1) {
      const trips = await Trip.find().sort({ createdAt: -1 }).limit(20);
      return res.status(200).json(trips);
    }
    return res.status(200).json(memoryStore.length ? memoryStore : [DEFAULT_PLAN]);
  } catch (error) {
    return res.status(200).json([DEFAULT_PLAN]);
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    if (Trip && Trip.db && Trip.db.readyState === 1) {
      const trip = await Trip.findById(id);
      if (trip) return res.status(200).json(trip);
    }
    const found = memoryStore.find((t) => t.id === id);
    return res.status(200).json(found || DEFAULT_PLAN);
  } catch (error) {
    return res.status(200).json(DEFAULT_PLAN);
  }
};

exports.getDestinations = (req, res) => {
  const destinations = [
    {
      id: "araku-valley",
      name: "Araku Valley",
      state: "Andhra Pradesh",
      tag: "Cool Valley & Tribal Culture",
      rating: 4.8,
      crowd: "Low",
      bestTime: "Oct – Mar",
    },
    {
      id: "munnar",
      name: "Munnar",
      state: "Kerala",
      tag: "Tea Estates & Misty Peaks",
      rating: 4.9,
      crowd: "Moderate",
      bestTime: "Sep – May",
    },
    {
      id: "coorg",
      name: "Coorg",
      state: "Karnataka",
      tag: "Coffee Groves & Spice Trails",
      rating: 4.7,
      crowd: "Moderate",
      bestTime: "Oct – Apr",
    },
    {
      id: "spiti-valley",
      name: "Spiti Valley",
      state: "Himachal Pradesh",
      tag: "High Altitude Wilderness",
      rating: 4.9,
      crowd: "Very Low",
      bestTime: "May – Oct",
    }
  ];

  return res.status(200).json(destinations);
};
