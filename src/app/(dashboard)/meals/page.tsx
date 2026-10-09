"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon,
  ChevronDown,
  Plus,
  Sparkles,
  Search,
  Check,
  AlertTriangle,
  XCircle,
  Copy,
  Printer,
  FileText,
  Leaf
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const attendanceData = [
  { name: 'Mon', expected: 250, actual: 240 },
  { name: 'Tue', expected: 260, actual: 255 },
  { name: 'Wed', expected: 320, actual: 300 },
  { name: 'Thu', expected: 352, actual: 340 },
  { name: 'Fri', expected: 340, actual: 320 },
  { name: 'Sat', expected: 450, actual: 440 },
  { name: 'Sun', expected: 380, actual: 350 },
];

export default function MealManagementPage() {
  const [activeTab, setActiveTab] = useState('planner');
  const [selectedDate, setSelectedDate] = useState('Thu');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const defaultMenu = {
    breakfast: { name: "Poha + Tea + Banana", cals: 450, prep: 370 },
    lunch: { name: "Rice + Dal + Mix Sabzi + Roti", cals: 620, prep: 380 },
    dinner: { name: "Roti + Paneer Butter Masala + Salad", cals: 700, prep: 360 }
  };

  const aiGeneratedMenu = {
    breakfast: { name: "Oatmeal + Boiled Egg + Apple", cals: 380, prep: 365 },
    lunch: { name: "Brown Rice + Moong Dal + Palak Paneer", cals: 580, prep: 372 },
    dinner: { name: "Multigrain Roti + Mixed Veg Dal + Cucumber Salad", cals: 610, prep: 355 }
  };

  const currentMenu = isGenerated ? aiGeneratedMenu : defaultMenu;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meal Management</h1>
          <p className="text-sm text-gray-500 mt-1">Plan, manage and track daily meals with AI-based suggestions.</p>
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
            <Plus className="w-4 h-4" /> Add Menu
          </Button>
          <Link href="/ai-assistant">
            <Button variant="green-outline" className="gap-2 bg-white">
              <Sparkles className="w-4 h-4" /> AI Suggest Menu
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap bg-white rounded-xl border border-gray-100 p-1 gap-1 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('planner')}
          className={`whitespace-nowrap px-4 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'planner' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <span className="text-lg">🍴</span> Menu Planner
        </button>
        <button 
          onClick={() => setActiveTab('recipe')}
          className={`whitespace-nowrap px-4 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'recipe' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <span className="text-lg">✂️</span> Recipe & Ingredients
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`whitespace-nowrap px-4 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'history' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <span className="text-lg">⏱️</span> Meal History
        </button>
        <button 
          onClick={() => setActiveTab('nutrition')}
          className={`whitespace-nowrap px-4 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'nutrition' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <span className="text-lg">🤍</span> Nutrition Info
        </button>
        <button 
          onClick={() => setActiveTab('cost')}
          className={`whitespace-nowrap px-4 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'cost' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <span className="text-lg">📊</span> Cost Analysis
        </button>
      </div>

      {activeTab === 'planner' && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Dates & Menu & Ingredients) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Days selector */}
          <div className="flex gap-2 justify-between">
            {days.map((day, i) => (
              <button 
                key={day} 
                onClick={() => setSelectedDate(day)}
                className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl border transition-colors ${selectedDate === day ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'}`}
              >
                <span className={`text-xs font-semibold ${selectedDate === day ? 'text-green-100' : 'text-gray-400'}`}>{day}</span>
                <span className="text-base font-bold">{i + 6} Oct</span>
              </button>
            ))}
          </div>

          {/* AI Banner */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
             <div className="flex gap-4 items-center z-10">
               <div className="bg-green-600 text-white p-2 rounded-full">
                 <Sparkles className="w-5 h-5" />
               </div>
               <div>
                 <div className="flex items-center gap-2">
                   <h3 className="font-bold text-green-900">AI Menu Suggestion</h3>
                   <span className="bg-green-200 text-green-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Beta</span>
                 </div>
                 <p className="text-sm text-green-800 mt-0.5">Based on attendance prediction (352 students), here is an optimized menu.</p>
               </div>
             </div>
             <Button 
               variant={isGenerated ? "outline" : "green"} 
               className={`z-10 gap-2 ${isGenerated ? 'bg-white text-green-700 border-green-200' : ''}`}
               disabled={isGenerating}
               onClick={() => {
                 if (isGenerated) {
                    setIsGenerated(false);
                    return;
                 }
                 setIsGenerating(true);
                 setTimeout(() => {
                   setIsGenerating(false);
                   setIsGenerated(true);
                 }, 1500);
               }}
             >
                {isGenerating ? (
                  <><span className="animate-spin">⏳</span> Generating...</>
                ) : isGenerated ? (
                  <><Check className="w-4 h-4 text-green-600" /> AI Menu Applied</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate Menu</>
                )}
             </Button>
             <div className="absolute right-32 top-0 opacity-20">
               {/* Decorative image/icon */}
             </div>
          </div>

          {/* Today's Menu */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Today's Menu - Thursday, 9 Oct 2026</h2>
              <Button variant="outline" className="bg-white gap-2 text-green-600 border-green-200 hover:bg-green-50">
                <Plus className="w-4 h-4" /> Edit Menu
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Breakfast Card */}
              <Card className="border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">☀️</span>
                    <div>
                      <h3 className="font-bold text-sm">Breakfast</h3>
                      <p className="text-xs text-gray-400">7:30 AM - 9:30 AM</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="h-32 bg-yellow-50 w-full relative">
                  {/* Placeholder for food image */}
                  <div className="absolute inset-0 flex items-center justify-center text-yellow-600/20 text-5xl">🍲</div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-gray-800 mb-3">{currentMenu.breakfast.name}</p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 font-semibold"><span className="text-red-500 mr-1">🔥</span> {currentMenu.breakfast.cals} kcal</Badge>
                    <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-600 font-semibold"><span className="text-green-500 mr-1">🌿</span> High Fiber</Badge>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Expected Students</p>
                      <p className="font-bold text-gray-900">350</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Prepare Quantity</p>
                      <p className="font-bold text-green-600 text-lg leading-tight">{currentMenu.breakfast.prep}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lunch Card */}
              <Card className="border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌞</span>
                    <div>
                      <h3 className="font-bold text-sm">Lunch</h3>
                      <p className="text-xs text-gray-400">12:30 PM - 2:30 PM</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="h-32 bg-orange-50 w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center text-orange-600/20 text-5xl">🍛</div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-gray-800 mb-3">{currentMenu.lunch.name}</p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 font-semibold"><span className="text-red-500 mr-1">🔥</span> {currentMenu.lunch.cals} kcal</Badge>
                    <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-600 font-semibold"><span className="text-green-500 mr-1">⚖️</span> Balanced</Badge>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Expected Students</p>
                      <p className="font-bold text-gray-900">360</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Prepare Quantity</p>
                      <p className="font-bold text-green-600 text-lg leading-tight">{currentMenu.lunch.prep}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dinner Card */}
              <Card className="border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌙</span>
                    <div>
                      <h3 className="font-bold text-sm">Dinner</h3>
                      <p className="text-xs text-gray-400">7:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="h-32 bg-blue-50 w-full relative">
                   <div className="absolute inset-0 flex items-center justify-center text-blue-600/20 text-5xl">🥗</div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-gray-800 mb-3">{currentMenu.dinner.name}</p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 font-semibold"><span className="text-red-500 mr-1">🔥</span> {currentMenu.dinner.cals} kcal</Badge>
                    <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-600 font-semibold"><span className="text-green-500 mr-1">💪</span> High Protein</Badge>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Expected Students</p>
                      <p className="font-bold text-gray-900">345</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium">Prepare Quantity</p>
                      <p className="font-bold text-green-600 text-lg leading-tight">{currentMenu.dinner.prep}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Ingredients Required */}
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-gray-50">
              <CardTitle className="text-base font-bold text-gray-900">Ingredients Required (Auto Calculated)</CardTitle>
              <Button variant="outline" className="text-xs h-8">View Full List</Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-gray-500 font-medium">
                    <th className="px-6 py-3 font-medium">Ingredient</th>
                    <th className="px-6 py-3 font-medium">Total Required</th>
                    <th className="px-6 py-3 font-medium">In Stock</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 flex items-center gap-2"><span className="text-lg">🍚</span> Rice</td>
                    <td className="px-6 py-3">50 kg</td>
                    <td className="px-6 py-3 text-green-600 font-semibold">60 kg</td>
                    <td className="px-6 py-3"><div className="flex items-center gap-1.5 text-green-600 font-medium"><div className="w-2 h-2 rounded-full bg-green-500"></div> Enough</div></td>
                    <td className="px-6 py-3 text-gray-400">-</td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 flex items-center gap-2"><span className="text-lg">🌾</span> Wheat Flour</td>
                    <td className="px-6 py-3">30 kg</td>
                    <td className="px-6 py-3 text-yellow-600 font-semibold">25 kg</td>
                    <td className="px-6 py-3"><div className="flex items-center gap-1.5 text-yellow-600 font-medium"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Low Stock</div></td>
                    <td className="px-6 py-3"><Button variant="outline" size="sm" className="h-7 text-xs text-green-600 border-green-200 hover:bg-green-50">🛒 Order</Button></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 flex items-center gap-2"><span className="text-lg">🍅</span> Tomatoes</td>
                    <td className="px-6 py-3">12 kg</td>
                    <td className="px-6 py-3 text-red-600 font-semibold">5 kg</td>
                    <td className="px-6 py-3"><div className="flex items-center gap-1.5 text-red-600 font-medium"><div className="w-2 h-2 rounded-full bg-red-500"></div> Need to Reorder</div></td>
                    <td className="px-6 py-3"><Button variant="outline" size="sm" className="h-7 text-xs text-green-600 border-green-200 hover:bg-green-50">🛒 Order</Button></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-3 flex items-center gap-2"><span className="text-lg">🥛</span> Milk</td>
                    <td className="px-6 py-3">20 L</td>
                    <td className="px-6 py-3 text-yellow-600 font-semibold">18 L</td>
                    <td className="px-6 py-3"><div className="flex items-center gap-1.5 text-yellow-600 font-medium"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Low Stock</div></td>
                    <td className="px-6 py-3"><Button variant="outline" size="sm" className="h-7 text-xs text-green-600 border-green-200 hover:bg-green-50">🛒 Order</Button></td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-3 flex items-center gap-2"><span className="text-lg">🧀</span> Paneer</td>
                    <td className="px-6 py-3">10 kg</td>
                    <td className="px-6 py-3 text-yellow-600 font-semibold">8 kg</td>
                    <td className="px-6 py-3"><div className="flex items-center gap-1.5 text-yellow-600 font-medium"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Low Stock</div></td>
                    <td className="px-6 py-3"><Button variant="outline" size="sm" className="h-7 text-xs text-green-600 border-green-200 hover:bg-green-50">🛒 Order</Button></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

        </div>

        {/* Right Col */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Attendance Prediction */}
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50 px-4 py-4">
              <CardTitle className="text-base font-bold text-gray-900">Attendance Prediction</CardTitle>
              <Button variant="outline" className="text-xs h-7 px-2">View Details</Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex gap-4 items-end mb-6 mt-2">
                <h3 className="text-5xl font-bold text-gray-900">352</h3>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-gray-600">Students Expected Today</p>
                  <p className="text-green-600 text-xs font-bold mt-0.5 flex items-center gap-1"><span className="text-lg leading-none">↑</span> +8% from yesterday</p>
                </div>
              </div>
              <div className="h-40 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                    <Tooltip cursor={{ fill: '#f9fafb' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="expected" name="Expected" stroke="#16a34a" strokeWidth={2} dot={{ r: 3, fill: '#16a34a' }} />
                    <Line type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Allergy & Dietary Notes */}
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50 px-4 py-4">
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span className="text-red-500">🔔</span> Allergy & Dietary Notes
              </CardTitle>
              <Button variant="outline" className="text-xs h-7 px-2">View All</Button>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs border border-red-200">
                    <XCircle className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-gray-900">10 students</span>
                </div>
                <span className="text-gray-500">No Onion & Garlic</span>
                <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded font-medium">10 students</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs border border-orange-200">
                    🌾
                  </div>
                  <span className="font-medium text-gray-900">5 students</span>
                </div>
                <span className="text-gray-500">Gluten Free</span>
                <span className="bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded font-medium">5 students</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs border border-green-200">
                    <Leaf className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-gray-900">8 students</span>
                </div>
                <span className="text-gray-500">Vegan</span>
                <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded font-medium">8 students</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs border border-red-200">
                    🌶️
                  </div>
                  <span className="font-medium text-gray-900">12 students</span>
                </div>
                <span className="text-gray-500">Low Spice</span>
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded font-medium">12 students</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <button className="flex flex-col items-center justify-center p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
                <div className="bg-green-500 text-white p-1.5 rounded-full mb-2">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-green-800 text-center leading-tight">Add Menu Item</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="bg-blue-500 text-white p-1.5 rounded-full mb-2">
                  <Copy className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-blue-800 text-center leading-tight">Copy Previous Menu</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-100 transition-colors">
                <div className="bg-orange-500 text-white p-1.5 rounded-full mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-orange-800 text-center leading-tight">View Recipes</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="bg-purple-500 text-white p-1.5 rounded-full mb-2">
                  <Printer className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-purple-800 text-center leading-tight">Print Menu</span>
              </button>
            </div>
          </div>

        </div>
      </div>
      )}

      {activeTab === 'recipes' && (
        <div className="flex flex-col items-center justify-center h-64 bg-white border border-gray-100 rounded-xl">
          <span className="text-4xl mb-3">📖</span>
          <h2 className="text-lg font-bold text-gray-900">Recipe & Ingredients</h2>
          <p className="text-gray-500">Detailed ingredient breakdowns will appear here.</p>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="flex flex-col items-center justify-center h-64 bg-white border border-gray-100 rounded-xl">
          <span className="text-4xl mb-3">🕒</span>
          <h2 className="text-lg font-bold text-gray-900">Meal History</h2>
          <p className="text-gray-500">Past meal logs and student feedback will appear here.</p>
        </div>
      )}

      {activeTab === 'nutrition' && (
        <div className="flex flex-col items-center justify-center h-64 bg-white border border-gray-100 rounded-xl">
          <span className="text-4xl mb-3">🤍</span>
          <h2 className="text-lg font-bold text-gray-900">Nutrition Info</h2>
          <p className="text-gray-500">Advanced macronutrient and dietary analytics will appear here.</p>
        </div>
      )}

      {activeTab === 'cost' && (
        <div className="flex flex-col items-center justify-center h-64 bg-white border border-gray-100 rounded-xl">
          <span className="text-4xl mb-3">📊</span>
          <h2 className="text-lg font-bold text-gray-900">Cost Analysis</h2>
          <p className="text-gray-500">Detailed financial breakdown and predictive cost modeling will appear here.</p>
        </div>
      )}

    </div>
  );
}
