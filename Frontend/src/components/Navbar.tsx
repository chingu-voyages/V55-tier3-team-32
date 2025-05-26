export default function Navbar() {
    return (
       <>
    
          
          <div className="absolute left-0 right-0 top-0 h-[350px] pointer-events-none z-0"
            style={{
              background: "linear-gradient(180deg, #f7b86130 0%, #00000000 85%)",
              opacity: 0.95,
            }}
          />
          
          <div className="absolute left-0 top-0 w-full  h-[350px] z-10 pointer-events-none">
            <svg width="100%" height="100%">
              <circle cx="80" cy="50" r="1.5" fill="#fff" opacity="0.18"/>
              <circle cx="200" cy="100" r="1.8" fill="#fff" opacity="0.22"/>
              <circle cx="300" cy="80" r="0.8" fill="#fff" opacity="0.12"/>
              <circle cx="400" cy="130" r="2.0" fill="#FFA500" opacity="0.17"/>
              <circle cx="500" cy="60" r="1.2" fill="#FFA500" opacity="0.15"/>
              <circle cx="600" cy="130" r="1.5" fill="#FFA500" opacity="0.20"/>
              <circle cx="700" cy="140" r="1.0" fill="#FFA500" opacity="0.10"/>
              <circle cx="750" cy="140" r="1.0" fill="#FFA500" opacity="0.10"/>
              <circle cx="810" cy="180" r="1.5" fill="#FFA500" opacity="0.18"/>
              <circle cx="930" cy="100" r="1.8" fill="#FFA500" opacity="0.22"/>
              <circle cx="970" cy="1230" r="0.8" fill="#FFA500" opacity="0.12"/>
              <circle cx="1100" cy="160" r="2.0" fill="#FFA500" opacity="0.17"/>
              <circle cx="1200" cy="190" r="1.2" fill="#FFA500" opacity="0.15"/>
              <circle cx="1300" cy="140" r="1.5" fill="#FFA500" opacity="0.20"/>
              <circle cx="1400" cy="180" r="1.0" fill="#FFA500" opacity="0.10"/>
              <circle cx="1500" cy="140" r="1.0" fill="#FFA500" opacity="0.10"/>
              <circle cx="1560" cy="180" r="1.5" fill="#FFA500" opacity="0.18"/>
              <circle cx="1700" cy="100" r="1.8" fill="#FFA500" opacity="0.22"/>
              <circle cx="1750" cy="123" r="0.8" fill="#FFA500" opacity="0.12"/>
              <circle cx="1900" cy="160" r="2.0" fill="#FFA500" opacity="0.17"/>
              <circle cx="2000" cy="110" r="1.2" fill="#FFA500" opacity="0.15"/>
              <circle cx="1800" cy="140" r="1.5" fill="#FFA500" opacity="0.20"/>
              <circle cx="1700" cy="180" r="1.0" fill="#FFA500" opacity="0.10"/>
              
            </svg>
          </div>
        <nav className="flex justify-between items-center px-8 py-5 bg-black bg-opacity-200 rounded-xl mt-5 mx-auto max-w-7xl w-[70%] backdrop-blur-sm shadow-lg">
          <div className="flex items-center space-x-3 mr-20">
            <img src="../public/logo.svg" alt="Cryptolink" className="h-8" />
            <span className="text-orange-400 font-bold text-lg">Cryptolink</span>
          </div>
          <ul className="flex  space-x-6  text-white/80">
          
            <li className="py-2 ">About us</li>
            <li><button className=" px-4 py-2 rounded bg-orange-400 text-black font-semibold hover:bg-orange-500 transition">Start Questions</button></li>
          </ul>


        </nav>
        </>
    );
  }
  