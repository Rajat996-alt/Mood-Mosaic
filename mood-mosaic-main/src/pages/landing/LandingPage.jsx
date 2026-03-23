import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#f6f0e6] text-[#3c352f]">

      {/* Navbar */}
      <nav className="w-full py-6">
  <div className="w-full px-10 flex items-center justify-between">

    {/* Left side logo */}
    <h1 className="text-2xl font-semibold tracking-wide">
      MoodMosaic
    </h1>

    {/* Right side buttons */}
    <div className="flex items-center gap-4">

      <Link
        to="/login"
        className="px-4 py-2 rounded-lg border border-[#d9d0c4] text-sm hover:bg-[#efe7da] transition"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-6 py-2.5 rounded-lg bg-[#6b7a3a] text-white text-sm font-medium hover:bg-[#55622e] transition"
      >
        Get Started
      </Link>

    </div>

  </div>
</nav>

      {/* HERO SECTION WILL GO HERE */}
      <section className="w-full py-32">

  <div className="max-w-4xl mx-auto px-10 text-center">

    <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
      Understand Your Emotions
      <br />
      Visually
    </h1>

    <p className="text-lg text-[#6b6257] mb-10 max-w-xl mx-auto">
      MoodMosaic transforms everyday journaling into a living canvas
      of your emotions, helping you notice patterns and understand
      how you truly feel.
    </p>

    <Link
      to="/register"
      className="inline-block bg-[#6b7a3a] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#55622e] transition"
    >
      Start Your Journey
    </Link>

  </div>

</section>

{/* VISUAL SECTION */}
<section className="w-full py-24 bg-[#f1eadf]">

  <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-16 items-center">

    {/* Text side */}
    <div>

      <h2 className="text-4xl font-semibold mb-6">
        Your emotions become
        <br />
        a living canvas
      </h2>

      <p className="text-[#6b6257] text-lg mb-6">
        Every journal entry adds a color to your emotional mosaic.
        Over time, patterns appear — helping you understand your
        feelings in a gentle visual way.
      </p>

      <p className="text-[#6b6257]">
        No pressure. No judgement. Just awareness.
      </p>

    </div>

    {/* Mood canvas preview */}
    <div className="grid grid-cols-4 gap-4">

      {[
        "#e3c8a8",
        "#d4b492",
        "#c2a07d",
        "#a5b07c",
        "#d9bfa0",
        "#caa783",
        "#b7926d",
        "#9faa72",
        "#e5c9a9",
        "#d3b08d",
        "#c29f7a",
        "#a6b57f",
        "#e2c6a6",
        "#cfab87",
        "#bb946f",
        "#98a66e",
      ].map((color, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg"
          style={{ backgroundColor: color }}
        />
      ))}

    </div>

  </div>

</section>

{/* FEATURES SECTION */}
<section className="w-full py-24">

  <div className="max-w-6xl mx-auto px-10">

    {/* Section heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-semibold mb-4">
        A gentler way to understand yourself
      </h2>

      <p className="text-[#6b6257] max-w-xl mx-auto">
        MoodMosaic combines journaling, AI insights, and visual
        storytelling to help you understand your emotions over time.
      </p>
    </div>

    {/* Feature cards */}
    <div className="grid md:grid-cols-4 gap-8">

      <FeatureCard
        title="AI Mood Detection"
        text="Our AI gently detects emotional tone from your journal entries."
      />

      <FeatureCard
        title="Mood Canvas"
        text="Each entry becomes a tile in your personal emotional mosaic."
      />

      <FeatureCard
        title="Mood Analytics"
        text="Visualize patterns and emotional trends across time."
      />

      <FeatureCard
        title="MoodBuddy"
        text="A small companion that offers supportive reflections."
      />

    </div>

  </div>

</section>

{/* HOW IT WORKS */}
<section className="w-full py-28 bg-[#f1eadf]">

  <div className="max-w-6xl mx-auto px-10">

    {/* Heading */}
    <div className="text-center mb-16">

      <h2 className="text-4xl font-semibold mb-4">
        How MoodMosaic works
      </h2>

      <p className="text-[#6b6257] max-w-xl mx-auto">
        A simple daily ritual that slowly builds a visual
        story of your emotional world.
      </p>

    </div>

    {/* Steps */}
    <div className="grid md:grid-cols-4 gap-8">

      <StepCard
        number="01"
        title="Write your journal"
        text="Capture your thoughts and emotions from the day."
      />

      <StepCard
        number="02"
        title="AI detects mood"
        text="Our AI senses emotional tone from your writing."
      />

      <StepCard
        number="03"
        title="Paint your canvas"
        text="Your feelings become colors in your emotional mosaic."
      />

      <StepCard
        number="04"
        title="See patterns"
        text="Over time your emotional story begins to appear."
      />

    </div>

  </div>

</section>

{/* CTA SECTION */}
<section className="w-full py-28 bg-[#a8b37a]">

  <div className="max-w-4xl mx-auto px-10 text-center">

    <h2 className="text-4xl font-semibold text-[#2e3219] mb-6">
      Start understanding your emotions today
    </h2>

    <p className="text-[#3f4422] mb-10 text-lg">
      Just a few minutes of journaling each day can reveal
      powerful emotional patterns over time.
    </p>

    <Link
      to="/register"
      className="inline-block bg-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#f4f4f4] transition"
    >
      Create Your Free Account
    </Link>

  </div>

</section>

{/* FOOTER */}
<footer className="w-full py-10 bg-[#f6f0e6] border-t border-[#e6dccd]">

  <div className="max-w-6xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4">

    <p className="text-sm text-[#6b6257]">
      MoodMosaic © 2026
    </p>

    <div className="flex gap-6 text-sm text-[#6b6257]">

      <Link to="/login" className="hover:text-[#6b7a3a] transition">
        Login
      </Link>

      <Link to="/register" className="hover:text-[#6b7a3a] transition">
        Register
      </Link>

    </div>

  </div>

</footer>
    </div>
  );
}
function FeatureCard({ title, text }) {
  return (
    <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6 hover:shadow-md transition">

      <h3 className="text-lg font-semibold mb-3">
        {title}
      </h3>

      <p className="text-[#6b6257] text-sm">
        {text}
      </p>

    </div>
  );
}
function StepCard({ number, title, text }) {
  return (
    <div className="bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-6 text-center hover:shadow-md transition">

      <div className="text-sm text-[#6b7a3a] font-semibold mb-3">
        {number}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-[#6b6257] text-sm">
        {text}
      </p>

    </div>
  );
}