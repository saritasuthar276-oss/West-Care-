"use client";
import { useState, useRef, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles,
  Search,
  Check,
  Send,
  Paperclip,
  TrendingDown,
  TrendingUp,
  Target,
  Trash2,
  Utensils,
  Leaf,
  ChevronRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const attendanceData = [
  { name: 'Mon\n6 Oct', actual: 240, predicted: 250 },
  { name: 'Tue\n7 Oct', actual: 255, predicted: 260 },
  { name: 'Wed\n8 Oct', actual: 300, predicted: 320 },
  { name: 'Thu\n9 Oct', actual: 340, predicted: 352 },
  { name: 'Fri\n10 Oct', actual: 0, predicted: 368, isTomorrow: true },
  { name: 'Sat\n11 Oct', actual: 0, predicted: 350 },
  { name: 'Sun\n12 Oct', actual: 0, predicted: 380 },
];

export default function AIAssistantPage() {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text?: string, isWidget?: boolean}[]>([
    { role: 'user', text: 'How many students are expected tomorrow?' },
    { role: 'ai', isWidget: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponse = "I've analyzed the recent trends. It looks like you should prepare 10% less rice on Fridays, and increase the vegetable portions slightly based on recent consumption data. Do you want me to update the menu?";
      
      const lowerInput = userMessage.toLowerCase();
      if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        aiResponse = "Hello Naresh! How can I help you optimize your meal planning or reduce food waste today?";
      } else if (lowerInput.includes('menu') || lowerInput.includes('suggest')) {
        aiResponse = "Based on attendance predictions, I suggest: Breakfast (Oatmeal & Fruits), Lunch (Palak Paneer & Roti), and Dinner (Mixed Veg Dal). This balances nutrition and historical preference. Should I apply this to the planner?";
      } else if (lowerInput.includes('waste')) {
        aiResponse = "I noticed rice waste is up 12% this week. I recommend lowering the preparation quantity from 60kg to 52kg for the next 3 days to bring waste back under the 5% threshold.";
      } else if (lowerInput.includes('report') || lowerInput.includes('generate')) {
        aiResponse = "I am generating the weekly efficiency report now. You have saved ₹4,200 this week by optimizing dairy inventory! I will notify you when the full PDF is ready.";
      } else if (lowerInput.includes('inventory') || lowerInput.includes('stock')) {
        aiResponse = "You are running low on Tomatoes (5kg left, min level is 15kg). I have drafted a purchase order for 20kg from your primary supplier. Would you like me to send it?";
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiResponse 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#1a3628] rounded-2xl p-6 text-white flex justify-between items-center shadow-md relative overflow-hidden h-32">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-green-300 w-6 h-6" />
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <span className="bg-green-500/20 text-green-300 border border-green-500/30 text-xs px-2 py-0.5 rounded font-medium">Beta</span>
          </div>
          <p className="text-green-100 text-sm">Your smart companion for better food planning, less waste, and efficient management.</p>
        </div>
        <div className="hidden md:flex flex-col text-right relative z-10 text-green-100 italic">
          <span>" Ask anything</span>
          <span>Get insights</span>
          <span className="font-bold text-white">Take action "</span>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute right-1/3 bottom-0 text-[100px] leading-none opacity-20">🤖</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Col (Suggested Prompts) */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-green-600" /> Suggested Prompts
            </h3>
            <div className="space-y-2">
              <button onClick={() => handlePromptClick("How many students are expected tomorrow?")} className="w-full text-left p-4 bg-green-50 rounded-xl text-sm text-green-800 font-medium border border-green-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✨</span> How many students are expected tomorrow?
              </button>
              <button onClick={() => handlePromptClick("Which items are low in stock?")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> Which items are low in stock?
              </button>
              <button onClick={() => handlePromptClick("Suggest this week's menu")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> Suggest this week's menu
              </button>
              <button onClick={() => handlePromptClick("Show food waste report")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> Show food waste report
              </button>
              <button onClick={() => handlePromptClick("What can we donate today?")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> What can we donate today?
              </button>
              <button onClick={() => handlePromptClick("How much rice should we order?")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> How much rice should we order?
              </button>
              <button onClick={() => handlePromptClick("Show expiry items")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> Show expiry items
              </button>
              <button onClick={() => handlePromptClick("Give cost saving suggestions")} className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 font-medium border border-gray-100 transition-colors shadow-sm flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">💬</span> Give cost saving suggestions
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-6 text-center shadow-sm">
            <h3 className="font-bold text-green-900 text-lg mb-2 leading-tight">Less Food Waste<br/>Brighter Tomorrow</h3>
            <Button variant="green" className="mt-4 rounded-full w-10 h-10 p-0 shadow-md">
              <span className="text-xl">→</span>
            </Button>
          </div>
        </div>

        {/* Center Col (Chat Interface) */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm h-[800px]">
          
          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end mb-6">
                    <div className="flex items-end gap-2 max-w-[80%]">
                      <div className="flex flex-col items-end">
                        <div className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-br-none text-sm">
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                          <span>Just now</span>
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                         NS
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start mb-6">
                    <div className="flex items-start gap-3 max-w-[95%]">
                      <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 flex-shrink-0 flex items-center justify-center text-xl overflow-hidden mt-1">
                         🤖
                      </div>
                      <div className="flex flex-col items-start w-full">
                        <div className="bg-white border border-gray-100 shadow-sm text-gray-800 px-5 py-4 rounded-2xl rounded-tl-none text-sm w-full">
                          
                          {msg.isWidget ? (
                            <>
                              <p className="mb-4 text-gray-600">Based on historical attendance, current week trends, and upcoming events, here is the prediction for tomorrow <strong>(10 Oct 2026)</strong>:</p>
                              
                              <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                                  <div className="flex items-center gap-2 text-green-700 mb-1">
                                    <span className="text-lg">👥</span> <span className="font-bold text-xl">368</span>
                                  </div>
                                  <p className="text-xs text-gray-600 font-medium">Expected Students</p>
                                  <p className="text-[10px] text-green-600 font-bold mt-1">↑ +6% from today</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                                    <span className="text-lg">🍱</span> <span className="font-bold text-xl">350</span>
                                  </div>
                                  <p className="text-xs text-gray-600 font-medium">Recommended<br/>Meals to Prepare</p>
                                </div>
                                <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                                  <div className="flex items-center gap-2 text-orange-700 mb-1">
                                    <span className="text-lg">📦</span> <span className="font-bold text-xl">18</span>
                                  </div>
                                  <p className="text-xs text-gray-600 font-medium">Buffer Meals<br/>(5% extra)</p>
                                </div>
                              </div>

                              <div className="border border-gray-100 rounded-xl p-4 mb-4 bg-gray-50/50">
                                <h4 className="font-bold text-sm text-gray-800 mb-4">Attendance Prediction (This Week)</h4>
                                <div className="h-48 w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={5} />
                                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                                      <Tooltip cursor={{ fill: '#F3F4F6' }} />
                                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} />
                                      <Bar dataKey="actual" name="Actual" fill="#bfdbfe" radius={[4, 4, 0, 0]} barSize={15} />
                                      <Bar dataKey="predicted" name="Predicted" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={15}>
                                        {
                                          attendanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.isTomorrow ? '#86efac' : '#16a34a'} stroke={entry.isTomorrow ? '#16a34a' : 'none'} strokeWidth={entry.isTomorrow ? 1 : 0} strokeDasharray={entry.isTomorrow ? "3 3" : "0"} />
                                          ))
                                        }
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-xs border border-yellow-100">
                                <span className="text-yellow-600 mt-0.5">💡</span>
                                <div>
                                  <strong>Insight:</strong> Tomorrow is a working day with no holiday. Based on last 4 weeks, attendance is usually higher on Fridays.
                                </div>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-700">{msg.text}</p>
                          )}

                        </div>
                        
                        {msg.isWidget && (
                          <div className="flex flex-wrap gap-2 mt-4 ml-2">
                            <button onClick={() => handlePromptClick("Show tomorrow's menu suggestion")} className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5 rounded-full font-medium transition-colors shadow-sm">
                              Show tomorrow's menu suggestion
                            </button>
                            <button onClick={() => handlePromptClick("Generate ingredient list")} className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5 rounded-full font-medium transition-colors shadow-sm">
                              Generate ingredient list
                            </button>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-6">
                <div className="flex items-start gap-3 max-w-[95%]">
                  <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 flex-shrink-0 flex items-center justify-center text-xl overflow-hidden mt-1">
                     🤖
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm text-gray-800 px-5 py-4 rounded-2xl rounded-tl-none text-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2 shadow-inner">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask a follow-up question..." 
                className="flex-1 bg-transparent py-3 px-2 text-sm focus:outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-green-600 text-white rounded-lg m-1 hover:bg-green-700 transition-colors shadow-sm disabled:bg-gray-300"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col (Quick Insights & Alerts) */}
        <div className="lg:col-span-1 space-y-6">
          
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-600" /> Quick Insights
              </CardTitle>
              <Button variant="outline" className="text-xs h-7 px-2">Refresh</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-4">
              <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-green-100 text-green-600 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></div>
                </div>
                <h4 className="font-bold text-gray-900 text-lg">42 kg</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">Food Waste (Today)</p>
                <p className="text-[10px] text-green-600 font-bold mt-1 flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" /> -15%</p>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-orange-100 text-orange-600 p-1.5 rounded-lg"><Utensils className="w-4 h-4" /></div>
                </div>
                <h4 className="font-bold text-gray-900 text-lg">360</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">Meals Served</p>
                <p className="text-[10px] text-orange-600 font-bold mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +8%</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><Leaf className="w-4 h-4" /></div>
                </div>
                <h4 className="font-bold text-gray-900 text-lg">₹900</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">Estimated Cost Saved (Weekly)</p>
                <p className="text-[10px] text-blue-600 font-bold mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +22%</p>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg"><Target className="w-4 h-4" /></div>
                </div>
                <h4 className="font-bold text-gray-900 text-lg">92%</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">Attendance Accuracy</p>
                <p className="text-[10px] text-purple-600 font-bold mt-1 flex items-center">Target: 95%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="text-orange-500">☀️</span> AI Menu Suggestion (Tomorrow)
              </CardTitle>
              <Button variant="link" className="text-xs text-green-600 p-0 h-auto font-medium">View All</Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center text-lg">🍳</div>
                <div className="flex-1">
                  <h5 className="font-bold text-xs text-gray-900">Breakfast</h5>
                  <p className="text-[10px] text-gray-500 truncate">Poha + Tea + Banana</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center text-lg">🍛</div>
                <div className="flex-1">
                  <h5 className="font-bold text-xs text-gray-900">Lunch</h5>
                  <p className="text-[10px] text-gray-500 truncate">Rice + Dal + Mix Veg + Roti</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-lg">🥗</div>
                <div className="flex-1">
                  <h5 className="font-bold text-xs text-gray-900">Dinner</h5>
                  <p className="text-[10px] text-gray-500 truncate">Roti + Paneer Sabzi + Salad</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-2 border-b border-gray-50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="text-red-500">⚠️</span> Low Stock Alert
              </CardTitle>
              <Button variant="link" className="text-xs text-green-600 p-0 h-auto font-medium">View All</Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-lg">🍅</span> <span className="font-medium text-gray-800">Tomatoes</span></div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">5 kg</span>
                  <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded font-semibold w-16 text-center">2 days left</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-lg">🌾</span> <span className="font-medium text-gray-800">Wheat Flour</span></div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">25 kg</span>
                  <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded font-semibold w-16 text-center">Low Stock</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><span className="text-lg">🥛</span> <span className="font-medium text-gray-800">Milk</span></div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">18 L</span>
                  <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded font-semibold w-16 text-center">Low Stock</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}


