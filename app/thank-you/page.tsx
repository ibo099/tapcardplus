"use client";

import React, { useEffect, useRef } from "react";
import LogoSvg from "@/components/LogoSvg";

export default function ThankYouPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let ripples = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function addRipple(x, y) {
      ripples.push({ x, y, radius: 0, alpha: 0.3 });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.forEach((ripple, i) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(110, 53, 233, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ripple.radius += 1.5;
        ripple.alpha -= 0.002;
        if (ripple.alpha <= 0) ripples.splice(i, 1);
      });
      animationFrameId = requestAnimationFrame(draw);
    }

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        addRipple(x, y);
      }, i * 400);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <LogoSvg />
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900 animate-fadeIn">You're on the list!</h1>
      <p className="mt-4 text-slate-600 max-w-md animate-fadeIn">Thanks for joining the TapCard Plus waitlist. We’ll keep you posted with launch updates and give you first access to your new digital business card.</p>
      <p className="mt-2 text-sm text-slate-500 animate-fadeIn">Keep an eye on your inbox for exclusive updates and early access invites.</p>
      <a href="/" className="mt-6 inline-flex items-center rounded-full px-6 py-3 bg-gradient-to-r from-[#6E35E9] to-[#34C0FE] text-white font-semibold shadow hover:shadow-md animate-fadeIn">Back to Home</a>
    </div>
  );
}