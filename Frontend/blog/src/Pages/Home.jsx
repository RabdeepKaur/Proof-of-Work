import { useState, useEffect } from "react";
import Navbar from "../Componenets/Navabr"
/* eslint-disable no-unused-vars */ import { motion } from "framer-motion"; /* eslint-enable no-unused-vars */
import Typewriter from "typewriter-effect";



function Home() {
  const [activeLight, setActiveLight] = useState({ x: 0, y: 0 });
  const text1 =
    "This is my digital diary it contains everything I’ve learned while building my products and projects.";
  const text2 =
    "From the system design to how I came up with the ideas. All the errors I encountered, every detail you need to know about the product.";

  useEffect(() => {
    const interval = setInterval(() => {
      const newX = Math.floor(Math.random() * 10) * 40;
      const newY = Math.floor(Math.random() * 10) * 40;
      setActiveLight({ x: newX, y: newY });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      {/* Navbar with staggered text animation */}
     <Navbar/>

      {/* Grid Background */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:40px_40px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 0.9, ease: [0.6, -0.05, 0.01, 0.99] }}
      />

      {/* Blinking Light */}
      <div
        className="absolute w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#0f0] animate-blink"
        style={{
          top: `${activeLight.y}px`,
          left: `${activeLight.x}px`,
        }}
      ></div>

      {/* Hero Content with old navbar effect */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Typewriter Heading */}
        <div className="text-4xl sm:text-6xl font-bold mb-6">
          <Typewriter
            options={{
              strings: ["Proof of work"],
              autoStart: true,
              loop: true,
              delay: 40,
              deleteSpeed: 10,
            }}
          />
        </div>

        {/* Main Text */}
        <div className="text-lg sm:text-xl font-bold text-white p-3 max-w-4xl">
          {text1}
        </div>
        <div className="text-lg sm:text-xl text-white p-3 max-w-4xl">
          {text2}
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
