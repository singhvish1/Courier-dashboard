// Mock UPS-style tracking data model
// Each package has a tracking number and a series of chronological events representing its journey.

export const trackingPackages = [
  {
    trackingNumber: '1Z3F56A90344567890',
    courierId: 'C001',
    serviceLevel: 'Express Saver',
    weightLbs: 12.4,
    origin: { city: 'Seattle', state: 'WA' },
    destination: { city: 'Anchorage', state: 'AK' },
    status: 'Out For Delivery',
    estimatedDelivery: '2025-11-30T18:00:00Z',
    events: [
      { ts: '2025-11-28T04:12:00Z', code: 'ORIGIN_SCAN', location: 'Seattle, WA', description: 'Origin scan' },
      { ts: '2025-11-28T08:47:00Z', code: 'DEPART_FACILITY', location: 'Seattle, WA', description: 'Departed facility' },
      { ts: '2025-11-29T02:55:00Z', code: 'ARRIVE_HUB', location: 'Portland, OR', description: 'Arrived at regional hub' },
      { ts: '2025-11-29T11:10:00Z', code: 'DEPART_HUB', location: 'Portland, OR', description: 'Departed hub' },
      { ts: '2025-11-30T12:05:00Z', code: 'OUT_FOR_DELIVERY', location: 'Anchorage, AK', description: 'Out for delivery' }
    ]
  },
  {
    trackingNumber: '1Z9T77B22099887766',
    courierId: 'C002',
    serviceLevel: 'Ground',
    weightLbs: 5.1,
    origin: { city: 'Denver', state: 'CO' },
    destination: { city: 'Honolulu', state: 'HI' },
    status: 'In Transit',
    estimatedDelivery: '2025-12-02T22:00:00Z',
    events: [
      { ts: '2025-11-27T15:22:00Z', code: 'ORIGIN_SCAN', location: 'Denver, CO', description: 'Origin scan' },
      { ts: '2025-11-27T19:30:00Z', code: 'DEPART_FACILITY', location: 'Denver, CO', description: 'Departed facility' },
      { ts: '2025-11-28T09:04:00Z', code: 'ARRIVE_HUB', location: 'Los Angeles, CA', description: 'Arrived at hub' },
      { ts: '2025-11-28T13:48:00Z', code: 'DELAY_WEATHER', location: 'Los Angeles, CA', description: 'Delay due to weather' },
      { ts: '2025-11-29T05:55:00Z', code: 'DEPART_HUB', location: 'Los Angeles, CA', description: 'Departed hub' },
      { ts: '2025-11-30T03:20:00Z', code: 'ARRIVE_HUB', location: 'Honolulu, HI', description: 'Arrived at destination hub' }
    ]
  },
  {
    trackingNumber: '1Z5K11C55433221100',
    courierId: 'C003',
    serviceLevel: 'Next Day Air',
    weightLbs: 2.9,
    origin: { city: 'New York', state: 'NY' },
    destination: { city: 'Cebu', state: 'PH' },
    status: 'Delivered',
    estimatedDelivery: '2025-11-29T16:00:00Z',
    deliveryTs: '2025-11-29T15:41:00Z',
    events: [
      { ts: '2025-11-28T06:01:00Z', code: 'ORIGIN_SCAN', location: 'New York, NY', description: 'Origin scan' },
      { ts: '2025-11-28T10:15:00Z', code: 'DEPART_FACILITY', location: 'New York, NY', description: 'Departed facility' },
      { ts: '2025-11-29T02:02:00Z', code: 'ARRIVE_DESTINATION', location: 'Cebu, PH', description: 'Arrived at destination' },
      { ts: '2025-11-29T08:31:00Z', code: 'OUT_FOR_DELIVERY', location: 'Cebu, PH', description: 'Out for delivery' },
      { ts: '2025-11-29T15:41:00Z', code: 'DELIVERED', location: 'Cebu, PH', description: 'Delivered - Left at reception' }
    ]
  }
];

// Derive flattened recent events (last event per package or last N events overall)
export const recentTrackingEvents = trackingPackages
  .map(p => p.events[p.events.length - 1])
  .sort((a, b) => new Date(b.ts) - new Date(a.ts));

export const trackingStatusCounts = () => {
  const counts = { inTransit: 0, outForDelivery: 0, delivered: 0, exception: 0 };
  for (const pkg of trackingPackages) {
    switch (pkg.status) {
      case 'In Transit': counts.inTransit++; break;
      case 'Out For Delivery': counts.outForDelivery++; break;
      case 'Delivered': counts.delivered++; break;
      default:
        if (pkg.status.includes('Delay') || pkg.status.includes('Exception')) counts.exception++; break;
    }
  }
  return counts;
};
