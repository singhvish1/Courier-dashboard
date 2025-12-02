import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

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

      {/* Charts: Courier Performance and Compliance */}
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
              <Bar dataKey="planned" fill="#10b981" name="Planned" />
              <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

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
              >
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-3">
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
      </section>
    </div>
  );
}
