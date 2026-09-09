const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    destination: { type: String, required: true },
    travellers: { type: Number, required: true },
    days: { type: Number, required: true },
    budget: { type: Number, required: true },
    total: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    preferences: { type: String, default: 'Nature + Local Food + Relaxation' },
    budget_breakdown: [
      {
        label: String,
        amount: Number,
        color: String,
      },
    ],
    transport_options: [
      {
        name: String,
        recommended: Boolean,
        cost: Number,
        time: String,
        comfort: String,
      },
    ],
    stay_options: [
      {
        name: String,
        tag: String,
        type: String,
        distance: String,
        nightly: Number,
        rating: String,
        image: String,
      },
    ],
    food_spots: [
      {
        name: String,
        kind: String,
        detail: String,
        cost: Number,
        distance: String,
        time: String,
      },
    ],
    hidden_gems: [
      {
        name: String,
        crowd: String,
        category: String,
        detail: String,
        best_time: String,
      },
    ],
    crowd: {
      name: String,
      crowd_percent: String,
      status: String,
      description: String,
      alternatives: [
        {
          name: String,
          level: String,
          distance: String,
          saving: String,
        },
      ],
    },
    itinerary: [
      {
        day: String,
        title: String,
        cost: String,
        items: [[String]],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Trip || mongoose.model('Trip', TripSchema);
