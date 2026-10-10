"use client";

import { useRouter } from "next/navigation";
import { 
  Leaf, 
  BarChart2, 
  Recycle, 
  HeartHandshake, 
  Users, 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight,
  ArrowLeft,
  Cloud
} from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50">
      
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-white relative">
        
        {/* Content Container */}
        <div className="flex-1 p-8 xl:p-12 z-10 flex flex-col justify-center max-w-2xl mx-auto w-full">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="text-green-600">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">WasteWise <span className="text-green-600">AI</span></h1>
              <p className="text-[9px] text-gray-500 font-medium">Smart Food, Better Tomorrow</p>
            </div>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            Reduce Food Waste<br />
            Build a <span className="text-green-600">Sustainable<br />Tomorrow</span>
          </h2>
          
          <p className="text-gray-600 text-sm xl:text-base mb-6 max-w-md">
            AI-powered mess management to predict, reduce, and reuse food for a healthier and happier community.
          </p>

          <div className="grid grid-cols-1 gap-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="bg-green-50 p-2.5 rounded-lg text-green-600">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Smart Predictions</h3>
                <p className="text-xs text-gray-500">AI-based meal demand forecasting</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-50 p-2.5 rounded-lg text-green-600">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Reduce Waste</h3>
                <p className="text-xs text-gray-500">Track and minimize food waste</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-orange-50 p-2.5 rounded-lg text-orange-500">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Food Donation</h3>
                <p className="text-xs text-gray-500">Connect surplus food to NGOs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg text-blue-500">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Better Community</h3>
                <p className="text-xs text-gray-500">Healthy students, greener planet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Image/Background overlay */}
        <div className="absolute right-0 top-[15%] w-2/5 h-1/2 opacity-20 pointer-events-none rounded-l-3xl overflow-hidden">
          <div className="w-full h-full bg-cover bg-center bg-gray-200" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543353071-c737445ce5f4?q=80&w=2070&auto=format&fit=crop')" }}></div>
        </div>

        {/* Bottom Green Stats Bar */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 py-5 px-8 text-white shrink-0" style={{ borderTopRightRadius: '80px' }}>
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              <Leaf className="w-6 h-6 opacity-80" />
              <div>
                <div className="text-xl font-bold leading-tight">1,200+</div>
                <div className="text-[11px] text-green-100">Meals Saved</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Cloud className="w-6 h-6 opacity-80" />
              <div>
                <div className="text-xl font-bold leading-tight">850 kg</div>
                <div className="text-[11px] text-green-100">CO₂ Reduced</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="w-6 h-6 opacity-80" />
              <div>
                <div className="text-xl font-bold leading-tight">500+</div>
                <div className="text-[11px] text-green-100">Happy Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Login) */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 relative">
        
        <div className="absolute top-6 right-6">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center w-full">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 w-full max-w-[420px]">
            
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="text-green-600">
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">WasteWise <span className="text-green-600">AI</span></h1>
                  <p className="text-[8px] text-gray-500 font-medium">Smart Food, Better Tomorrow</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Back</h2>
              <p className="text-xs text-gray-500">Login to your account to continue</p>
            </div>

            {/* Role Tabs */}
            <div className="flex gap-1 mb-5 bg-gray-50 p-1 rounded-lg border border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white text-[10px] sm:text-xs font-semibold py-2 rounded shadow-sm">
                <Users className="w-3 h-3" /> Mess Admin
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-gray-600 text-[10px] sm:text-xs font-semibold py-2 rounded hover:bg-gray-100 transition-colors">
                <Users className="w-3 h-3" /> Student
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-gray-600 text-[10px] sm:text-xs font-semibold py-2 rounded hover:bg-gray-100 transition-colors">
                <HeartHandshake className="w-3 h-3" /> Supplier
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-gray-600 text-[10px] sm:text-xs font-semibold py-2 rounded hover:bg-gray-100 transition-colors">
                <Leaf className="w-3 h-3" /> NGO
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-900">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-900">Password</label>
                  <a href="#" className="text-[10px] font-semibold text-green-600 hover:text-green-700">Forgot Password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-400"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-1 pb-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-3.5 h-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  defaultChecked
                />
                <label htmlFor="remember" className="ml-2 text-xs text-gray-600 font-medium">Remember me</label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Login <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400 font-medium">OR</span>
              </div>
            </div>

            <button className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-[10px] text-gray-500 mt-5 font-medium">
              Don't have an account? <a href="#" className="text-green-600 font-semibold hover:text-green-700">Contact your administrator</a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
