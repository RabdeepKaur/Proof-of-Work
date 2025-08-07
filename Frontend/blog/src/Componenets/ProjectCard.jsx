function ProjectCard({ title, description, imageUrl, techStack, link }) {
  return (
    <div className="bg-black shadow-md rounded-lg p-6 mb-6 w-80 border-2 border-green-500 overflow-hidden">
      
      {/* Project Image */}
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg mb-4 w-full h-20 object-cover"
      />

      {/* Project Title */}
      <h2 className="text-xl text-green-400 font-bold mb-2 truncate">
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
            className="bg-green-800 text-white text-xs font-medium px-2 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Project Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400 font-medium hover:underline"
      >
        View Project
      </a>
    </div>
  );
}

export default ProjectCard;
