export default function HeroSection() {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center pt-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Step into the Future <br /> with <span className="text-orange-400">Crypto Search</span>
        </h1>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Maximize your potential with a powerful platform built to shape the future of your knowledge.
        </p>
        <div className="flex gap-4 justify-center mb-12">
          <button className="px-6 py-3 rounded bg-orange-400 text-black font-bold hover:bg-orange-500 transition">
            Sign Up
          </button>
          <button className="px-6 py-3 rounded border border-white/40 text-white/90 hover:bg-white/10 transition">
            Live Demo
          </button>
        </div>
       
      </section>
    );
  }
  