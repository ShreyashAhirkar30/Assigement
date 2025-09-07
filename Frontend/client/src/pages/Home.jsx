import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-lg p-16 w-full h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-8">Welcome to the virtual store</h1>
        <p className="text-xl text-gray-600 mb-10">Manage users, stores, and ratings with ease. Use the navigation bar to access different sections.</p>
        <a href="/login" className="inline-block bg-purple-600 text-white font-semibold py-3 px-10 rounded-lg shadow hover:bg-purple-700 transition text-lg">Login</a>
      </div>
    </div>
  );
}
