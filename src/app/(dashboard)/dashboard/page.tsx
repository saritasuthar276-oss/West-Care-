"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Utensils, 
  TrendingDown, 
  Leaf,
  Plus,
  RefreshCw,
  FileText,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Link from 'next/link';
import { useState } from 'react';

const demandData = [
  { name: 'Mon', predicted: 310, actual: 0 },
  { name: 'Tue', predicted: 360, actual: 0 },
  { name: 'Wed', predicted: 400, actual: 340 },
  { name: 'Thu', predicted: 410, actual: 370 },
  { name: 'Fri', predicted: 440, actual: 410 },
  { name: 'Sat', predicted: 370, actual: 330 },
  { name: 'Sun', predicted: 340, actual: 390 },
];

const wasteData = [
  { name: 'Rice', value: 12, color: '#22c55e' },
  { name: 'Vegetables', value: 8, color: '#eab308' },
  { name: 'Roti', value: 6, color: '#f97316' },
  { name: 'Dal', value: 5, color: '#3b82f6' },
  { name: 'Others', value: 11, color: '#8b5cf6' },
];

export default function DashboardPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      if (!res.ok) throw new Error('API error');
      const reader = res.body?.getReader();
      if (!reader) return;

      setMessages(prev => [...prev, { role: 'ai', content: '' }]);
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content += text;
          return newMsgs;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, an error occurred.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-8 text-white flex justify-between items-center shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            Good Morning, Sarita! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-green-100 text-lg">Let's make better food decisions today.</p>
        </div>
        <div className="hidden md:flex text-right relative z-10">
          <div className="text-2xl font-semibold leading-snug italic opacity-90">
            " Plan Smart<br/>Serve Right<br/>Waste Less "
          </div>
        </div>
        {/* Abstract background shapes could go here */}
        <div className="absolute top-0 right-1/2 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-xl text-green-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">420</h3>
              </div>
              <p className="text-gray-500 text-sm font-medium whitespace-nowrap truncate">Total Students</p>
              <p className="text-green-600 text-xs font-semibold mt-1 whitespace-nowrap truncate">+12% from last week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
              <Utensils className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">352</h3>
              </div>
              <p className="text-gray-500 text-sm font-medium whitespace-nowrap truncate">Expected Meals Today</p>
              <p className="text-blue-600 text-xs font-semibold mt-1 whitespace-nowrap truncate">85% attendance</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-xl text-green-600">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">18 kg</h3>
              </div>
              <p className="text-gray-500 text-sm font-medium whitespace-nowrap truncate">Food Waste (Today)</p>
              <p className="text-green-600 text-xs font-semibold mt-1 whitespace-nowrap truncate">-42% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-orange-100 p-4 rounded-xl text-orange-600">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">₹900</h3>
              </div>
              <p className="text-gray-500 text-sm font-medium whitespace-nowrap truncate">Estimated Cost Saved</p>
              <p className="text-gray-400 text-xs mt-1 whitespace-nowrap truncate">This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Charts & Menu) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meal Demand Prediction Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">Meal Demand Prediction (This Week)</CardTitle>
                <select className="text-xs border rounded px-2 py-1 bg-gray-50">
                  <option>This Week</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                      <RechartsTooltip cursor={{ fill: '#F3F4F6' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="predicted" name="Predicted Meals" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="actual" name="Actual Meals" fill="#bfdbfe" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Food Waste Overview Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">Food Waste Overview</CardTitle>
                <select className="text-xs border rounded px-2 py-1 bg-gray-50">
                  <option>This Week</option>
                </select>
              </CardHeader>
              <CardContent className="flex flex-row items-center">
                <div className="h-48 w-1/2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {wasteData.map((entry, index) => (
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
                <div className="w-1/2 pl-4 space-y-3">
                  {wasteData.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value} kg</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today's Menu */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">Today's Menu & Expected Quantity</CardTitle>
                <Button variant="link" className="text-green-600 p-0 h-auto font-medium" asChild>
                  <Link href="/meals">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">🍳</div>
                    <div>
                      <h4 className="font-semibold text-sm">Breakfast</h4>
                      <p className="text-xs text-gray-500">Poha + Tea + Banana</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Expected</p>
                      <p className="font-bold text-sm">350</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Prepare</p>
                      <p className="font-bold text-sm text-green-600">370</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">🍛</div>
                    <div>
                      <h4 className="font-semibold text-sm">Lunch</h4>
                      <p className="text-xs text-gray-500">Rice + Dal + Sabzi + Roti</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Expected</p>
                      <p className="font-bold text-sm">360</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Prepare</p>
                      <p className="font-bold text-sm text-green-600">380</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">🥗</div>
                    <div>
                      <h4 className="font-semibold text-sm">Dinner</h4>
                      <p className="text-xs text-gray-500">Roti + Paneer Sabzi + Salad</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Expected</p>
                      <p className="font-bold text-sm">340</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Prepare</p>
                      <p className="font-bold text-sm text-green-600">360</p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Inventory Status */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">Inventory Status</CardTitle>
                <Button variant="link" className="text-green-600 p-0 h-auto font-medium" asChild>
                  <Link href="/inventory">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-5 mt-2">
                
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <div className="flex items-center gap-2 font-medium"><span>🌾</span> Rice</div>
                    <div className="flex gap-4">
                      <span className="font-bold">50 kg</span>
                      <span className="text-orange-500 text-xs font-semibold w-16 text-right">5 days left</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <div className="flex items-center gap-2 font-medium"><span>🍞</span> Wheat Flour</div>
                    <div className="flex gap-4">
                      <span className="font-bold">30 kg</span>
                      <span className="text-gray-500 text-xs font-semibold w-16 text-right">8 days left</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <div className="flex items-center gap-2 font-medium"><span>🍅</span> Tomatoes</div>
                    <div className="flex gap-4">
                      <span className="font-bold">12 kg</span>
                      <span className="text-red-500 text-xs font-semibold w-16 text-right">2 days left</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <div className="flex items-center gap-2 font-medium"><span>🥛</span> Milk</div>
                    <div className="flex gap-4">
                      <span className="font-bold">20 L</span>
                      <span className="text-red-500 text-xs font-semibold w-16 text-right">1 day left</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">Recent Activities</CardTitle>
                <Button variant="link" className="text-green-600 p-0 h-auto font-medium" asChild>
                  <Link href="/reports">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                <div className="flex justify-between items-start text-sm">
                  <div className="flex gap-3">
                    <div className="text-green-600 mt-0.5">📅</div>
                    <div>
                      <p className="font-medium text-gray-800">350 meal bookings received for today</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">2 mins ago</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <div className="flex gap-3">
                    <div className="text-red-500 mt-0.5">⚠️</div>
                    <div>
                      <p className="font-medium text-gray-800">Tomatoes stock is running low (2 days left)</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">15 mins ago</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <div className="flex gap-3">
                    <div className="text-orange-500 mt-0.5">🎁</div>
                    <div>
                      <p className="font-medium text-gray-800">New food donation request from NGO</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">1 hour ago</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <div className="flex gap-3">
                    <div className="text-green-600 mt-0.5">✅</div>
                    <div>
                      <p className="font-medium text-gray-800">Waste reduced by 30% compared to last week</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
               <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <Link href="/meals" className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="bg-green-600 text-white p-2 rounded-lg mb-2">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-green-800 text-center">Add Menu</span>
                </Link>
                <Link href="/inventory" className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="bg-blue-600 text-white p-2 rounded-lg mb-2">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-blue-800 text-center">Update Stock</span>
                </Link>
                <Link href="/reports" className="flex flex-col items-center justify-center p-3 bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="bg-orange-500 text-white p-2 rounded-lg mb-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-orange-800 text-center">View Reports</span>
                </Link>
                <Link href="/bookings" className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
                  <div className="bg-purple-600 text-white p-2 rounded-lg mb-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-purple-800 text-center text-balance">Manage Students</span>
                </Link>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Right Column (AI Assistant) */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-sm h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="text-green-600">✨</div>
                <CardTitle className="text-lg font-bold text-gray-800">AI Assistant</CardTitle>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </button>
            </CardHeader>
            <CardContent className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
              
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm leading-relaxed flex gap-3 shadow-sm border border-green-100">
                  <div className="bg-green-200 text-green-700 p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <p>Ask me anything about meals, stock, waste, or suggestions...</p>
                </div>

                {messages.length === 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Try asking:</h4>
                    <div className="space-y-2">
                      <button onClick={() => setInput("How many students are expected tomorrow?")} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                        "How many students are expected tomorrow?"
                      </button>
                      <button onClick={() => setInput("Show this week's food waste report")} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                        "Show this week's food waste report"
                      </button>
                      <button onClick={() => setInput("Suggest tomorrow's menu")} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                        "Suggest tomorrow's menu"
                      </button>
                      <button onClick={() => setInput("Which items are low in stock?")} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 border border-gray-100 transition-colors shadow-sm">
                        "Which items are low in stock?"
                      </button>
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`p-4 rounded-xl text-sm leading-relaxed flex gap-3 shadow-sm ${msg.role === 'user' ? 'bg-gray-100 text-gray-800 ml-8' : 'bg-green-50 text-green-800 border border-green-100 mr-8'}`}>
                    {msg.role === 'ai' && (
                      <div className="bg-green-200 text-green-700 p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                ))}
                {isLoading && (
                   <div className="p-4 rounded-xl text-sm leading-relaxed flex gap-3 shadow-sm bg-green-50 text-green-800 border border-green-100 mr-8">
                     <div className="bg-green-200 text-green-700 p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 animate-pulse">
                        <MessageSquare className="w-4 h-4" />
                     </div>
                     <div className="flex items-center">Thinking...</div>
                   </div>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <form onSubmit={handleChatSubmit} className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..." 
                    className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                    disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </form>
                <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                  <span>✦</span> Powered by Gemini AI
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
