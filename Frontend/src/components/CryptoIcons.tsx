const icons = [
    '/btc.svg', 
    '/sol.svg',
    '/line.svg',
    '/eth.svg',
  ];
  
  export default function CryptoIcons() {
    return (
      <div className="flex justify-center gap-16 mt-20 mb-20">
        {icons.map((src, idx) => (
          <img key={idx} src={src} alt="crypto" className="h-20 animate-bounce" style={{ animationDelay: `${idx * 0.2}s` }} />
        ))}
      </div>
    );
  }
 