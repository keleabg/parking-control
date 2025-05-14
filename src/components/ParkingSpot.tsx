import React from 'react';
import { ParkingSpotData } from '../types';
import { Car, ParkingSquare } from 'lucide-react';
import './ParkingSpot.css';

interface ParkingSpotProps {
  spotData: ParkingSpotData;
  onClick: () => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ spotData, onClick }) => {
  const { id, isOccupied, vehicle } = spotData;
  const spotClass = isOccupied ? 'spot-occupied' : 'spot-available';

  return (
    <div className={`parking-spot ${spotClass}`} onClick={onClick}>
      <div className="spot-icon">
        {isOccupied ? <Car size={32} /> : <ParkingSquare size={32} />}
      </div>
      <div className="spot-id">P-{String(id).padStart(2, '0')}</div>
      {isOccupied && vehicle && (
        <div className="spot-vehicle-info">
          <div className="plate-number">{vehicle.licensePlate}</div>
        </div>
      )}
    </div>
  );
};

export default ParkingSpot;
