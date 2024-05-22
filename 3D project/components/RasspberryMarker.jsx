import React from 'react';
import { Html } from '@react-three/drei';
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const blink = keyframes`
  from { color: blue; }
  to { color: black; }
`;

const Container = styled('div')({
  position: 'relative',
  width: '50px',
  height: '50px',
  paddingLeft: 0,
});

const Image = styled('img')({
  width: '34px',
  height: '34px',
});

const Icon = styled(SensorsSharpIcon)({
  position: 'absolute',
  top: '-20px', 
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '20px',
  fontWeight: 'bolder', 
  animation: `${blink} 1s infinite`,
});

function RaspberryPiMarker({ position }) {
  return (
    <Html position={position}>
      <Container>
        <Image src="https://shorturl.at/yqFcx" alt="Raspberry Pi" />
        <Icon />
      </Container>
    </Html>
  );
}

export default RaspberryPiMarker;
