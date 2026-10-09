"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2,
  Calendar as CalendarIcon,
  ChevronDown,
  Plus,
  IndianRupee,
  RefreshCw,
  Sparkles,
  MoreHorizontal,
  Image as ImageIcon,
  FileText,
  Download,
  Heart,
  Check
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar,
  PieChart, Pie, Cell
} from 'recharts';
import Image from "next/image";

const trendData = [
  { name: 'Mon\n6 Oct', kg: 45, percent: 12 },
  { name: 'Tue\n7 Oct', kg: 55, percent: 14 },
  { name: 'Wed\n8 Oct', kg: 40, percent: 10 },
  { name: 'Thu\n9 Oct', kg: 65, percent: 17 },
  { name: 'Fri\n10 Oct', kg: 50, percent: 13 },
  { name: 'Sat\n11 Oct', kg: 42, percent: 11 },
  { name: 'Sun\n12 Oct', kg: 38, percent: 10 },
];

const typeData = [
  { name: 'Breakfast', value: 8, color: '#f59e0b' },
  { name: 'Lunch', value: 18, color: '#10b981' },
  { name: 'Dinner', value: 12, color: '#3b82f6' },
  { name: 'Snacks', value: 4, color: '#8b5cf6' },
];

export default function WasteTrackingPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Track food waste, identify patterns, and get AI suggestions to reduce waste.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 font-medium">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <span>Oct 9, 2026</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 font-medium">
            <span>This Week</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <Button variant="green" className="gap-2">
            <Plus className="w-4 h-4" /> Add Waste Record
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">42 kg</h3>
              <p className="text-gray-500 text-sm font-medium">Total Food Waste</p>
              <p className="text-green-600 text-xs font-semibold mt-1">↓ -28% from last week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <IndianRupee className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">₹2,100</h3>
              <p className="text-gray-500 text-sm font-medium">Estimated Cost Loss</p>
              <p className="text-green-600 text-xs font-semibold mt-1">↓ -32% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">12%</h3>
              <p className="text-gray-500 text-sm font-medium">Waste Percentage</p>
              <p className="text-green-600 text-xs font-semibold mt-1">↓ -5% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">85 meals</h3>
              <p className="text-gray-500 text-sm font-medium">Food Donated</p>
              <p className="text-green-600 text-xs font-semibold mt-1">↑ +40% from last week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Trend & Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Waste Trend */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
                <CardTitle className="text-base font-bold text-gray-900">Food Waste Trend</CardTitle>
                <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-gray-50">
                  <option>This Week</option>
                </select>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center gap-4 mb-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400"></span> Waste (kg)</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Waste %</div>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} tickFormatter={(val) => `${val}%`} />
                      <Tooltip cursor={{ fill: '#F3F4F6' }} />
                      <Bar yAxisId="left" dataKey="kg" fill="#fca5a5" radius={[4, 4, 0, 0]} barSize={20} />
                      <Line yAxisId="right" type="monotone" dataKey="percent" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Waste by Meal Type */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-base font-bold text-gray-900">Waste by Meal Type</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-center pt-4">
                <div className="h-48 w-1/2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold">42 kg</span>
                    <span className="text-xs text-gray-500">Total Waste</span>
                  </div>
                </div>
                <div className="w-1/2 pl-4 space-y-4">
                  {typeData.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-600 font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{item.value} kg</div>
                        <div className="text-[10px] text-gray-400">({Math.round((item.value/42)*100)}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Waste Details Table */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
              <CardTitle className="text-base font-bold text-gray-900">Daily Waste Details</CardTitle>
              <Button variant="link" className="text-xs text-green-600 p-0 h-auto font-medium">View All</Button>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500 font-medium bg-gray-50/50">
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Meal</th>
                    <th className="px-6 py-3 font-medium text-right">Prepared (kg)</th>
                    <th className="px-6 py-3 font-medium text-right">Served (kg)</th>
                    <th className="px-6 py-3 font-medium text-right text-red-600">Waste (kg)</th>
                    <th className="px-6 py-3 font-medium text-right">Waste %</th>
                    <th className="px-6 py-3 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-gray-600">6 Oct 2026</td>
                    <td className="px-6 py-3 font-medium">Breakfast</td>
                    <td className="px-6 py-3 text-right">40</td>
                    <td className="px-6 py-3 text-right">36</td>
                    <td className="px-6 py-3 text-right font-bold text-red-600">4</td>
                    <td className="px-6 py-3 text-right font-bold text-red-500">10%</td>
                    <td className="px-6 py-3 text-center text-gray-400"><button><MoreHorizontal className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-gray-600">6 Oct 2026</td>
                    <td className="px-6 py-3 font-medium">Lunch</td>
                    <td className="px-6 py-3 text-right">120</td>
                    <td className="px-6 py-3 text-right">100</td>
                    <td className="px-6 py-3 text-right font-bold text-red-600">20</td>
                    <td className="px-6 py-3 text-right font-bold text-red-500">17%</td>
                    <td className="px-6 py-3 text-center text-gray-400"><button><MoreHorizontal className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-gray-600">6 Oct 2026</td>
                    <td className="px-6 py-3 font-medium">Dinner</td>
                    <td className="px-6 py-3 text-right">80</td>
                    <td className="px-6 py-3 text-right">70</td>
                    <td className="px-6 py-3 text-right font-bold text-red-600">10</td>
                    <td className="px-6 py-3 text-right font-bold text-red-500">12%</td>
                    <td className="px-6 py-3 text-center text-gray-400"><button><MoreHorizontal className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-gray-600">7 Oct 2026</td>
                    <td className="px-6 py-3 font-medium">Breakfast</td>
                    <td className="px-6 py-3 text-right">38</td>
                    <td className="px-6 py-3 text-right">35</td>
                    <td className="px-6 py-3 text-right font-bold text-red-600">3</td>
                    <td className="px-6 py-3 text-right font-bold text-green-600">8%</td>
                    <td className="px-6 py-3 text-center text-gray-400"><button><MoreHorizontal className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-gray-600">7 Oct 2026</td>
                    <td className="px-6 py-3 font-medium">Lunch</td>
                    <td className="px-6 py-3 text-right">120</td>
                    <td className="px-6 py-3 text-right">105</td>
                    <td className="px-6 py-3 text-right font-bold text-red-600">15</td>
                    <td className="px-6 py-3 text-right font-bold text-red-500">13%</td>
                    <td className="px-6 py-3 text-center text-gray-400"><button><MoreHorizontal className="w-4 h-4 mx-auto" /></button></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* AI Recommendations Banner */}
          <Card className="border-green-200 shadow-sm bg-gradient-to-r from-green-50 to-green-100 overflow-hidden relative">
             <CardContent className="p-6 flex items-center justify-between">
               <div className="z-10">
                 <div className="flex items-center gap-2 mb-4">
                   <Sparkles className="w-5 h-5 text-green-600" />
                   <h3 className="font-bold text-green-900 text-lg">AI Recommendations</h3>
                 </div>
                 <ul className="space-y-3">
                   <li className="flex items-start gap-2 text-sm text-green-800 font-medium">
                     <Check className="w-5 h-5 text-green-600 shrink-0" /> Reduce rice preparation by 20% on Fridays.
                   </li>
                   <li className="flex items-start gap-2 text-sm text-green-800 font-medium">
                     <Check className="w-5 h-5 text-green-600 shrink-0" /> Use seasonal vegetables to reduce spoilage.
                   </li>
                   <li className="flex items-start gap-2 text-sm text-green-800 font-medium">
                     <Check className="w-5 h-5 text-green-600 shrink-0" /> Improve portion control for dinner meals.
                   </li>
                   <li className="flex items-start gap-2 text-sm text-green-800 font-medium">
                     <Check className="w-5 h-5 text-green-600 shrink-0" /> Consider donating surplus food on low attendance days.
                   </li>
                 </ul>
               </div>
               <div className="flex flex-col items-center gap-3 z-10 mr-10">
                 <Button variant="green" className="w-40 font-bold shadow-md">Generate Plan</Button>
                 <div className="bg-white px-3 py-2 rounded-lg rounded-tr-none text-xs font-semibold text-green-700 shadow-sm relative">
                   I can help you reduce food waste by up to 30%!
                   <div className="absolute top-0 -right-2 w-2 h-2 bg-white transform rotate-45"></div>
                 </div>
               </div>
               <div className="absolute right-0 bottom-0 text-[100px] leading-none opacity-20 transform translate-x-10 translate-y-10">
                 🤖
               </div>
             </CardContent>
          </Card>

        </div>

        {/* Right Col */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-6 shadow-sm border border-green-200">
            <h3 className="font-bold text-green-900 text-xl leading-tight mb-2">Reduce<br/>Food Waste<br/>For a Better<br/>Tomorrow</h3>
            <Button variant="green" className="mt-4 rounded-full w-10 h-10 p-0 shadow-md">
              <span className="text-xl">→</span>
            </Button>
          </div>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-600" /> AI Insights <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">Beta</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">💡</div>
                <p className="text-sm text-gray-700">Lunch waste was 35% higher on Friday due to lower student attendance.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">📅</div>
                <p className="text-sm text-gray-700">Waste is usually highest on Fridays.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">📈</div>
                <p className="text-sm text-gray-700">Rice and Vegetables contribute 60% of total waste.</p>
              </div>
              <div className="flex items-start gap-3 bg-yellow-50 p-2.5 rounded-lg border border-yellow-100">
                <div className="text-xl mt-0.5">🌟</div>
                <p className="text-sm font-semibold text-yellow-800">Suggestion: Reduce rice preparation by 20% on Fridays.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
              <CardTitle className="text-base font-bold text-gray-900">Top Wasted Items</CardTitle>
              <Button variant="link" className="text-xs text-green-600 p-0 h-auto font-medium">View All</Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <div className="flex items-center gap-2 font-medium"><span>🍚</span> Rice</div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">14 kg</span>
                    <span className="text-red-500 font-bold w-10 text-right">33%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <div className="flex items-center gap-2 font-medium"><span>🥦</span> Vegetables</div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">10 kg</span>
                    <span className="text-red-400 font-bold w-10 text-right">24%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <div className="flex items-center gap-2 font-medium"><span>🫓</span> Roti</div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">6 kg</span>
                    <span className="text-orange-500 font-bold w-10 text-right">14%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <div className="flex items-center gap-2 font-medium"><span>🥣</span> Dal</div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">4 kg</span>
                    <span className="text-yellow-500 font-bold w-10 text-right">10%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <div className="flex items-center gap-2 font-medium"><span>🍎</span> Fruits</div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">3 kg</span>
                    <span className="text-green-500 font-bold w-10 text-right">7%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
              <CardTitle className="text-base font-bold text-gray-900">Waste Image Records</CardTitle>
              <Button variant="link" className="text-xs text-green-600 p-0 h-auto font-medium">View All</Button>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-2 gap-3">
              <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8 opacity-50" /></div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 flex justify-between items-center text-[10px] text-white">
                  <span>6 Oct - Lunch</span>
                  <span className="font-bold">5 kg</span>
                </div>
              </div>
              <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8 opacity-50" /></div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 flex justify-between items-center text-[10px] text-white">
                  <span>6 Oct - Dinner</span>
                  <span className="font-bold">3 kg</span>
                </div>
              </div>
              <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8 opacity-50" /></div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 flex justify-between items-center text-[10px] text-white">
                  <span>5 Oct - Lunch</span>
                  <span className="font-bold">4 kg</span>
                </div>
              </div>
              <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8 opacity-50" /></div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 flex justify-between items-center text-[10px] text-white">
                  <span>5 Oct - Dinner</span>
                  <span className="font-bold">6 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button className="flex flex-col items-center justify-center p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
              <div className="bg-green-500 text-white p-1.5 rounded-full mb-2">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-green-800 text-center leading-tight">Add Waste Record</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="bg-blue-500 text-white p-1.5 rounded-full mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-blue-800 text-center leading-tight">View Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-100 transition-colors">
              <div className="bg-orange-500 text-white p-1.5 rounded-full mb-2">
                <Download className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-orange-800 text-center leading-tight">Export Data</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-colors">
              <div className="bg-purple-500 text-white p-1.5 rounded-full mb-2">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-purple-800 text-center leading-tight">Manage Donations</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
