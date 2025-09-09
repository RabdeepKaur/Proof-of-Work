/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */

function ProjectCard({ title, description, imageUrl, techStack, link }) {
  return (
   <motion.div
  initial={{ opacity: 0, y: 50 }} 
  whileInView={{ opacity: 1, y: 0 }}   
  transition={{
    delay: 0.1,
    ease: "easeOut",
    duration: 1
  }}
  viewport={{ once: true, amount: 0.3 }}
  className="bg-black/80 shadow-md rounded-lg p-6 mb-6 w-80 border-2 border-green-500  transform hover:scale-105 transition-transform duration-300"
>
      
      {/* Project Image */}
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg mb-4 w-full h-20 object-cover"
      />

      {/* Project Title */}
      <h2 className="text-xl text-shadow-gray-50 font-bold mb-2 truncate">
        {title}
      </h2>

      {/* Project Description */}
      <p className="text-white mb-3 text-sm overflow-hidden text-ellipsis line-clamp-3">
        {description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-amber-200 text-black text-xs font-medium px-2 py-1 rounded-full hover:bg-amber-900"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Project Link */}
      <div className="flex flex-row gap-4">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400 font-medium hover:underline"
      >
        Live 
      </a>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 font-medium hover:underline"
      >
        Github
      </a>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
