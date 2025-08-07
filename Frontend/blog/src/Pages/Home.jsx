import { useState, useEffect } from "react";
import Navbar from "../Componenets/Navabr"; 
import { LinkedinIcon } from "lucide-react";

function Home() {
  const [activeLight, setActiveLight] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newX = Math.floor(Math.random() * 10) * 40;
      const newY = Math.floor(Math.random() * 10) * 40;
      setActiveLight({ x: newX, y: newY });
    }, 1000); // move every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full  ">
        <Navbar />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      
      {/* Blinking Light */}
      <div
        className="absolute w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#0f0] animate-blink"
        style={{
          top: `${activeLight.y}px`,
          left: `${activeLight.x}px`,
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center ">
        <h1 className="text-5xl font-bold mb-4">Proof of work </h1>
        <p className="text-xl text-white mt-4 px-20">This is my digital diary it contains everything I’ve learned while building my products and projects. </p>
        <p className="text-xl text-white mt-4 px-20">From the system design to  how I came up with the ideas. All the  errors I encountered, every detail you need to know about the product</p>
      </div>
      <span className="bg-white"><LinkedinIcon className="w-6 h-6 text-blue-500" /></span>
    </div>
  );
}

export default Home;
