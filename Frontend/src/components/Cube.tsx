    const icons = [
    './public/btcb.svg', 
    './public/solb.svg',
    './public/lineb.svg',
    './public/ethb.svg',
  ];
export default function Cube() {
  return (
   
    <div className="cube-container">
    <div className="cube">
      <div className="cube-face cube-front">
        <img src={icons[2]} alt="crypto" className="h-20"  />
      </div>
      <div className="cube-face cube-back">
        <img src={icons[0]} alt="crypto" className="h-20" />
      </div>
      <div className="cube-face cube-right">
        <img src={icons[2]} alt="crypto" className="h-20" />
      </div>
      <div className="cube-face cube-left">
        <img src={icons[3]} alt="crypto" className="h-20" />
      </div>
      <div className="cube-face cube-top">
        <img src={icons[1]} alt="crypto" className="h-20" />
      </div>
      <div className="cube-face cube-bottom">
        <img src={icons[0]} alt="crypto" className="h-20" />
      </div>
    </div>
  </div>
    

  );
}
