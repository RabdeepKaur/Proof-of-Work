import React, { useState, useEffect } from "react";

function CatCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const moveHandler = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div className="relative w-screen h-screen cursor-none overflow-hidden">
      {/* Your page content here */}
      <h1 className="text-center mt-20 text-3xl text-white">
        Move your mouse 🐱
      </h1>

      {/* Cat cursor */}
      <img
        src="" // Replace with your cat image path
        alt="cat cursor"
        className="pointer-events-none fixed w-12 h-12 z-50"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

export default CatCursor;
