
import React, { useState, useEffect } from 'react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    const newBeam = {
      id: Date.now(),
      startX: mousePos.x,
      startY: mousePos.y,
      progress: 0,
    };
    setBeams((prev) => [...prev, newBeam]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBeams((prev) =>
        prev
          .map((b) => ({ ...b, progress: b.progress + 0.02 }))
          .filter((b) => b.progress < 1)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const getCoreCenter = () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const getBeamStyle = (beam) => {
    const core = getCoreCenter();
    const dx = core.x - beam.startX;
    const dy = core.y - beam.startY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const length = Math.sqrt(dx * dx + dy * dy);
    return {
      position: 'absolute',
      left: beam.startX,
      top: beam.startY , // center the beam vertically (height is 10px)
      width: length * beam.progress,
      height: 15,
      background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(0,255,255,0.5), rgba(0,255,255,0.2))',
      transformOrigin: '0 50%',
      transform: `rotate(${angle}deg)`,
      opacity: 1.5 - beam.progress,
      zIndex: 100,
      borderRadius: 50,
      filter: 'blur(0.8px) brightness(400)',
      boxShadow: `
          0 0 600px rgba(0, 255, 255, 0.8),
          0 0 12px rgba(0, 255, 255, 0.6),
          0 0 20px rgba(0, 255, 255, 0.9)
        `,
      pointerEvents: 'none',
    };

  };


  return (
    <div style={{  }}>
      <div
        onClick={handleClick}
        style={{
          height: '100vh',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Twinkling Grid Background */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
            opacity: 1,
            zIndex: 0,
            animation: 'twinkle 5s linear infinite',
          }}
        />

        {/* Beams */}
        {beams.map((beam) => (
          <div key={beam.id} style={getBeamStyle(beam)} />
        ))}

        {/* Cursor Distortion Follower */}
        <div
          style={{
            position: 'absolute',
            width: 250,
            height: 250,
            left: mousePos.x - 125,
            top: mousePos.y - 125,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.08), transparent 60%)',
            filter: 'blur(30px) contrast(2)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Solid Core Circle */}
        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            borderRadius: '50%',
            backgroundColor: 'black',
            zIndex: 5,
          }}
        />

        {/* Vertical Glow Ring */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'conic-gradient(from 90deg, rgb(255,40,0), rgb(255,80,0), white)',
            zIndex: 3,
            filter: 'blur(60px) brightness(2.8)',
            transform: 'rotate(180deg)',
          }}
        />

        {/* Horizontal Glowing Ring */}
        <div
          style={{
            position: 'absolute',
            width: 1000,
            height: 300,
            borderRadius: '50%',
            background: 'linear-gradient(90deg, white, rgb(255,90,0), rgb(255,40,0), white)',
            top: `calc(50% - 100px)`,
            left: `calc(50% - 500px)`,
            transform: 'rotateX(70deg)',
            zIndex: 6,
            filter: 'blur(50px) brightness(2.5)',
            opacity: 0.95,
          }}
        />

        {/* Inner Core Glow */}
        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, white, rgba(255,80,0,0.8), transparent)',
            zIndex: 4,
            filter: 'blur(50px) brightness(2.5)',
            pointerEvents: 'none',
          }}
        />

        {/* Thin Orange Glow Ring */}
        <div
          style={{
            position: 'absolute',
            width: 630,
            height: 620,
            borderRadius: '50%',
            clipPath: 'circle(50% at center)',
            border: '6px solid rgba(255,60,0,0.9)',
            filter: 'blur(8px) brightness(2.3)',
            zIndex: 3,
            opacity: 0.88,
          }}
        />

        {/* Outer White Horizontal Ring */}
        <div
          style={{
            position: 'absolute',
            width: 1100,
            height: 320,
            borderRadius: '50%',
            border: '2px solid white',
            top: `calc(50% - 160px)`,
            left: `calc(50% - 550px)`,
            transform: 'rotateX(70deg)',
            zIndex: 2,
            filter: 'blur(10px) brightness(2)',
            opacity: 0.6,
          }}
        />

        {/* Half Vertical White Ring */}
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            borderRadius: '50%',
            border: '3px solid white',
            zIndex: 2,
            filter: 'blur(10px) brightness(2)',
            transform: 'rotateX(0deg)',
            opacity: 0.5,
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)',
          }}
        />

        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.08 }
            50% { opacity: 0.15 }
          }
        `}</style>
      </div>
    </div>
  );
}
