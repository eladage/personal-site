import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// because like, why not?
export default function ConfettiWrapper({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Append the canvas to the document body when the component mounts
    const canvas = canvasRef.current;
    document.body.appendChild(canvas);

    return () => {
      // Remove the canvas from the document body when the component unmounts
      document.body.removeChild(canvas);
    };
  }, []);

  const handleClick = (event) => {
    const canvas = canvasRef.current;

    // Set canvas dimensions to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Get the click coordinates relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / (rect.right - rect.left);
    const y = (event.clientY - rect.top) / (rect.bottom - rect.top);

    // Configure and fire confetti
    confetti.create(canvas, { resize: true })({
      particleCount: 100,
      spread: 180,
      origin: { x, y },
    });
  };

  return (
    <div onClick={handleClick}>
      {children}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          zIndex: 100,
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      ></canvas>
    </div>
  );
}
