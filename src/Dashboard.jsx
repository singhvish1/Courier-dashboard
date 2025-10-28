import React, { useMemo, useState } from 'react';
import { MapPin, BarChart3, Users, Truck, LogOut } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

// Static mock data hoisted to module scope to avoid recreating on each render
const ALL_ROUTE_DATA = [
  // John D. (more entries)
  { date: "10/16/25", courierId: "JD", courierName: "John D.", route: "R101", stop: 1, address: "123 Main St", compliance: "✓ On Route" },
  { date: "10/16/25", courierId: "JD", courierName: "John D.", route: "R101", stop: 5, address: "248 River Rd", compliance: "✓ On Route" },
  { date: "10/17/25", courierId: "JD", courierName: "John D.", route: "R118", stop: 2, address: "90 Broadway", compliance: "Off Route" },
  { date: "10/18/25", courierId: "JD", courierName: "John D.", route: "R118", stop: 9, address: "12 King St", compliance: "✓ On Route" },
  // Amanda L.
  { date: "10/16/25", courierId: "AL", courierName: "Amanda L.", route: "R202", stop: 3, address: "456 Oak Ave", compliance: "✓ On Route" },
  { date: "10/17/25", courierId: "AL", courierName: "Amanda L.", route: "R220", stop: 11, address: "77 Willow Ln", compliance: "✓ On Route" },
  // Mike S.
  { date: "10/16/25", courierId: "MS", courierName: "Mike S.", route: "R303", stop: 7, address: "789 Pine Rd", compliance: "✓ On Route" },
  { date: "10/18/25", courierId: "MS", courierName: "Mike S.", route: "R315", stop: 4, address: "5 Summit Dr", compliance: "Off Route" },
  // Lisa H.
  { date: "10/16/25", courierId: "LH", courierName: "Lisa H.", route: "R404", stop: 2, address: "321 Elm St", compliance: "✓ On Route" },
  { date: "10/17/25", courierId: "LH", courierName: "Lisa H.", route: "R410", stop: 13, address: "200 Lakeview Blvd", compliance: "✓ On Route" },
  // Tom R.
  { date: "10/16/25", courierId: "TR", courierName: "Tom R.", route: "R505", stop: 7, address: "654 Maple Dr", compliance: "✓ On Route" },
  { date: "10/18/25", courierId: "TR", courierName: "Tom R.", route: "R512", stop: 16, address: "801 Cedar Ct", compliance: "Off Route" },
];

