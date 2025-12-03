import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ComposedChart, Line, LineChart } from 'recharts';

export default function MobileDashboard({
  userName,
  isCourier,
  courierId,
  selectedRegion,
  selectedLocation,
  setSelectedRegion,
  setSelectedLocation,
  kpiData,
  routeData,
  scanData,
  routeCompliantCount,
  routeNoncompliantCount,
  scanCompliantCount,
  scanNoncompliantCount,
  onLogout,
  onExitMobile,
}) {
  const [activeTab, setActiveTab] = React.useState('route');
  const [scanModalOpen, setScanModalOpen] = React.useState(false);
  const [scanModalBin, setScanModalBin] = React.useState('');
  const [scanModalItems, setScanModalItems] = React.useState([]);
  const [routeModalOpen, setRouteModalOpen] = React.useState(false);
  const [routeModalSegment, setRouteModalSegment] = React.useState('');
  const [routeModalItems, setRouteModalItems] = React.useState([]);
  
  return (
    <div className="p-3 grid gap-4 bg-gradient-to-br from-purple-50 to-orange-50 min-h-screen">
      <header className="space-y-2 bg-gradient-to-r from-purple-800 to-purple-900 p-4 rounded-xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white">FedEx</h1>
          <p className="text-purple-200 text-xs">Courier Operations Dashboard</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white text-sm">Welcome, {userName}</span>
          {isCourier ? (
            <span className="text-purple-200 text-xs">Courier {courierId}</span>
          ) : null}
          <button 
            onClick={onLogout}
            className="ml-auto px-3 py-1 bg-red-500 text-white rounded-lg text-xs"
          >Logout</button>
          {onExitMobile && (
            <button 
              onClick={onExitMobile}
              className="px-3 py-1 bg-gray-600 text-white rounded-lg text-xs"
            >Back to Web View</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="px-2 py-1 rounded bg-purple-700 text-white text-xs">
            <option value="">Region (All)</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-2 py-1 rounded bg-purple-700 text-white text-xs">
            <option value="">Location (All)</option>
            <option value="OWDA">OWDA</option>
            <option value="CEFA">CEFA</option>
            <option value="NYCA">NYCA</option>
            <option value="JRBA">JRBA</option>
            <option value="ANCH">ANCH</option>
            <option value="HNLR">HNLR</option>
          </select>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-2">
        {kpiData.map((k) => (
          <div key={k.label} className="bg-white rounded-lg shadow p-3">
            <div className="text-xs text-gray-500">{k.label}</div>
            <div className="text-lg font-bold">{k.value}</div>
          </div>
        ))}
      </section>

      {/* Toggle: Route vs Scan */}
      <section className="bg-white rounded-lg shadow p-3">
        <div className="flex gap-2 mb-2">
          <button onClick={() => setActiveTab('route')} className={`px-2 py-1 rounded text-xs ${activeTab==='route' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Route Compliance</button>
          <button onClick={() => setActiveTab('scan')} className={`px-2 py-1 rounded text-xs ${activeTab==='scan' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Scan Compliance</button>
        </div>
        {activeTab === 'route' ? (
          <div key={activeTab}>
            <h2 className="text-sm font-semibold mb-2">Routes</h2>
            <div className="overflow-x-auto -mx-3">
              <table className="w-full min-w-max text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Courier</th>
                    <th className="p-2 text-left">Route</th>
                    <th className="p-2 text-left">Stop</th>
                    <th className="p-2 text-left">Region</th>
                    <th className="p-2 text-left">Location</th>
                    <th className="p-2 text-left">Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {routeData.map((r, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-2">{r.date}</td>
                      <td className="p-2">{r.courierName}</td>
                      <td className="p-2">{r.route}</td>
                      <td className="p-2">{r.stop}</td>
                      <td className="p-2">{r.region}</td>
                      <td className="p-2">{r.location}</td>
                      <td className="p-2">{r.compliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">On Route: {routeCompliantCount}</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Off Route: {routeNoncompliantCount}</span>
            </div>
          </div>
        ) : (
          <div key={activeTab}>
            <h2 className="text-sm font-semibold mb-2">Scans</h2>
            <div className="overflow-x-auto -mx-3">
              <table className="w-full min-w-max text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Courier</th>
                    <th className="p-2 text-left">Route</th>
                    <th className="p-2 text-left">Stop</th>
                    <th className="p-2 text-left">Tracking</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Distance</th>
                    <th className="p-2 text-left">Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {scanData.map((s, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-2">{s.date}</td>
                      <td className="p-2">{s.courierName}</td>
                      <td className="p-2">{s.route}</td>
                      <td className="p-2">{s.stop}</td>
                      <td className="p-2">{s.tracking}</td>
                      <td className="p-2">{s.scanType}</td>
                      <td className="p-2">{s.distance}</td>
                      <td className="p-2">{s.compliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Scan ✓: {scanCompliantCount}</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Scan ✗: {scanNoncompliantCount}</span>
            </div>
          </div>
        )}
  </section>

      {/* Route Compliance Charts - Only show when activeTab is 'route' */}
      {activeTab === 'route' && (
        <>
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Route Compliance Status</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'On Route', value: routeCompliantCount },
                      { name: 'Off Route', value: routeNoncompliantCount }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => {
                      const payload = data?.activePayload?.[0]?.payload || data?.payload;
                      const segment = payload?.name || '';
                      const items = routeData.filter(r => {
                        if (segment === 'On Route') return r.compliance === 'On Route';
                        if (segment === 'Off Route') return r.compliance === 'Off Route';
                        return false;
                      });
                      setRouteModalSegment(segment);
                      setRouteModalItems(items);
                      setRouteModalOpen(true);
                    }}
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Courier Performance Chart */}
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Courier Performance Comparison</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'John D.', planned: 11.5, actual: 10.8 },
                  { name: 'Amanda L.', planned: 11.5, actual: 12.2 },
                  { name: 'Mike S.', planned: 13.2, actual: 14.1 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value, name === 'planned' ? 'Planned' : 'Actual']} />
                  <Legend />
                  <Bar dataKey="planned" fill="#10b981" name="Actual" />
                  <Bar dataKey="actual" fill="#3b82f6" name="Planned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Time Variance Analysis */}
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Time Variance Analysis</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { courier: 'John D.', leaveBuilding: 5, toArea: 3, stopDuration: 1, betweenStops: 2 },
                  { courier: 'Amanda L.', leaveBuilding: -5, toArea: -2, stopDuration: -1, betweenStops: -1 },
                  { courier: 'Mike S.', leaveBuilding: -3, toArea: -2, stopDuration: 0, betweenStops: -1 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="courier" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => [`${value > 0 ? '+' : ''}${value} min`, 'Variance']} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="leaveBuilding" stroke="#3b82f6" name="Leave Building" strokeWidth={2} />
                  <Line type="monotone" dataKey="toArea" stroke="#10b981" name="To Area Duration" strokeWidth={2} />
                  <Line type="monotone" dataKey="stopDuration" stroke="#f59e0b" name="Stop Duration" strokeWidth={2} />
                  <Line type="monotone" dataKey="betweenStops" stroke="#ef4444" name="Between Stops" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}

      {/* Scan Compliance Charts - Only show when activeTab is 'scan' */}
      {activeTab === 'scan' && (
        <>
          {/* Scan Distance Distribution */}
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Scan Distance Distribution</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { range: '0-100ft', count: scanData.filter(s => s.distance < 100).length },
                  { range: '100-200ft', count: scanData.filter(s => s.distance >= 100 && s.distance < 200).length },
                  { range: '200-250ft', count: scanData.filter(s => s.distance >= 200 && s.distance < 250).length },
                  { range: '250ft+', count: scanData.filter(s => s.distance >= 250).length }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" onClick={(data) => {
                    const bin = data?.activePayload?.[0]?.payload?.range || data?.payload?.range || '';
                    const inBin = (d) => {
                      const dist = Number(d.distance);
                      if (bin === '0-100ft') return dist >= 0 && dist < 100;
                      if (bin === '100-200ft') return dist >= 100 && dist < 200;
                      if (bin === '200-250ft') return dist >= 200 && dist < 250;
                      if (bin === '250ft+') return dist >= 250;
                      return false;
                    };
                    const items = scanData.filter(inBin);
                    setScanModalBin(bin);
                    setScanModalItems(items);
                    setScanModalOpen(true);
                  }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Scan Type Distribution */}
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Scan Type Distribution</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'POD (Delivery)', value: scanData.filter(s => s.scanType === 'POD').length, key: 'POD' },
                      { name: 'PUP (Pickup)', value: scanData.filter(s => s.scanType === 'PUP').length, key: 'PUP' },
                      { name: 'DDEX (Delivered Exception)', value: scanData.filter(s => s.scanType === 'DDEX').length, key: 'DDEX' },
                      { name: 'DEX (Exception)', value: scanData.filter(s => s.scanType === 'DEX').length, key: 'DEX' },
                      { name: 'PUX (Pickup Exception)', value: scanData.filter(s => s.scanType === 'PUX').length, key: 'PUX' }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split('(')[0]} ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => {
                      const payload = data?.activePayload?.[0]?.payload || data?.payload;
                      const key = payload?.key || '';
                      const items = scanData.filter(s => s.scanType === key);
                      setScanModalBin(`${payload?.name || key}`);
                      setScanModalItems(items);
                      setScanModalOpen(true);
                    }}
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                    <Cell fill="#8b5cf6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Courier Scan Performance */}
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Courier Scan Performance</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={[
                  { courier: 'John D.', compliantScans: scanData.filter(s => s.courierName === 'John D.' && s.compliance === '✓ Compliant').length, 
                    avgDistance: Math.round(scanData.filter(s => s.courierName === 'John D.').reduce((sum, s) => sum + s.distance, 0) / scanData.filter(s => s.courierName === 'John D.').length) || 0 },
                  { courier: 'Amanda L.', compliantScans: scanData.filter(s => s.courierName === 'Amanda L.' && s.compliance === '✓ Compliant').length,
                    avgDistance: Math.round(scanData.filter(s => s.courierName === 'Amanda L.').reduce((sum, s) => sum + s.distance, 0) / scanData.filter(s => s.courierName === 'Amanda L.').length) || 0 },
                  { courier: 'Mike S.', compliantScans: scanData.filter(s => s.courierName === 'Mike S.' && s.compliance === '✓ Compliant').length,
                    avgDistance: Math.round(scanData.filter(s => s.courierName === 'Mike S.').reduce((sum, s) => sum + s.distance, 0) / scanData.filter(s => s.courierName === 'Mike S.').length) || 0 },
                  { courier: 'Lisa H.', compliantScans: scanData.filter(s => s.courierName === 'Lisa H.' && s.compliance === '✓ Compliant').length,
                    avgDistance: Math.round(scanData.filter(s => s.courierName === 'Lisa H.').reduce((sum, s) => sum + s.distance, 0) / scanData.filter(s => s.courierName === 'Lisa H.').length) || 0 },
                  { courier: 'Tom R.', compliantScans: scanData.filter(s => s.courierName === 'Tom R.' && s.compliance === '✓ Compliant').length,
                    avgDistance: Math.round(scanData.filter(s => s.courierName === 'Tom R.').reduce((sum, s) => sum + s.distance, 0) / scanData.filter(s => s.courierName === 'Tom R.').length) || 0 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="courier" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar yAxisId="left" dataKey="compliantScans" fill="#10b981" name="Compliant Scans" />
                  <Line yAxisId="right" type="monotone" dataKey="avgDistance" stroke="#ef4444" strokeWidth={2} name="Avg Distance (ft)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Daily Compliance Trend */}
          <section className="bg-white rounded-lg shadow p-3">
            <h2 className="text-sm font-semibold mb-2">Daily Compliance Trend</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { date: 'Oct 14', routeCompliance: 85, scanCompliance: 82 },
                  { date: 'Oct 15', routeCompliance: 88, scanCompliance: 85 },
                  { date: 'Oct 16', routeCompliance: 92, scanCompliance: 88 },
                  { date: 'Oct 17', routeCompliance: 90, scanCompliance: 90 },
                  { date: 'Oct 18', routeCompliance: 94, scanCompliance: 87 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Compliance']} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="routeCompliance" stroke="#3b82f6" strokeWidth={2} name="Route Compliance" />
                  <Line type="monotone" dataKey="scanCompliance" stroke="#10b981" strokeWidth={2} name="Scan Compliance" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}

      {/* Scan Modal */}
      {scanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-semibold">Scans in {scanModalBin}</h5>
              <button onClick={() => setScanModalOpen(false)} className="text-gray-600 hover:text-black text-xl">✕</button>
            </div>
            {scanModalItems.length === 0 ? (
              <div className="text-sm text-gray-600">No scans found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Courier</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Route</th>
                      <th className="p-2 text-left">Tracking</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanModalItems.map((it, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{it.courierName}</td>
                        <td className="p-2">{it.date}</td>
                        <td className="p-2">{it.route}</td>
                        <td className="p-2 font-mono text-[10px]">{it.tracking}</td>
                        <td className="p-2">{it.scanType}</td>
                        <td className="p-2">{it.distance} ft</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-3 text-right">
              <button onClick={() => setScanModalOpen(false)} className="px-3 py-1 bg-purple-600 text-white rounded text-xs">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Route Modal */}
      {routeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-semibold">Routes - {routeModalSegment}</h5>
              <button onClick={() => setRouteModalOpen(false)} className="text-gray-600 hover:text-black text-xl">✕</button>
            </div>
            {routeModalItems.length === 0 ? (
              <div className="text-sm text-gray-600">No routes found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Courier</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Route</th>
                      <th className="p-2 text-left">Stop</th>
                      <th className="p-2 text-left">Address</th>
                      <th className="p-2 text-left">Region</th>
                      <th className="p-2 text-left">Location</th>
                      <th className="p-2 text-left">Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeModalItems.map((it, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{it.courierName}</td>
                        <td className="p-2">{it.date}</td>
                        <td className="p-2">{it.route}</td>
                        <td className="p-2">{it.stop}</td>
                        <td className="p-2">{it.address}</td>
                        <td className="p-2">{it.region}</td>
                        <td className="p-2">{it.location}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            it.compliance === 'On Route' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {it.compliance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-3 text-right">
              <button onClick={() => setRouteModalOpen(false)} className="px-3 py-1 bg-purple-600 text-white rounded text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
