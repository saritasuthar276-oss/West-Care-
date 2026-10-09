"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  AlertTriangle,
  Search,
  Filter,
  Plus,
  ArrowRight,
  MoreHorizontal,
  Bot,
  ChevronRight,
  ShoppingCart,
  ListTodo,
  Download,
  Users,
  CalendarIcon,
  Sparkles
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';

const categoryData = [
  { name: 'Vegetables', value: 8, color: '#16a34a' },
  { name: 'Grains & Cereals', value: 5, color: '#2563eb' },
  { name: 'Dairy & Eggs', value: 4, color: '#eab308' },
  { name: 'Pulses', value: 3, color: '#38bdf8' },
  { name: 'Spices', value: 2, color: '#a855f7' },
  { name: 'Others', value: 2, color: '#6366f1' },
];

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState('All Items');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory & Stock</h1>
          <p className="text-sm text-gray-500 mt-1">Manage ingredients, track stock levels, get AI alerts, and reduce food waste.</p>
        </div>
        <Button variant="green" className="gap-2">
          <Plus className="w-4 h-4" /> Add New Item
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-gray-500 text-sm font-medium">Total Items</p>
              <p className="text-green-600 text-xs font-semibold mt-1">+2 new this week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">18</h3>
              <p className="text-gray-500 text-sm font-medium">Items in Stock</p>
              <p className="text-blue-600 text-xs font-semibold mt-1">Normal</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">4</h3>
              <p className="text-gray-500 text-sm font-medium">Low Stock Items</p>
              <p className="text-orange-600 text-xs font-semibold mt-1">Need attention</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">2</h3>
              <p className="text-gray-500 text-sm font-medium">Expiring Soon</p>
              <p className="text-red-600 text-xs font-semibold mt-1">Within 3 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Tabs */}
      <div className="flex bg-white rounded-xl border border-gray-100 p-1 gap-1 overflow-x-auto">
        {[
          { name: 'All Items', icon: '🔠' },
          { name: 'Vegetables', icon: '🥬' },
          { name: 'Grains & Cereals', icon: '🌾' },
          { name: 'Dairy & Eggs', icon: '🥚' },
          { name: 'Pulses', icon: '🫘' },
          { name: 'Spices', icon: '🌶️' },
          { name: 'Others', icon: '📦' }
        ].map(cat => (
          <button 
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`whitespace-nowrap px-4 rounded-lg py-2 text-sm font-medium flex items-center gap-2 transition-colors ${activeCategory === cat.name ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <span className="text-lg">{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Content (Table + Charts) */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Stock Table */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-gray-50">
              <CardTitle className="text-base font-bold text-gray-900">Current Stock Overview</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <div className="relative flex-1 sm:w-48">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search items..." className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
                <select className="border border-gray-200 bg-gray-50 rounded-lg px-2 py-1.5 text-sm">
                  <option>Category</option>
                </select>
                <select className="border border-gray-200 bg-gray-50 rounded-lg px-2 py-1.5 text-sm">
                  <option>Status</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500 font-medium">
                    <th className="px-6 py-3 font-medium w-12"><input type="checkbox" className="rounded text-green-600" /></th>
                    <th className="px-6 py-3 font-medium">Item</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium text-right">Current Stock</th>
                    <th className="px-6 py-3 font-medium">Unit</th>
                    <th className="px-6 py-3 font-medium text-right">Min. Level</th>
                    <th className="px-6 py-3 font-medium text-center">Status</th>
                    <th className="px-6 py-3 font-medium">Expiry Date</th>
                    <th className="px-6 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🍚</span> Rice</td>
                    <td className="px-6 py-3 text-gray-500">Grains</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">60</td>
                    <td className="px-6 py-3 text-gray-500">kg</td>
                    <td className="px-6 py-3 text-right text-gray-500">20</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock</span>
                    </td>
                    <td className="px-6 py-3 text-red-500 font-medium">15 Nov 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>
                  
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🌾</span> Wheat Flour</td>
                    <td className="px-6 py-3 text-gray-500">Grains</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">25</td>
                    <td className="px-6 py-3 text-gray-500">kg</td>
                    <td className="px-6 py-3 text-right text-gray-500">20</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Low Stock</span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-medium">20 Oct 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>
                  
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🍅</span> Tomatoes</td>
                    <td className="px-6 py-3 text-gray-500">Vegetables</td>
                    <td className="px-6 py-3 text-right font-bold text-red-600">5</td>
                    <td className="px-6 py-3 text-gray-500">kg</td>
                    <td className="px-6 py-3 text-right text-gray-500">15</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Low Stock</span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-medium">11 Oct 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>

                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🧅</span> Onions</td>
                    <td className="px-6 py-3 text-gray-500">Vegetables</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">40</td>
                    <td className="px-6 py-3 text-gray-500">kg</td>
                    <td className="px-6 py-3 text-right text-gray-500">20</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock</span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-medium">25 Oct 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>

                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🥛</span> Milk</td>
                    <td className="px-6 py-3 text-gray-500">Dairy</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">18</td>
                    <td className="px-6 py-3 text-gray-500">L</td>
                    <td className="px-6 py-3 text-right text-gray-500">20</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Low Stock</span>
                    </td>
                    <td className="px-6 py-3 text-red-500 font-medium">10 Oct 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>

                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🧀</span> Paneer</td>
                    <td className="px-6 py-3 text-gray-500">Dairy</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">8</td>
                    <td className="px-6 py-3 text-gray-500">kg</td>
                    <td className="px-6 py-3 text-right text-gray-500">10</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Low Stock</span>
                    </td>
                    <td className="px-6 py-3 text-red-500 font-medium">12 Oct 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>
                  
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🥔</span> Potatoes</td>
                    <td className="px-6 py-3 text-gray-500">Vegetables</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">50</td>
                    <td className="px-6 py-3 text-gray-500">kg</td>
                    <td className="px-6 py-3 text-right text-gray-500">25</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock</span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-medium">28 Oct 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>

                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-3"><input type="checkbox" className="rounded text-green-600" /></td>
                    <td className="px-6 py-3 flex items-center gap-2 font-medium"><span className="text-lg">🛢️</span> Cooking Oil</td>
                    <td className="px-6 py-3 text-gray-500">Others</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">12</td>
                    <td className="px-6 py-3 text-gray-500">L</td>
                    <td className="px-6 py-3 text-right text-gray-500">10</td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock</span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-medium">18 Dec 2026</td>
                    <td className="px-6 py-3 text-gray-400"><button><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Bottom Grid for Charts & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-base font-bold text-gray-900">Stock Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-center pt-4">
                <div className="h-48 w-1/2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold">24</span>
                    <span className="text-xs text-gray-500">Total Items</span>
                  </div>
                </div>
                <div className="w-1/2 pl-4 space-y-3">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-600 truncate max-w-[90px]">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.value} ({Math.round((item.value/24)*100)}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
                <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" /> Expiry Timeline
                </CardTitle>
                <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-gray-50">
                  <option>Next 30 Days</option>
                </select>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-50">
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xl">🥛</div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Milk</h4>
                        <p className="text-xs text-red-500 font-medium">Expires in 1 day</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded font-medium">10 Oct 2026</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xl">🍅</div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Tomatoes</h4>
                        <p className="text-xs text-red-500 font-medium">Expires in 2 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded font-medium">11 Oct 2026</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xl">🧀</div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Paneer</h4>
                        <p className="text-xs text-orange-500 font-medium">Expires in 3 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded font-medium">12 Oct 2026</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xl">🧅</div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Onions</h4>
                        <p className="text-xs text-gray-500 font-medium">Expires in 15 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">25 Oct 2026</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Right Col (AI Assistant & Quick Actions) */}
        <div className="xl:col-span-1 space-y-6">
          
          <Card className="border-none shadow-sm bg-green-50/30">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-green-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600" /> AI Inventory Assistant
                </CardTitle>
                <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">Beta</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-white p-3 rounded-xl flex gap-3 shadow-sm border border-green-100">
                <div className="bg-green-100 text-green-700 p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-700 leading-snug">Ask anything about your stock, expiry, or suggestions.</p>
              </div>

              <div className="space-y-2">
                <button className="w-full flex justify-between items-center text-left px-4 py-3 bg-white hover:bg-green-50 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                  <span className="flex items-center gap-2"><span className="text-green-600">🌿</span> Which items are low in stock?</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex justify-between items-center text-left px-4 py-3 bg-white hover:bg-green-50 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                  <span className="flex items-center gap-2"><span className="text-green-600">🌿</span> Show items expiring this week</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex justify-between items-center text-left px-4 py-3 bg-white hover:bg-green-50 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                  <span className="flex items-center gap-2"><span className="text-green-600">🌿</span> Suggest items to reorder</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex justify-between items-center text-left px-4 py-3 bg-white hover:bg-green-50 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                  <span className="flex items-center gap-2"><span className="text-green-600">🌿</span> How much rice should we order for next week?</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="relative mt-2">
                <input 
                  type="text" 
                  placeholder="Type your question..." 
                  className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-green-600 text-white p-1.5 rounded-lg hover:bg-green-700 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-50">
               <CardTitle className="text-base font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-4">
              <button className="flex flex-col items-center justify-center p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
                <div className="bg-green-600 text-white p-1.5 rounded-full mb-2">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-green-800 text-center">Add New Item</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="bg-blue-600 text-white p-1.5 rounded-full mb-2">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-blue-800 text-center">Update Stock</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-100 transition-colors">
                <div className="bg-orange-500 text-white p-1.5 rounded-full mb-2">
                  <ListTodo className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-orange-800 text-center leading-tight">Generate Order List</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors">
                <div className="bg-red-500 text-white p-1.5 rounded-full mb-2">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-red-800 text-center leading-tight">View Expiry Items</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="bg-purple-600 text-white p-1.5 rounded-full mb-2">
                  <Download className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-purple-800 text-center">Download Report</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="bg-blue-500 text-white p-1.5 rounded-full mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-blue-800 text-center">Manage Suppliers</span>
              </button>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}
