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
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 relative bg-white">
        
        {/* Background Image on the right side of the left panel */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[80%] bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/food_bg.jpg')" }}
        />
        {/* Gradient fading to white on the left */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/30 to-transparent" />
        
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col min-h-full w-full">
          
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-14 py-2 xl:py-8 max-w-2xl">
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 xl:mb-6">
              <div className="text-green-600 bg-green-50 p-2 xl:p-2.5 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900">WasteWise <span className="text-[#0f8b3c]">AI</span></h1>
                <p className="text-[12px] text-gray-500 font-medium">Smart Food, Better Tomorrow</p>
              </div>
            </div>

            <h2 className="text-2xl xl:text-4xl font-extrabold leading-[1.15] mb-2 xl:mb-3 text-gray-900">
              Reduce Food Waste<br />
              Build a <span className="text-[#0f8b3c]">Sustainable</span><br />
              <span className="text-[#0f8b3c]">Tomorrow</span>
            </h2>
            
            <p className="text-gray-600 text-[12px] xl:text-[14px] mb-4 xl:mb-6 max-w-md leading-relaxed font-medium">
              AI-powered mess management to predict, reduce, and reuse food for a healthier and happier community.
            </p>

            <div className="grid grid-cols-1 gap-2 xl:gap-4 max-w-md">
              <div className="flex items-start gap-3">
                <div className="bg-green-100/80 p-2.5 rounded-xl text-green-700">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">Smart Predictions</h3>
                  <p className="text-[12px] text-gray-500 leading-tight">AI-based meal demand forecasting</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100/80 p-2.5 rounded-xl text-green-700">
                  <Recycle className="w-4 h-4" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">Reduce Waste</h3>
                  <p className="text-[12px] text-gray-500 leading-tight">Track and minimize food waste</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100/80 p-2.5 rounded-xl text-orange-600">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">Food Donation</h3>
                  <p className="text-[12px] text-gray-500 leading-tight">Connect surplus food to NGOs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100/80 p-2.5 rounded-xl text-blue-600">
                  <Users className="w-4 h-4" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">Better Community</h3>
                  <p className="text-[12px] text-gray-500 leading-tight">Healthy students, greener planet</p>
                </div>
              </div>
            </div>

          </div>

          {/* Wavy Stats Bar */}
          <div className="w-full mt-auto">
            <svg viewBox="0 0 1440 120" className="w-full h-[40px] xl:h-[70px] text-[#0f8b3c] fill-current -mb-1" preserveAspectRatio="none">
              <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"></path>
            </svg>
            <div className="bg-[#0f8b3c] px-10 xl:px-14 pb-4 xl:pb-8 pt-0 xl:pt-1 flex justify-between items-center w-full text-white">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 xl:w-6 h-5 xl:h-6 text-white" />
                <div>
                  <div className="text-lg font-extrabold leading-none tracking-tight">1,200+</div>
                  <div className="text-[11px] text-green-100 font-medium mt-1">Meals Saved</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6 text-white" />
                <div>
                  <div className="text-lg font-extrabold leading-none tracking-tight">850 kg</div>
                  <div className="text-[11px] text-green-100 font-medium mt-1">CO₂ Reduced</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-white" />
                <div>
                  <div className="text-lg font-extrabold leading-none tracking-tight">500+</div>
                  <div className="text-[11px] text-green-100 font-medium mt-1">Happy Students</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Panel (Login) */}
      <div className="w-full lg:w-1/2 h-full bg-[#f8f9fc] flex items-center justify-center p-4 xl:p-10 relative">
        
        {/* Back to Home Link */}
        <div className="absolute top-6 right-8 lg:top-8 lg:right-10 z-10 hidden lg:block">
          <Link href="/" className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="w-full max-w-[460px]">
          <div className="bg-white rounded-[24px] py-4 px-6 sm:px-8 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full flex flex-col justify-center">
            
            <div className="flex justify-center mb-4 xl:mb-6">
              <div className="flex items-center gap-3">
                <div className="text-[#139c43]">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C17 5.24 14.76 3 12 3C9.24 3 7 5.24 7 8C7 10.76 9.24 13 12 13C14.76 13 17 10.76 17 8Z"/><path d="M12 15C8.13 15 5 18.13 5 22H19C19 18.13 15.87 15 12 15Z"/></svg>
                </div>
                <div>
                  <h1 className="text-[18px] xl:text-[22px] font-extrabold tracking-tight text-gray-900 leading-[1.1]">WasteWise <span className="text-[#139c43]">AI</span></h1>
                  <p className="text-[9px] xl:text-[11px] text-gray-500 font-medium tracking-wide">Smart Food, Better Tomorrow</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-3 xl:mb-8">
              <h2 className="text-lg xl:text-[22px] font-extrabold text-gray-900 mb-0.5 xl:mb-1.5">Welcome Back</h2>
              <p className="text-[11px] xl:text-sm text-gray-500 font-medium">Login to your account to continue</p>
            </div>

            {/* Role Tabs */}
            <div className="flex gap-2 mb-4 xl:mb-6">
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 flex flex-row items-center justify-center gap-1.5 xl:gap-2 text-[9px] xl:text-[11px] font-bold py-2 px-1 rounded-xl transition-all ${
                  role === "admin" ? "bg-[#139c43] text-white shadow-md shadow-green-600/20" : "bg-[#f4f5f7] text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Mess Admin</span><span className="sm:hidden">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 flex flex-row items-center justify-center gap-1.5 xl:gap-2 text-[9px] xl:text-[11px] font-bold py-2 px-1 rounded-xl transition-all ${
                  role === "student" ? "bg-[#139c43] text-white shadow-md shadow-green-600/20" : "bg-[#f4f5f7] text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" /> <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("supplier")}
                className={`flex-1 flex flex-row items-center justify-center gap-1.5 xl:gap-2 text-[9px] xl:text-[11px] font-bold py-2 px-1 rounded-xl transition-all ${
                  role === "supplier" ? "bg-[#139c43] text-white shadow-md shadow-green-600/20" : "bg-[#f4f5f7] text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Truck className="w-3.5 h-3.5" /> <span>Supplier</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("ngo")}
                className={`flex-1 flex flex-row items-center justify-center gap-1.5 xl:gap-2 text-[9px] xl:text-[11px] font-bold py-2 px-1 rounded-xl transition-all ${
                  role === "ngo" ? "bg-[#139c43] text-white shadow-md shadow-green-600/20" : "bg-[#f4f5f7] text-gray-600 hover:bg-gray-200"
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" /> <span>NGO</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-3 xl:space-y-5">
              
              <div className="space-y-1 xl:space-y-1.5">
                <label className="text-[10px] xl:text-[11px] font-bold text-gray-900 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input 
                    type="email" 
                    disabled={isLoading}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-2 xl:py-3 bg-white border border-gray-200 rounded-xl text-[10px] xl:text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-[#139c43]/20 focus:border-[#139c43] transition-all placeholder:text-gray-400"
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="space-y-1 xl:space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] xl:text-[11px] font-bold text-gray-900">Password</label>
                  <a href="#" className="text-[10px] xl:text-[11px] font-bold text-[#139c43] hover:text-green-700 disabled:opacity-50">Forgot Password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    disabled={isLoading}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2 xl:py-3 bg-white border border-gray-200 rounded-xl text-[10px] xl:text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-[#139c43]/20 focus:border-[#139c43] transition-all placeholder:text-gray-400"
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

              <div className="flex items-center pt-0.5 pb-0.5 xl:pt-1 xl:pb-1">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  disabled={isLoading}
                  className="w-3.5 h-3.5 xl:w-4 xl:h-4 rounded border-gray-300 text-[#0f8b3c] focus:ring-[#0f8b3c] disabled:opacity-50"
                  {...register("rememberMe")}
                />
                <label htmlFor="rememberMe" className="ml-2 text-[11px] xl:text-sm text-gray-700 font-semibold">Remember me</label>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#139c43] hover:bg-green-700 disabled:bg-green-700/70 text-white font-bold py-2 xl:py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-[12px] xl:text-[14px]"
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

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-gray-400 font-bold text-[10px] tracking-widest">OR</span>
              </div>
            </div>

            <button 
              type="button"
              disabled={isLoading}
              className="w-full bg-[#f4f5f7] hover:bg-gray-200 border border-transparent text-gray-800 font-bold py-2 xl:py-3 rounded-xl transition-colors flex items-center justify-center gap-3 text-[12px] xl:text-[14px] shadow-sm disabled:opacity-70"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-[10px] xl:text-xs text-gray-500 mt-3 xl:mt-6 font-medium">
              Don't have an account? <a href="#" className="text-[#0f8b3c] font-bold hover:text-green-700">Contact your administrator</a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
