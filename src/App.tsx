import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ParkingLot from './components/ParkingLot';
import VehicleEntryForm from './components/VehicleEntryForm';
import { ParkingSpotData, Vehicle } from './types';
import { Car, ParkingSquare } from 'lucide-react';
import './App.css';

const TOTAL_SPOTS = 40; // Updated to 40

const App: React.FC = () => {
  const [spots, setSpots] = useState<ParkingSpotData[]>([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);

  useEffect(() => {
    // Initialize parking spots
    const initialSpots: ParkingSpotData[] = Array.from({ length: TOTAL_SPOTS }, (_, i) => ({
      id: i + 1,
      isOccupied: false,
      vehicle: null,
    }));
    setSpots(initialSpots);
  }, []);

  const handleOccupySpot = (spotId: number, vehicle: Vehicle) => {
    setSpots(prevSpots =>
      prevSpots.map(spot =>
        spot.id === spotId ? { ...spot, isOccupied: true, vehicle } : spot
      )
    );
    setShowEntryForm(false);
    setSelectedSpotId(null);
  };

  const handleVacateSpot = (spotId: number) => {
    setSpots(prevSpots =>
      prevSpots.map(spot =>
        spot.id === spotId ? { ...spot, isOccupied: false, vehicle: null } : spot
      )
    );
  };

  const handleSpotClick = (spotId: number) => {
    const spot = spots.find(s => s.id === spotId);
    if (spot && !spot.isOccupied) {
      setSelectedSpotId(spotId);
      setShowEntryForm(true);
    } else if (spot && spot.isOccupied) {
      // Could show vehicle details or vacate option here
      // For now, let's just allow vacating directly
      handleVacateSpot(spotId);
    }
  };

  const occupiedSpotsCount = spots.filter(spot => spot.isOccupied).length;
  const availableSpotsCount = TOTAL_SPOTS - occupiedSpotsCount;

  return (
    <div className="app-container">
      <Header title="Smart Parking Control" />
      <main className="container">
        <div className="stats-bar card">
          <div className="stat-item">
            <ParkingSquare size={32} className="stat-icon available" />
            <div>
              <h3>Available Spots</h3>
              <p>{availableSpotsCount}</p>
            </div>
          </div>
          <div className="stat-item">
            <Car size={32} className="stat-icon occupied" />
            <div>
              <h3>Occupied Spots</h3>
              <p>{occupiedSpotsCount}</p>
            </div>
          </div>
        </div>

        {showEntryForm && selectedSpotId && (
          <VehicleEntryForm
            spotId={selectedSpotId}
            onParkVehicle={handleOccupySpot}
            onCancel={() => {
              setShowEntryForm(false);
              setSelectedSpotId(null);
            }}
          />
        )}

        <ParkingLot spots={spots} onSpotClick={handleSpotClick} />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Parking Control Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
