/* eslint-disable no-unused-vars */ import { motion } from "framer-motion"; /* eslint-enable no-unused-vars */
// Motion Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // delay between letters
    },
  },
};

const letter = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};
function Navbar() {

  return (
    <nav className="bg-black px-6 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo / Brand */}
       <motion.div
        className="absolute top-0 left-0 w-full flex justify-center py-4 z-50 hover:text-green-500"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {["HOME","  "," ","BLOG"," "," ","PROJECTS"," "," ","CONTACT"].map(
          (char, index) => (
            <motion.span
              key={index}
              variants={letter}
              className="text-2xl font-bold px-1 text-white hover:text-green-500"
            >
              {char}
            </motion.span>
          )
        )}
      </motion.div>

      </div>
    </nav>
  );
}

export default Navbar;
