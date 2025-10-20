import React, { useState } from 'react';
import { MapPin, BarChart3, Users, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function CourierDashboardWireframe() {
  const [activeTab, setActiveTab] = useState('route');
  
  return (
    <div className="p-6 grid gap-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Truck className="text-purple-600" /> Courier Dashboard
        </h1>
        <div className="flex gap-3">
          <select className="px-3 py-2 border rounded-md bg-white">
            <option>Division</option>
            <option value="east">East Division</option>
            <option value="west">West Division</option>
          </select>
          <select className="px-3 py-2 border rounded-md bg-white">
            <option>Region</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
          </select>
          <select className="px-3 py-2 border rounded-md bg-white">
            <option>Location</option>
            <option value="hub1">Hub 1</option>
            <option value="hub2">Hub 2</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Export CSV
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-4 gap-4">
        {[
          { label: "Route Compliance", value: "92%", icon: BarChart3 },
          { label: "Scan Compliance", value: "88%", icon: MapPin },
          { label: "Average Stops / Hr", value: "11.2", icon: Truck },
          { label: "Active Couriers", value: "27", icon: Users },
        ].map((kpi) => (
          <motion.div whileHover={{ scale: 1.02 }} key={kpi.label}>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-600">{kpi.label}</h3>
                <kpi.icon className="text-purple-600 w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Tabs for Route and Scan Compliance */}
      <div className="mt-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('route')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'route' 
                ? 'bg-white text-purple-600 shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Route Compliance
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'scan' 
                ? 'bg-white text-purple-600 shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Scan Compliance
          </button>
        </div>

        {/* Route Compliance Summary */}
        {activeTab === 'route' && (
          <>
            <div className="bg-white mt-4 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Route Performance Summary</h3>
              <div className="flex items-center justify-between space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">10/16/25</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">JD</span>
                        </div>
                        <span>John D.</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono">R101</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2 text-sm">123 Main St</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">RES</span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="text-xs">
                        <div>P:2 | D:1</div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>8:00</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>8:05</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-red-600">+5m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>15m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>18m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-red-600">+3m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>3m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>4m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-red-600">+1m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>5m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>7m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-red-600">+2m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>12.0</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>10.8</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-red-600">-1.2</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Off Route</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">10/16/25</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">AL</span>
                        </div>
                        <span>Amanda L.</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono">R202</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2 text-sm">456 Oak Ave</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">COM</span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="text-xs">
                        <div>P:5 | D:3</div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>8:00</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>7:58</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-2m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>12m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>11m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-1m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>5m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>4m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-1m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>4m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>3m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-1m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>11.5</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>12.2</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">+0.7</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ On Route</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">10/16/25</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">MS</span>
                        </div>
                        <span>Mike S.</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono">R303</td>
                    <td className="py-3 px-2">7</td>
                    <td className="py-3 px-2 text-sm">789 Pine Rd</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">RES</span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="text-xs">
                        <div>P:0 | D:2</div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>9:15</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>9:12</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-3m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>8m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>6m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-2m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>2m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>2m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-gray-600">0m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>6m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>5m</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">-1m</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-xs space-y-1">
                        <div className="flex space-x-1">
                          <span className="px-1 bg-blue-100 text-blue-700 rounded">P</span>
                          <span>13.2</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-green-100 text-green-700 rounded">A</span>
                          <span>14.1</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="px-1 bg-orange-100 text-orange-700 rounded">V</span>
                          <span className="text-green-600">+0.9</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ On Route</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}

        {/* Scan Compliance Summary */}
        {activeTab === 'scan' && (
          <>
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
              </div>
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
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">10/16/25</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">JD</span>
                          </div>
                          <span>John D.</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">R101</td>
                      <td className="py-3 px-2">12</td>
                      <td className="py-3 px-2 text-sm">123 Main St, City</td>
                      <td className="py-3 px-2 font-mono text-sm">1Z999AA1234567890</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-mono">POD</span>
                      </td>
                      <td className="py-3 px-2 text-green-600 font-semibold">180</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ Compliant</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">10/16/25</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold text-sm">AL</span>
                          </div>
                          <span>Amanda L.</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">R202</td>
                      <td className="py-3 px-2">8</td>
                      <td className="py-3 px-2 text-sm">456 Oak Ave, City</td>
                      <td className="py-3 px-2 font-mono text-sm">1Z999AA1234567891</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">PUP</span>
                      </td>
                      <td className="py-3 px-2 text-red-600 font-semibold">290</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">✗ Non-compliant</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">10/16/25</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">MS</span>
                          </div>
                          <span>Mike S.</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">R303</td>
                      <td className="py-3 px-2">15</td>
                      <td className="py-3 px-2 text-sm">789 Pine Rd, City</td>
                      <td className="py-3 px-2 font-mono text-sm">1Z999AA1234567892</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-mono">DDEX</span>
                      </td>
                      <td className="py-3 px-2 text-green-600 font-semibold">45</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ Compliant</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">10/16/25</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-semibold text-sm">LH</span>
                          </div>
                          <span>Lisa H.</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">R404</td>
                      <td className="py-3 px-2">22</td>
                      <td className="py-3 px-2 text-sm">321 Elm St, City</td>
                      <td className="py-3 px-2 font-mono text-sm">1Z999AA1234567893</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-mono">DEX</span>
                      </td>
                      <td className="py-3 px-2 text-red-600 font-semibold">310</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">✗ Non-compliant</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">10/16/25</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-semibold text-sm">TR</span>
                          </div>
                          <span>Tom R.</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">R505</td>
                      <td className="py-3 px-2">7</td>
                      <td className="py-3 px-2 text-sm">654 Maple Dr, City</td>
                      <td className="py-3 px-2 font-mono text-sm">1Z999AA1234567894</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-mono">PUX</span>
                      </td>
                      <td className="py-3 px-2 text-green-600 font-semibold">125</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ Compliant</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">10/16/25</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">JD</span>
                          </div>
                          <span>John D.</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono">R101</td>
                      <td className="py-3 px-2">18</td>
                      <td className="py-3 px-2 text-sm">987 Cedar Ln, City</td>
                      <td className="py-3 px-2 font-mono text-sm">1Z999AA1234567895</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-mono">POD</span>
                      </td>
                      <td className="py-3 px-2 text-orange-600 font-semibold">240</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ Compliant</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
