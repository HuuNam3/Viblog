"use client"
import { NextPage } from 'next';
import Link from 'next/link';
const Home: NextPage = () => {
  return (
    <div>
      <main className="w-full h-screen flex justify-center items-center flex-col">
        <h1 className="text-3xl text-blue-700">Factbook</h1>
        <Link href="/story" className="text-xl hover:text-blue-300 hover:opacity-80">View Story</Link>
      </main>
    </div>
  );
};

export default Home;