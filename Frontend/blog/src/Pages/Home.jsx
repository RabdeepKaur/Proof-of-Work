import { useState, useEffect } from "react";
import Navbar from "../Componenets/Navabr"; 

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */
import Typewriter from 'typewriter-effect';

{/*motion*/}
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // delay between letters
    },
  },
};

const letter = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 30, // controls speed
      damping: 4,    // lower = more bounce
      bounce: 0.1,    // extra bounciness
    },
  },
};

function Home() {
  const [activeLight, setActiveLight] = useState({ x: 0, y: 0 });
  const text1="This is my digital diary it contains everything I’ve learned while building my products and projects."
  const text2="From the system design to how I came up with the ideas. All the errors I encountered, every detail you need to know about the product."

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
      <motion.div 
      className="absolute top-0 left-0 w-full  "
     initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9, ease: "easeOut" }}>
        <Navbar />
      </motion.div>

      {/* Grid Background */}
      <motion.div 
      className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:40px_40px] "
 initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.2, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9, ease: [0.6, -0.05, 0.01, 0.99] }}>
      </motion.div>
      
      {/* Blinking Light */}
      <div
        className="absolute w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#0f0] animate-blink"
        style={{
          top: `${activeLight.y}px`,
          left: `${activeLight.x}px`,
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-6xl">
  <Typewriter
    options={{
      strings: ["Proof of work"],
      autoStart: true,
      loop: true,
      delay: 40,       // typing speed
      deleteSpeed: 10, // deleting speed
    }}
  />

      <motion.div
        className="flex flex-wrap justify-center text-xl font-bold text-white p-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {text1.split("").map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

 <motion.div
        className="flex flex-wrap justify-center text-xl text-white p-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {text2.split("").map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
    </div>
  );
}

export default Home;
