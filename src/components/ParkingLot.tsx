import React from 'react';
import ParkingSpot from './ParkingSpot';
import { ParkingSpotData } from '../types';
import './ParkingLot.css';

interface ParkingLotProps {
  spots: ParkingSpotData[];
  onSpotClick: (spotId: number) => void;
}

const ParkingLot: React.FC<ParkingLotProps> = ({ spots, onSpotClick }) => {
  return (
    <div className="parking-lot-container card">
      <h2 className="parking-lot-title">Parking Area</h2>
      <div className="parking-lot-grid">
        {spots.map(spot => (
          <ParkingSpot
            key={spot.id}
            spotData={spot}
            onClick={() => onSpotClick(spot.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ParkingLot;
