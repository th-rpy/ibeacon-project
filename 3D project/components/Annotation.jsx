import React from 'react';
import { Html } from '@react-three/drei';
import BluetoothDriveSharpIcon from '@mui/icons-material/BluetoothDriveSharp';

function Annotation({ point }) {
  return point ? (
    <Html position={point}>
      <div style={{ position: 'relative', width: '100px', height: '80px', transform: 'translate(-50%, -50%)' }}>
        <BluetoothDriveSharpIcon style={{ fontSize: 50, color: 'green' }} />
        <p style={{ position: 'absolute', bottom: '0px', left: '30%', 
                    transform: 'translateX(-50%)', 
                    fontSize: '12px', fontWeight: 'bold', 
                    color: 'blue' }}>
          ({point[0]}, {point[2]})
        </p>
      </div>
    </Html>
  ) : null;
}

export default Annotation;






