"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden">

      {/* Background Circle Left */}
      <div className="absolute bottom-[-120px] left-[-200px] w-[480px] h-[480px] bg-[#123473]/40 rounded-full animate-floating"></div>
      <div className="absolute bottom-[-200px] left-[-80px] w-[380px] h-[380px] bg-[#123473]/60 rounded-full animate-floating-slow"></div>

      {/* Background Circle Right */}
      <div className="absolute bottom-[-120px] right-[-200px] w-[480px] h-[480px] bg-[#123473]/40 rounded-full animate-floating"></div>
      <div className="absolute bottom-[-200px] right-[-80px] w-[380px] h-[380px] bg-[#123473]/60 rounded-full animate-floating-slow"></div>

      {/* Card Login */}
      <div className="relative z-10 w-11/12 max-w-sm bg-white rounded-xl shadow-xl px-8 py-10 animate-fadeInUp">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/public/LogoBNN.png"
            alt="Logo BNN"
            width={85}
            height={85}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
          Selamat Datang
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            className="w-full mt-1 px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-md 
                       placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#123473] transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="w-full mt-1 px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-md 
                       placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#123473] transition-all"
          />
        </div>

        {/* Options */}
        <div className="flex justify-between items-center mb-5">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            href="/forgotpass"
            className="text-sm text-gray-600 hover:underline hover:text-[#123473] transition"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <Link href="/dashboard">
        <button
          className="block w-full py-3 text-center bg-[#123473] text-white rounded-md 
             hover:bg-[#0f2e5f] hover:scale-[1.02] active:scale-[0.98] 
             transition-all duration-200 shadow-md"
        >
          Login to Dashboard
        </button>
        </Link>

        {/* Footer */}
        <p className="text-xs text-center mt-4 text-gray-500 leading-5">
          Dengan ini saya telah membaca{" "}
          <a
            href="https://simpeg.bnn.go.id/index.php/Policy/terms_and_condition"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#123473] underline hover:text-[#0f2e5f] transition"
          >
            Terms & Condition
          </a>{" "}
          dan{" "}
          <a
            href="https://simpeg.bnn.go.id/index.php/Policy/privacy_and_policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#123473] underline hover:text-[#0f2e5f] transition"
          >
            Privacy & Policy
          </a>{" "}
          ASK BNN
        </p>
      </div>
    </div>
  );
}
