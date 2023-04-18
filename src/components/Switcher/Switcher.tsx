import React, { useState } from 'react';
import './Switcher.scss';

interface Props {
  onPositionChange: (newPosition: number) => void;
}

const Switcher: React.FC<Props> = ({ onPositionChange }) => {
  const [position, setPosition] = useState<number>(1);
  
  const handleTransition = () => {
    setPosition((prevPosition) => {
      const newPosition: number = prevPosition === 3 ? 1 : prevPosition + 1;
      onPositionChange(newPosition); // Call the callback with the new position
      return newPosition;
    });
  };
  
  const circleClassName: string = `circle position${position}`;
  
  return (
    <div className="switcher">
      <div className={circleClassName} onClick={handleTransition}></div>
    </div>
  );
};
  
export default Switcher;
