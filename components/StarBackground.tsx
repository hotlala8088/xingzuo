
import React from 'react';

const StarBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="star-bg absolute inset-0"></div>
      <div className="nebula bg-purple-600/30 -top-20 -left-20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="nebula bg-blue-600/30 bottom-10 -right-20 animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="nebula bg-indigo-900/40 top-1/2 left-1/3 blur-[120px]"></div>
    </div>
  );
};

export default StarBackground;
