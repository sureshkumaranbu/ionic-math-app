import React, { useRef } from 'react';

const Scribble = () => {
  const canvasRef = useRef(null);

  const handleDraw = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleDraw}
      onTouchMove={handleDraw}
      width={500}
      height={500}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Scribble;
