"use client";

import { useState } from "react";
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
  EyeOff,
  ArrowRight,
  Cloud,
  Loader2,
  ArrowLeft,
  Truck
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type Role = "admin" | "student" | "supplier" | "ngo";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: { rememberMe: true, email: "", password: "" }
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Real-like delay but skips all validation checks as requested
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 relative">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541848756149-e3843fcbd926?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
        
        {/* Top Content area */}
        <div className="flex-1 flex flex-col pt-12 px-12 xl:px-16 w-full z-10 relative">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="text-green-600 bg-green-50 p-2.5 rounded-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">WasteWise <span className="text-green-600">AI</span></h1>
              <p className="text-[13px] text-gray-500 font-medium">Smart Food, Better Tomorrow</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-4 text-gray-900">
            Reduce Food Waste<br />
            Build a <span className="text-green-600">Sustainable</span><br />
            <span className="text-green-600">Tomorrow</span>
          </h2>
          
          <p className="text-gray-600 text-sm xl:text-base mb-8 max-w-md leading-relaxed font-medium">
            AI-powered mess management to predict, reduce, and reuse food for a healthier and happier community.
          </p>

          <div className="grid grid-cols-1 gap-5 max-w-md">
            <div className="flex items-start gap-4">
              <div className="bg-green-100/80 p-2.5 rounded-xl text-green-700">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-1">Smart Predictions</h3>
                <p className="text-[13px] text-gray-500 leading-tight">AI-based meal demand forecasting</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100/80 p-2.5 rounded-xl text-green-700">
                <Recycle className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-1">Reduce Waste</h3>
                <p className="text-[13px] text-gray-500 leading-tight">Track and minimize food waste</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-100/80 p-2.5 rounded-xl text-orange-600">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-1">Food Donation</h3>
                <p className="text-[13px] text-gray-500 leading-tight">Connect surplus food to NGOs</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100/80 p-2.5 rounded-xl text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-1">Better Community</h3>
                <p className="text-[13px] text-gray-500 leading-tight">Healthy students, greener planet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Green Stats Bar with Wavy SVG Top */}
        <div className="relative z-10 w-full mt-auto text-white">
          <svg className="w-full h-12 text-[#0f8b3c] fill-current" preserveAspectRatio="none" viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg">
             <path d="M0,0 C320,48 420,-16 720,16 C1020,48 1120,-16 1440,16 L1440,48 L0,48 Z" />
          </svg>
          <div className="bg-[#0f8b3c] pt-2 pb-8 px-12 xl:px-16 flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <Leaf className="w-7 h-7 text-white" />
              <div>
                <div className="text-xl font-extrabold leading-none tracking-tight">1,200+</div>
                <div className="text-[12px] text-green-100 font-medium mt-1">Meals Saved</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Cloud className="w-7 h-7 text-white" />
              <div>
                <div className="text-xl font-extrabold leading-none tracking-tight">850 kg</div>
                <div className="text-[12px] text-green-100 font-medium mt-1">CO₂ Reduced</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-7 h-7 text-white" />
              <div>
                <div className="text-xl font-extrabold leading-none tracking-tight">500+</div>
                <div className="text-[12px] text-green-100 font-medium mt-1">Happy Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Login) */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center relative bg-gray-50/50">
        
        {/* Back to Home Button */}
        <Link href="/" className="absolute top-8 right-8 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Login Card */}
        <div className="w-full max-w-[460px] p-8 lg:p-10">
          
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="text-green-600">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">WasteWise <span className="text-green-600">AI</span></h1>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide">Smart Food, Better Tomorrow</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Welcome Back</h2>
            <p className="text-sm text-gray-500 font-medium">Login to your account to continue</p>
          </div>

          {/* Role Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-50 p-1.5 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-lg transition-colors ${
                role === "admin" ? "bg-[#0f8b3c] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Mess Admin
            </button>
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-lg transition-colors ${
                role === "student" ? "bg-[#0f8b3c] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole("supplier")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-lg transition-colors ${
                role === "supplier" ? "bg-[#0f8b3c] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <Truck className="w-3.5 h-3.5" /> Supplier
            </button>
            <button
              type="button"
              onClick={() => setRole("ngo")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-lg transition-colors ${
                role === "ngo" ? "bg-[#0f8b3c] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" /> NGO
            </button>
          </div>

          <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 block">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input 
                  type="email" 
                  disabled={isLoading}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f8b3c]/20 focus:border-[#0f8b3c] transition-all placeholder:text-gray-400 shadow-sm"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-900">Password</label>
                <a href="#" className="text-xs font-bold text-[#0f8b3c] hover:text-green-700 disabled:opacity-50">Forgot Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f8b3c]/20 focus:border-[#0f8b3c] transition-all placeholder:text-gray-400 shadow-sm"
                  {...register("password")}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-1 pb-1">
              <input 
                type="checkbox" 
                id="rememberMe" 
                disabled={isLoading}
                className="w-4 h-4 rounded border-gray-300 text-[#0f8b3c] focus:ring-[#0f8b3c] disabled:opacity-50"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="ml-2.5 text-sm text-gray-700 font-semibold">Remember me</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#0f8b3c] hover:bg-green-700 disabled:bg-green-700/70 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
                </>
              ) : (
                <>
                  Login <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 text-gray-400 font-bold text-[10px] tracking-widest">OR</span>
            </div>
          </div>

          <button 
            type="button"
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-3 text-sm shadow-sm disabled:opacity-70"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-8 font-medium">
            Don't have an account? <a href="#" className="text-[#0f8b3c] font-bold hover:text-green-700">Contact your administrator</a>
          </p>

        </div>
      </div>
    </div>
  );
}