const ALL_SCAN_DATA = [
  // John D. (more entries)
  { date: "10/16/25", courierId: "JD", courierName: "John D.", route: "R101", stop: 12, address: "123 Main St, City", tracking: "1Z999AA1234567890", scanType: "POD", distance: 180, compliance: "✓ Compliant" },
  { date: "10/16/25", courierId: "JD", courierName: "John D.", route: "R101", stop: 18, address: "987 Cedar Ln, City", tracking: "1Z999AA1234567895", scanType: "POD", distance: 240, compliance: "✓ Compliant" },
  { date: "10/17/25", courierId: "JD", courierName: "John D.", route: "R118", stop: 4, address: "22 Birch St, City", tracking: "1Z999AA1234567800", scanType: "PUP", distance: 275, compliance: "✗ Non-compliant" },
  // Amanda L.
  { date: "10/16/25", courierId: "AL", courierName: "Amanda L.", route: "R202", stop: 8, address: "456 Oak Ave, City", tracking: "1Z999AA1234567891", scanType: "PUP", distance: 95, compliance: "✓ Compliant" },
  { date: "10/17/25", courierId: "AL", courierName: "Amanda L.", route: "R220", stop: 15, address: "456 Oak Ave, City", tracking: "1Z999AA1234567811", scanType: "DDEX", distance: 45, compliance: "✓ Compliant" },
  // Mike S.
  { date: "10/16/25", courierId: "MS", courierName: "Mike S.", route: "R303", stop: 15, address: "789 Pine Rd, City", tracking: "1Z999AA1234567892", scanType: "DDEX", distance: 45, compliance: "✓ Compliant" },
  { date: "10/18/25", courierId: "MS", courierName: "Mike S.", route: "R315", stop: 2, address: "100 Oaks Blvd, City", tracking: "1Z999AA1234567822", scanType: "DEX", distance: 310, compliance: "✗ Non-compliant" },
  // Lisa H.
  { date: "10/16/25", courierId: "LH", courierName: "Lisa H.", route: "R404", stop: 22, address: "321 Elm St, City", tracking: "1Z999AA1234567893", scanType: "DEX", distance: 310, compliance: "✗ Non-compliant" },
  { date: "10/17/25", courierId: "LH", courierName: "Lisa H.", route: "R410", stop: 5, address: "210 Lakeview Blvd, City", tracking: "1Z999AA1234567833", scanType: "POD", distance: 120, compliance: "✓ Compliant" },
  // Tom R.
  { date: "10/16/25", courierId: "TR", courierName: "Tom R.", route: "R505", stop: 7, address: "654 Maple Dr, City", tracking: "1Z999AA1234567894", scanType: "PUX", distance: 125, compliance: "✓ Compliant" },
  { date: "10/18/25", courierId: "TR", courierName: "Tom R.", route: "R512", stop: 11, address: "801 Cedar Ct, City", tracking: "1Z999AA1234567844", scanType: "POD", distance: 260, compliance: "✗ Non-compliant" },
];

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('route');
  
  // Extract user properties with fallbacks for backward compatibility
  const userName = user?.displayName || user || 'User';
  const userRole = user?.role || 'admin';
  const courierId = user?.courierId || null;
  const isCourier = userRole === 'courier';
  
  // Memoized KPI data based on user role
  const kpiData = useMemo(() => (
    isCourier
      ? [
          { label: "My Route Compliance", value: "95%", icon: BarChart3, bgGradient: "from-green-500 to-green-600" },
          { label: "My Scan Compliance", value: "92%", icon: MapPin, bgGradient: "from-blue-500 to-blue-600" },
          { label: "My Stops / Hr", value: "12.4", icon: Truck, bgGradient: "from-orange-500 to-orange-600" },
          { label: "My Status", value: "Active", icon: Users, bgGradient: "from-purple-500 to-purple-600" },
        ]
    : [
          { label: "Route Compliance", value: "92%", icon: BarChart3, bgGradient: "from-green-500 to-green-600" },
          { label: "Scan Compliance", value: "88%", icon: MapPin, bgGradient: "from-blue-500 to-blue-600" },
          { label: "Average Stops / Hr", value: "11.2", icon: Truck, bgGradient: "from-orange-500 to-orange-600" },
      { label: "Active Couriers", value: "3", icon: Users, bgGradient: "from-purple-500 to-purple-600" },
        ]
  ), [isCourier]);

  // Memoized filtered datasets
  const { routeData, scanData } = useMemo(() => {
    if (isCourier) {
      return {
        routeData: ALL_ROUTE_DATA.filter(item => item.courierId === courierId),
        scanData: ALL_SCAN_DATA.filter(item => item.courierId === courierId)
      };
    }
    return { routeData: ALL_ROUTE_DATA, scanData: ALL_SCAN_DATA };
  }, [isCourier, courierId]);

  // Derived counts for summaries
  const routeCompliantCount = useMemo(() => routeData.filter(r => r.compliance.includes('✓')).length, [routeData]);
  const routeNoncompliantCount = routeData.length - routeCompliantCount;
  const scanCompliantCount = useMemo(() => scanData.filter(s => s.compliance.includes('✓')).length, [scanData]);
  const scanNoncompliantCount = scanData.length - scanCompliantCount;
  const scanComplianceRate = scanData.length > 0 ? Math.round((scanCompliantCount / scanData.length) * 100) : 0;
  
  return (
    <div className="p-6 grid gap-6 bg-gradient-to-br from-purple-50 to-orange-50 min-h-screen">
      {/* Header Section - FedEx Themed */}
      <header className="flex justify-between items-center bg-gradient-to-r from-purple-800 to-purple-900 p-6 rounded-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Truck className="text-purple-800 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">FedEx</h1>
            <p className="text-purple-200 text-sm">Courier Operations Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <span className="text-white font-medium">Welcome, {userName}</span>
            {isCourier && <div className="text-purple-200 text-xs">Courier {courierId}</div>}
            {!isCourier && <div className="text-purple-200 text-xs capitalize">{userRole}</div>}
          </div>
          <select className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 text-white border border-purple-400/40 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors themed-select">
            <option>Division</option>
            <option value="surface">Surface</option>
          </select>
          <select className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 text-white border border-purple-400/40 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors themed-select">
            <option>Region</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
            <option value="east">East Region</option>
            <option value="west">West Region</option>
          </select>
          <select className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 text-white border border-purple-400/40 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors themed-select">
            <option>Location</option>
            <option value="OWDA">OWDA</option>
            <option value="CEFA">CEFA</option>
            <option value="NYCA">NYCA</option>
            <option value="JRBA">JRBA</option>
            <option value="ANCH">ANCH</option>
            <option value="HNLR">HNLR</option>
          </select>
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold transition-colors shadow-lg">
            Export CSV
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition-colors shadow-lg"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Courier-specific view indicator */}
      {isCourier && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Courier View:</strong> You are viewing your individual performance metrics for Courier ID: <span className="font-semibold">{courierId}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards - FedEx Themed Horizontal Layout */}
      <section className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-purple-800">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            Key Performance Indicators
          </h2>
        </div>
        <div className="flex items-center justify-between space-x-8">
          {kpiData.map((kpi, index) => (
            <div key={kpi.label} className="flex items-center space-x-4 group hover:scale-105 transition-transform">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.bgGradient} shadow-lg`}>
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{kpi.label}:</span>
                <span className="text-3xl font-bold text-gray-900 group-hover:text-purple-800 transition-colors">{kpi.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs for Route and Scan Compliance - FedEx Themed */}
      <div className="mt-6">
        <div className="flex space-x-1 bg-gradient-to-r from-purple-100 to-orange-100 p-1 rounded-xl w-fit shadow-lg">
          <button
            onClick={() => setActiveTab('route')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'route' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-105' 
                : 'text-purple-700 hover:text-purple-900 hover:bg-white/50'
            }`}
          >
            Route Compliance
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'scan' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105' 
                : 'text-orange-700 hover:text-orange-900 hover:bg-white/50'
            }`}
          >
            Scan Compliance
          </button>
        </div>

        {/* Route Compliance Summary - FedEx Themed */}
        {activeTab === 'route' && (
          <>
            <div className="bg-white mt-6 rounded-xl shadow-xl p-8 border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                Route Performance Summary
              </h3>
              <div className="flex items-center justify-between space-x-6">
                <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl">
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                  <div>
                    <span className="text-sm text-gray-600">On Route:</span>
                    <span className="ml-2 text-lg font-bold text-green-600">3 couriers (60%)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <span className="text-sm text-gray-600">Off Route:</span>
                    <span className="ml-2 text-lg font-bold text-red-600">2 couriers (40%)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="text-sm text-gray-600">Avg Stops/Hr:</span>
                    <span className="ml-2 text-lg font-bold text-blue-600">11.2</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <span className="text-sm text-gray-600">Time Variance:</span>
                    <span className="ml-2 text-lg font-bold text-orange-600">+8 min</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <span className="text-sm text-gray-600">Active Routes:</span>
                    <span className="ml-2 text-lg font-bold text-purple-600">5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white mt-4 rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Route Compliance Details</h3>
                <p className="text-sm text-gray-500 mt-1">Monitor courier performance and route efficiency</p>
                {isCourier && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border-l-2 border-blue-400">
                    <p className="text-sm text-blue-700">
                      <strong>Courier View:</strong> Showing {routeData.length} route(s) for Courier {courierId}
                    </p>
                  </div>
                )}
                {!isCourier && (
                  <div className="mt-2 p-2 bg-gray-50 rounded border-l-2 border-gray-400">
                    <p className="text-sm text-gray-700">
                      <strong>Admin View:</strong> Showing {routeData.length} route(s) for all couriers
                    </p>
                  </div>
                )}
              </div>
            
            {/* Route Performance Metrics Legend */}
            <div className="bg-white mt-4 rounded-lg shadow p-4">
              <h4 className="text-md font-semibold mb-3">Performance Metrics Legend</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">P</span>
                  <span>Planned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">A</span>
                  <span>Actual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">V</span>
                  <span>Variance</span>
                </div>
              </div>
            </div>
            
              {/* Admin/Manager full table; Courier sees a simplified personal table */}
              {!isCourier ? (
                <div className="p-6 overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Courier</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Route #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Stop #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Address</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Type</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Packages</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Leave Building</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">To Area Duration</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Stop Duration</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Between Stops</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Stops/Hr</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Compliance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeData.map((r, idx) => {
                        const isCompliant = r.compliance.includes('✓');
                        const isCommercial = /Ave|Blvd|Ct|Plaza|Center/i.test(r.address);
                        const pkgPlanned = (r.stop % 3) + 1;
                        const pkgDelivered = Math.max(0, pkgPlanned - (isCompliant ? 0 : 1));
                        // Durations (minutes) mock
                        const pToArea = 10 + (idx % 6);
                        const aToArea = pToArea + (isCompliant ? -1 : 2);
                        const pStop = 5 + (idx % 4);
                        const aStop = pStop + (isCompliant ? -1 : 1);
                        const pBetween = 4 + (idx % 3);
                        const aBetween = pBetween + (isCompliant ? -1 : 1);
                        const pSph = 11.0 + ((idx % 5) * 0.3);
                        const aSph = pSph + (isCompliant ? 0.7 : -0.5);
                        const fmtVar = (v, unit = 'm') => (v > 0 ? `+${v}${unit}` : `${v}${unit}`);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2 text-sm">{r.date}</td>
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <span className="text-gray-700 font-semibold text-sm">{r.courierId}</span>
                                </div>
                                <span>{r.courierName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2 font-mono">{r.route}</td>
                            <td className="py-3 px-2">{r.stop}</td>
                            <td className="py-3 px-2 text-sm">{r.address}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded text-xs ${isCommercial ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{isCommercial ? 'COM' : 'RES'}</span>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <div className="text-xs">P:{pkgPlanned} | D:{pkgDelivered}</div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-xs space-y-1">
                                <div className="flex space-x-1"><span className="px-1 bg-blue-100 text-blue-700 rounded">P</span><span>8:00</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-green-100 text-green-700 rounded">A</span><span>8:05</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-orange-100 text-orange-700 rounded">V</span><span className={`${isCompliant ? 'text-green-600' : 'text-red-600'}`}>{isCompliant ? '-5m' : '+5m'}</span></div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-xs space-y-1">
                                <div className="flex space-x-1"><span className="px-1 bg-blue-100 text-blue-700 rounded">P</span><span>{pToArea}m</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-green-100 text-green-700 rounded">A</span><span>{aToArea}m</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-orange-100 text-orange-700 rounded">V</span><span className={`${aToArea - pToArea <= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmtVar(aToArea - pToArea)}</span></div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-xs space-y-1">
                                <div className="flex space-x-1"><span className="px-1 bg-blue-100 text-blue-700 rounded">P</span><span>{pStop}m</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-green-100 text-green-700 rounded">A</span><span>{aStop}m</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-orange-100 text-orange-700 rounded">V</span><span className={`${aStop - pStop <= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmtVar(aStop - pStop)}</span></div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-xs space-y-1">
                                <div className="flex space-x-1"><span className="px-1 bg-blue-100 text-blue-700 rounded">P</span><span>{pBetween}m</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-green-100 text-green-700 rounded">A</span><span>{aBetween}m</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-orange-100 text-orange-700 rounded">V</span><span className={`${aBetween - pBetween <= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmtVar(aBetween - pBetween)}</span></div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-xs space-y-1">
                                <div className="flex space-x-1"><span className="px-1 bg-blue-100 text-blue-700 rounded">P</span><span>{pSph.toFixed(1)}</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-green-100 text-green-700 rounded">A</span><span>{aSph.toFixed(1)}</span></div>
                                <div className="flex space-x-1"><span className="px-1 bg-orange-100 text-orange-700 rounded">V</span><span className={`${aSph - pSph >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmtVar((aSph - pSph).toFixed(1), '')}</span></div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              {isCompliant ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{r.compliance}</span>
                              ) : (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">{r.compliance}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Route #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Stop #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Address</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Compliance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeData.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-500">No route records for your account.</td>
                        </tr>
                      ) : (
                        routeData.map((r, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2 text-sm">{r.date}</td>
                            <td className="py-3 px-2 font-mono">{r.route}</td>
                            <td className="py-3 px-2">{r.stop}</td>
                            <td className="py-3 px-2 text-sm">{r.address}</td>
                            <td className="py-3 px-2">
                              {r.compliance.includes('✓') ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{r.compliance}</span>
                              ) : (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">{r.compliance}</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            
            {/* Filtered Data Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4 border border-blue-200">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Data Filtering Summary</h4>
              {isCourier ? (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700">
                    <strong>🎯 Courier-Specific View Active</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-2 rounded border-l-4 border-blue-400">
                      <span className="font-medium">Your Routes:</span> {routeData.length} routes found
                    </div>
                    <div className="bg-white p-2 rounded border-l-4 border-green-400">
                      <span className="font-medium">Your Compliance:</span> {routeCompliantCount}/{routeData.length} compliant
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Note: Table above shows hardcoded sample data. In production, only your courier records would be displayed.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <strong>👥 Administrator View - All Couriers</strong>
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-2 rounded border-l-4 border-gray-400">
                      <span className="font-medium">Total Routes:</span> {routeData.length} routes
                    </div>
                    <div className="bg-white p-2 rounded border-l-4 border-green-400">
                      <span className="font-medium">Compliant:</span> {routeCompliantCount} routes
                    </div>
                    <div className="bg-white p-2 rounded border-l-4 border-red-400">
                      <span className="font-medium">Non-compliant:</span> {routeNoncompliantCount} routes
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Route Compliance Charts */}
            {!isCourier ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Courier Performance Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold mb-4">Courier Performance Comparison</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'John D.', planned: 11.5, actual: 10.8, variance: -0.7 },
                      { name: 'Amanda L.', planned: 11.5, actual: 12.2, variance: 0.7 },
                      { name: 'Mike S.', planned: 13.2, actual: 14.1, variance: 0.9 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Stops per Hour', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value, name) => [value, name === 'planned' ? 'Planned' : name === 'actual' ? 'Actual' : 'Variance']} />
                      <Legend />
                      <Bar dataKey="planned" fill="#3b82f6" name="Planned" />
                      <Bar dataKey="actual" fill="#10b981" name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Route Compliance Status */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold mb-4">Route Compliance Status</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'On Route', value: 2, color: '#10b981' },
                          { name: 'Off Route', value: 1, color: '#f59e0b' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Time Variance Trend */}
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                  <h4 className="text-lg font-semibold mb-4">Time Variance Analysis</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { courier: 'John D.', leaveBuilding: 5, toArea: 3, stopDuration: 1, betweenStops: 2 },
                      { courier: 'Amanda L.', leaveBuilding: -5, toArea: -2, stopDuration: -1, betweenStops: -1 },
                      { courier: 'Mike S.', leaveBuilding: -3, toArea: -2, stopDuration: 0, betweenStops: -1 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="courier" />
                      <YAxis label={{ value: 'Time Variance (minutes)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value > 0 ? '+' : ''}${value} min`, 'Variance']} />
                      <Legend />
                      <Line type="monotone" dataKey="leaveBuilding" stroke="#3b82f6" name="Leave Building" strokeWidth={2} />
                      <Line type="monotone" dataKey="toArea" stroke="#10b981" name="To Area Duration" strokeWidth={2} />
                      <Line type="monotone" dataKey="stopDuration" stroke="#f59e0b" name="Stop Duration" strokeWidth={2} />
                      <Line type="monotone" dataKey="betweenStops" stroke="#ef4444" name="Between Stops" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 mt-6">
                {/* My Route Compliance Status */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold mb-4">My Route Compliance</h4>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'On Route', value: routeCompliantCount },
                          { name: 'Off Route', value: routeNoncompliantCount }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
          </>
        )}

        {/* Scan Compliance Summary */}
        {activeTab === 'scan' && (
          <>
            {!isCourier ? (
              <div className="bg-white mt-4 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Scan Performance Summary</h3>
                <div className="flex items-center justify-between space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Compliant Scans:</span>
                      <span className="ml-2 text-lg font-bold text-green-600">12 scans (75%)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Non-Compliant:</span>
                      <span className="ml-2 text-lg font-bold text-red-600">4 scans (25%)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Avg Distance:</span>
                      <span className="ml-2 text-lg font-bold text-orange-600">185 ft</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Total Scans:</span>
                      <span className="ml-2 text-lg font-bold text-blue-600">16 today</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white mt-4 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">My Scan Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Compliant:</span>
                      <span className="ml-2 text-lg font-bold text-green-600">{scanCompliantCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Non-Compliant:</span>
                      <span className="ml-2 text-lg font-bold text-red-600">{scanNoncompliantCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="ml-2 text-lg font-bold text-blue-600">{scanData.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <span className="text-sm text-gray-600">Compliance Rate:</span>
                      <span className="ml-2 text-lg font-bold text-orange-600">{scanComplianceRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scan Types Legend */}
            <div className="bg-white mt-4 rounded-lg shadow p-4">
              <h4 className="text-md font-semibold mb-3">Scan Types Reference</h4>
              <div className="grid grid-cols-5 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">PUP</span>
                  <span>Pickup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-mono">PUX</span>
                  <span>Pickup Exception</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-mono">POD</span>
                  <span>Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-mono">DDEX</span>
                  <span>Delivery Exception - Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-mono">DEX</span>
                  <span>Delivery Exception - Not Delivered</span>
                </div>
              </div>
            </div>

            {/* Scan Compliance Table */}
            <div className="bg-white mt-4 rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Scan Compliance Details</h3>
                <p className="text-sm text-gray-500 mt-1">Monitor scan accuracy and location compliance (250+ ft is non-compliant)</p>
                {isCourier && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border-l-2 border-blue-400">
                    <p className="text-sm text-blue-700">
                      <strong>Courier View:</strong> Showing {scanData.length} scan(s) for Courier {courierId}
                    </p>
                  </div>
                )}
                {!isCourier && (
                  <div className="mt-2 p-2 bg-gray-50 rounded border-l-2 border-gray-400">
                    <p className="text-sm text-gray-700">
                      <strong>Admin View:</strong> Showing {scanData.length} scan(s) for all couriers
                    </p>
                  </div>
                )}
              </div>
              {!isCourier ? (
                <div className="p-6 overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Courier</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Route #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Stop #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Address</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Tracking #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Scan Type</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Distance (ft)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Compliance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanData.map((s, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm">{s.date}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-gray-700 font-semibold text-sm">{s.courierId}</span>
                              </div>
                              <span>{s.courierName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-mono">{s.route}</td>
                          <td className="py-3 px-2">{s.stop}</td>
                          <td className="py-3 px-2 text-sm">{s.address}</td>
                          <td className="py-3 px-2 font-mono text-sm">{s.tracking}</td>
                          <td className="py-3 px-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">{s.scanType}</span>
                          </td>
                          <td className={`py-3 px-2 ${s.distance > 250 ? 'text-red-600' : 'text-green-600'} font-semibold`}>{s.distance}</td>
                          <td className="py-3 px-2">
                            {s.compliance.includes('✓') ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{s.compliance}</span>
                            ) : (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">{s.compliance}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Route #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Stop #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Address</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Tracking #</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Scan Type</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Distance (ft)</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Compliance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanData.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-4 text-center text-gray-500">No scan records for your account.</td>
                        </tr>
                      ) : (
                        scanData.map((s, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2 text-sm">{s.date}</td>
                            <td className="py-3 px-2 font-mono">{s.route}</td>
                            <td className="py-3 px-2">{s.stop}</td>
                            <td className="py-3 px-2 text-sm">{s.address}</td>
                            <td className="py-3 px-2 font-mono text-sm">{s.tracking}</td>
                            <td className="py-3 px-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">{s.scanType}</span>
                            </td>
                            <td className={`py-3 px-2 ${s.distance > 250 ? 'text-red-600' : 'text-green-600'} font-semibold`}>{s.distance}</td>
                            <td className="py-3 px-2">
                              {s.compliance.includes('✓') ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{s.compliance}</span>
                              ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">{s.compliance}</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Scan Data Filtering Summary */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mt-4 border border-green-200">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Scan Data Filtering Summary</h4>
                {isCourier ? (
                  <div className="space-y-2">
                    <p className="text-sm text-green-700">
                      <strong>🎯 Your Scan Records Only</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-2 rounded border-l-4 border-green-400">
                        <span className="font-medium">Your Scans:</span> {scanData.length} total scans
                      </div>
                      <div className="bg-white p-2 rounded border-l-4 border-blue-400">
                        <span className="font-medium">Compliance Rate:</span> {scanComplianceRate}%
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Note: Table above shows hardcoded sample data. In production, only your scan records would be displayed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <strong>👥 Administrator View - All Courier Scans</strong>
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white p-2 rounded border-l-4 border-gray-400">
                        <span className="font-medium">Total Scans:</span> {scanData.length} scans
                      </div>
                      <div className="bg-white p-2 rounded border-l-4 border-green-400">
                        <span className="font-medium">Compliant:</span> {scanCompliantCount} scans
                      </div>
                      <div className="bg-white p-2 rounded border-l-4 border-red-400">
                        <span className="font-medium">Non-compliant:</span> {scanNoncompliantCount} scans
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!isCourier ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  {/* Scan Distance Analysis */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-semibold mb-4">Scan Distance Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { range: '0-100ft', count: 2, compliance: 'Compliant' },
                        { range: '100-200ft', count: 2, compliance: 'Compliant' },
                        { range: '200-250ft', count: 1, compliance: 'Compliant' },
                        { range: '250ft+', count: 1, compliance: 'Non-compliant' }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis label={{ value: 'Number of Scans', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value, name) => [value, 'Scan Count']} />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Scan Type Distribution */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-semibold mb-4">Scan Type Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'POD (Delivery)', value: 2, color: '#10b981' },
                            { name: 'PUP (Pickup)', value: 1, color: '#3b82f6' },
                            { name: 'DDEX (Delivered Exception)', value: 1, color: '#f59e0b' },
                            { name: 'DEX (Exception)', value: 1, color: '#ef4444' },
                            { name: 'PUX (Pickup Exception)', value: 1, color: '#8b5cf6' }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name.split('(')[0]} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#ef4444" />
                          <Cell fill="#8b5cf6" />
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Scans']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Courier Scan Performance */}
                  <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                    <h4 className="text-lg font-semibold mb-4">Courier Scan Performance</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { courier: 'John D.', compliantScans: 2, distance: 210, avgDistance: 210 },
                        { courier: 'Mike S.', compliantScans: 1, distance: 95, avgDistance: 95 },
                        { courier: 'Amanda L.', compliantScans: 1, distance: 45, avgDistance: 45 },
                        { courier: 'Lisa H.', compliantScans: 0, distance: 310, avgDistance: 310 },
                        { courier: 'Tom R.', compliantScans: 1, distance: 125, avgDistance: 125 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="courier" />
                        <YAxis yAxisId="left" label={{ value: 'Compliant Scans', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Avg Distance (ft)', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="compliantScans" fill="#10b981" name="Compliant Scans" />
                        <Line yAxisId="right" type="monotone" dataKey="avgDistance" stroke="#ef4444" strokeWidth={3} name="Avg Distance (ft)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Compliance Trend */}
                  <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                    <h4 className="text-lg font-semibold mb-4">Daily Compliance Trend</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { date: 'Oct 14', routeCompliance: 85, scanCompliance: 82 },
                        { date: 'Oct 15', routeCompliance: 88, scanCompliance: 85 },
                        { date: 'Oct 16', routeCompliance: 92, scanCompliance: 88 },
                        { date: 'Oct 17', routeCompliance: 90, scanCompliance: 90 },
                        { date: 'Oct 18', routeCompliance: 94, scanCompliance: 87 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: 'Compliance %', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Compliance']} />
                        <Legend />
                        <Line type="monotone" dataKey="routeCompliance" stroke="#3b82f6" strokeWidth={3} name="Route Compliance" />
                        <Line type="monotone" dataKey="scanCompliance" stroke="#10b981" strokeWidth={3} name="Scan Compliance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {/* My Scan Compliance */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-semibold mb-4">My Scan Compliance</h4>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Compliant', value: scanCompliantCount },
                            { name: 'Non-compliant', value: scanNoncompliantCount }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
