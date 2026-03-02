"use client";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPass() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden">

      {/* Background Circle Left */}
      <div className="absolute bottom-[-120px] left-[-200px] w-[480px] h-[480px] bg-[#123473]/40 rounded-full animate-floating"></div>
      <div className="absolute bottom-[-200px] left-[-80px] w-[380px] h-[380px] bg-[#123473]/60 rounded-full animate-floating-slow"></div>

      {/* Background Circle Right */}
      <div className="absolute bottom-[-120px] right-[-200px] w-[480px] h-[480px] bg-[#123473]/40 rounded-full animate-floating"></div>
      <div className="absolute bottom-[-200px] right-[-80px] w-[380px] h-[380px] bg-[#123473]/60 rounded-full animate-floating-slow"></div>

      {/* Card Forgot Password */}
      <div className="relative z-10 w-11/12 max-w-sm bg-white rounded-xl shadow-xl px-8 py-10 animate-fadeInUp">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/LogoBNN.png"
            alt="Logo BNN"
            width={85}
            height={85}
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-800">
          Lupa Password
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1 mb-6">
          Masukkan NIP untuk melihat password
        </p>

        {/* NIP Input */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">NIP</label>
          <input
            type="text"
            placeholder="Masukkan NIP"
            className="w-full mt-1 px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-md 
                       placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#123473] transition-all"
          />
        </div>

        {/* Check Button */}
        <button
          className="w-full py-3 bg-[#123473] text-white rounded-md 
                     hover:bg-[#0f2e5f] hover:scale-[1.02] active:scale-[0.98] 
                     transition-all duration-200 shadow-md"
        >
          Check
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600 mt-5">
          <Link
            href="/"
            className="hover:underline hover:text-[#123473] transition"
          >
            Kembali ke halaman login
          </Link>
        </p>
      </div>
    </div>
  );
}
