"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import LogoSvg from "@/components/LogoSvg";
import LogoSvgWhite from "@/components/LogoSvgWhite";

const ACTION_URL = "https://formspree.io/f/xkgzkjor";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav />
      <Hero />
      <Marquee />
      <WhySection />
      <PanelFeature />
      <HowItWorks />
      <TeamsCta />
      <Testimonials />
      <SiteFooter />
    </div>
  );
}

// NAV
function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/70">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2" aria-label="TapCard Plus logo">
          <LogoSvg />
          <span className="sr-only">TapCard Plus</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#features" className="hover:text-slate-900">home</a>
          <a href="#why" className="hover:text-slate-900">about us</a>
          <a href="#how" className="hover:text-slate-900">contact</a>
          <a href="#services" className="hover:text-slate-900">services</a>
        </nav>
        <a href="#waitlist" className="inline-flex items-center rounded-full px-4 py-2 bg-slate-900 text-white text-sm font-semibold shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900/30">Sign Up</a>
      </div>
    </header>
  );
}

// HERO
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="h-[480px] md:h-[560px] bg-gradient-to-br from-white to-[rgba(110,53,233,0.12)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Networking shouldn’t be this hard.
          </h1>
          <p className="mt-4 text-slate-600 max-w-prose">
            Paper cards get lost. Details change. TapCard Plus makes connecting effortless — one tap, one link, always up‑to‑date.
          </p>

          <div className="mt-6 flex flex-wrap gap-3" id="waitlist">
            <CtaButtons />
          </div>

          <p className="mt-4 text-xs text-slate-500 max-w-prose">
            We use emails only to notify you about launch and early access. No spam, unsubscribe anytime.
          </p>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <InteractiveCard />
        </div>
      </div>
    </section>
  );
}

