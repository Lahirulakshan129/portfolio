import React from 'react';

interface Props {
  imageSrc: string;
  alt?: string;
  size?: number;
  popOutFraction?: number; 
}

const PopOutProfile: React.FC<Props> = ({
  imageSrc,
  alt = 'Profile',
  size = 300,
  popOutFraction = 0.3,
}) => {
  const popOutHeight = size * popOutFraction;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: 'lightgray', // Ground layer color
    overflow: 'visible',
  };

  const imageStyle: React.CSSProperties = {
    display: 'block',
    width: `${size}px`,
    height: `${size + popOutHeight}px`,
    marginTop: `-${popOutHeight}px`,
    borderRadius: `0 0 ${size / 2}px ${size / 2}px`,
    objectFit: 'cover',
    objectPosition: 'center', // Changed to 'center' to avoid clipping from bottom or top if possible
  };

  return (
    <div style={containerStyle}>
      <img src={imageSrc} alt={alt} style={imageStyle} />
    </div>
  );
};

export default PopOutProfile;