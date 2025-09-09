function Card({ title, description, imageUrl }) {
  return (
    <div className="bg-black shadow-md rounded-lg p-6 mb-6 w-80 border-2 border-green-500 overflow-hidden  transform hover:scale-105 transition-transform duration-300">
      {/* Project Image */}
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg mb-4 w-full h-48 object-cover"
      />

      {/* Project Title */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {/* Project Description */}
      <p className="text-white  mb-3">{description}</p>

    </div>
  );
}

export default Card;