function CtaButtons() {
  return (
    <div className="w-full max-w-md">
      <WaitlistForm />
      <div className="mt-4 flex gap-3">
        <a href="#customize" className="inline-flex items-center rounded-full px-4 py-2 bg-[#6E35E9] text-white text-sm font-semibold shadow hover:shadow-md">Customize yours</a>
        <a href="#features" className="inline-flex items-center rounded-full px-4 py-2 bg-white border border-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-50">Learn more</a>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(ACTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, name, source: "tapcardplus_waitlist" })
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => { window.location.href = "/thank-you"; }, 1200);
      } else {
        throw new Error("Network");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 bg-white/80 rounded-2xl p-2 shadow ring-1 ring-slate-200">
      <label className="sr-only" htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6E35E9]"
      />
      <button
        type="submit"
        className="inline-flex justify-center items-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#6E35E9] to-[#34C0FE] shadow hover:shadow-md"
      >
        {status === "loading" ? "Joining…" : status === "success" ? "Joined!" : "Join the Waitlist"}
      </button>
      {status === "error" && (
        <p className="col-span-full text-red-500 text-xs mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

// INTERACTIVE CARD
function InteractiveCard() {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateY = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateX.set((0.5 - py) * 14);
      rotateY.set((px - 0.5) * 18);
    }

    function reset() {
      rotateX.set(0); rotateY.set(0);
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [rotateX, rotateY]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      translateY.set((y % 200) / 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [translateY]);

  return (
    <motion.div ref={ref} style={{ perspective: 1200 }} className="w-[320px] sm:w-[380px] md:w-[420px]">
      <motion.div style={{ rotateX, rotateY, y: translateY }} transition={{ type: "spring", stiffness: 140, damping: 14 }} className="rounded-3xl shadow-xl ring-1 ring-slate-200 overflow-hidden bg-[#6E35E9]">
        <img src="/Card.png" alt="TapCard sample" className="w-full h-auto block" />
        <div className="hidden w-full aspect-[1.6/1] md:aspect-[1.7/1] p-6 text-white md:flex flex-col justify-between">
          <div className="flex items-center gap-2"><LogoSvgWhite /></div>
          <div className="self-end w-2/3 h-2/3 rounded-[2.5rem] bg-gradient-to-tr from-[#34C0FE] to-transparent/0 opacity-70" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// MARQUEE
function Marquee() {
  return (
    <div className="bg-[#6E35E9] text-white">
      <div className="mx-auto max-w-6xl px-4 py-2 text-xs tracking-widest uppercase opacity-90">
        BUY NOW  |  10% OFF  |  BUY NOW  |  10% OFF  |  BUY NOW  |  10% OFF
      </div>
    </div>
  );
}

// WHY (pain-led)
function WhySection() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
            Networking shouldn’t be this hard.
          </h2>
          <p className="mt-3 text-slate-600">
            Paper cards get lost. Contact info changes. And you never know if someone actually saves your details. TapCard Plus makes connecting effortless — one tap, one link, always up‑to‑date.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#6E35E9] to-[#7c4cf0] text-white rounded-3xl p-8 shadow-md">
          <div className="grid sm:grid-cols-2 gap-6">
            <Feature icon="📱" title="Works on all Devices" text="Tap or scan your Tapcard on any iPhone or Android—no app required." />
            <Feature icon="⚡" title="Update in Real‑Time" text="Change your details once, and everyone sees the latest instantly." />
            <Feature icon="🌱" title="Eco‑Friendly" text="No more printing costs or waste — go digital and go green." />
            <Feature icon="📊" title="Smart Analytics" text="See when people view and interact with your profile." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl bg:white/10 backdrop-blur p-5 border border-white/15 bg-white/10">
      <div className="text-2xl" aria-hidden>{icon}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-white/90">{text}</p>
    </div>
  );
}

// PANEL FEATURE
function PanelFeature() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">
      <div className="rounded-[2rem] bg-gradient-to-r from-[#34C0FE]/15 via-transparent to-[#6E35E9]/15 p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="aspect-[4/3] rounded-3xl bg-[#6E35E9] flex items-center justify-center text-white font-semibold shadow-inner">
          PHONE ANIMATION
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold">Everything You Need, <span className="text-[#6E35E9]">All in One Card</span></h3>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>• Unlimited links, rich profile, and vCard download.</li>
            <li>• One‑tap share via NFC or QR—no typing required.</li>
            <li>• Optional Wallet passes for faster saves.</li>
            <li>• EU‑hosted analytics to respect privacy.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// HOW IT WORKS
function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="text-2xl md:text-3xl font-extrabold">How Tapcard Works <span className="text-slate-500 text-lg">(Easy as 1‑2‑3)</span></h3>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <StepCard title="Create" text="Sign up and personalize your card in minutes.">
          <div className="mt-3 h-24 rounded-xl bg-white ring-1 ring-slate-200 flex items-center justify-center text-slate-500 text-sm w-full">Upload Logo</div>
        </StepCard>
        <StepCard title="Customize" text="Pick layouts, colors, and links that reflect your brand—no design skills required.">
          <div className="mt-3 h-24 rounded-xl bg-gradient-to-br from-[#34C0FE] to-[#6E35E9]" />
        </StepCard>
        <StepCard title="Share" text="Tap your NFC card or send your profile link. Connect effortlessly." />
      </div>
    </section>
  );
}

function StepCard({ title, text, children }) {
  return (
    <div className="rounded-2xl bg-[#6E35E9]/6 ring-1 ring-slate-200 p-6">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{text}</p>
      {children}
    </div>
  );
}

// TEAMS CTA
function TeamsCta() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-14">
      <div className="md:flex items-center gap-10">
        <h3 className="text-3xl font-extrabold">Built for <span className="text-[#6E35E9]">Individuals</span> & <span className="text-slate-900 underline decoration-[#34C0FE] decoration-4 underline-offset-4">Enterprise Teams</span></h3>
        <span className="mt-4 md:mt-0 inline-flex items-center text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">Coming Soon</span>
      </div>
      <p className="mt-3 text-slate-600 max-w-prose">Create: sign up and personalize your card in minutes. Customize: pick layouts, colors, and links that reflect your brand. Share: simply tap your NFC card or send your profile link. Connect effortlessly.</p>
    </section>
  );
}

// TESTIMONIALS
function Testimonials() {
  const items = [
    { name: "Beta Tester #1", role: "Event Marketer", quote: "I used it at a networking event and people loved how quick it was." },
    { name: "Beta Tester #2", role: "Freelance Designer", quote: "I don’t think I’ll ever go back to paper cards." },
    { name: "Beta Tester #3", role: "Sales Lead", quote: "Finally a card I don’t have to reprint every time I change jobs." },
  ];

  return (
    <section className="relative bg-[#6E35E9] text-white">
      <div className="absolute left-6 top-6 text-5xl opacity-40" aria-hidden>“</div>
      <div className="absolute right-6 bottom-6 text-5xl opacity-40 rotate-180" aria-hidden>“</div>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <h3 className="text-center text-2xl md:text-3xl font-extrabold">What Early Testers Are Saying</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <div key={i} className="rounded-2xl bg-white/10 backdrop-blur p-6 border border-white/15 shadow-sm">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm opacity-90">{t.role}</div>
              <p className="mt-3 text-sm opacity-90">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FOOTER
function SiteFooter() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2"><LogoSvg /><span className="sr-only">TapCard Plus</span></div>
        <div className="flex items-center gap-4">
          <a className="hover:text-slate-900" href="/privacy">Privacy</a>
          <a className="hover:text-slate-900" href="/terms">Terms</a>
          <a className="hover:text-slate-900" href="/cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}