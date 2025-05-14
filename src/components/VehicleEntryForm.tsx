import React, { useState } from 'react';
import { Vehicle } from '../types';
import { X, CheckCircle } from 'lucide-react';
import './VehicleEntryForm.css';

interface VehicleEntryFormProps {
  spotId: number;
  onParkVehicle: (spotId: number, vehicle: Vehicle) => void;
  onCancel: () => void;
}

const VehicleEntryForm: React.FC<VehicleEntryFormProps> = ({ spotId, onParkVehicle, onCancel }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [entryTime, setEntryTime] = useState(new Date().toISOString().slice(0, 16)); // Default to now

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licensePlate.trim()) {
      alert('License plate cannot be empty.');
      return;
    }
    onParkVehicle(spotId, {
      licensePlate: licensePlate.toUpperCase(),
      entryTime: new Date(entryTime),
    });
    setLicensePlate(''); // Reset form
  };

  return (
    <div className="vehicle-entry-form-overlay">
      <div className="vehicle-entry-form card">
        <div className="form-header">
          <h3>Park Vehicle in Spot P-{String(spotId).padStart(2, '0')}</h3>
          <button onClick={onCancel} className="close-button">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="licensePlate">License Plate:</label>
            <input
              type="text"
              id="licensePlate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="e.g., ABC-123"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="entryTime">Entry Time:</label>
            <input
              type="datetime-local"
              id="entryTime"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="button-secondary">
              Cancel
            </button>
            <button type="submit" className="button-primary">
              <CheckCircle size={18} style={{ marginRight: '8px' }} /> Park Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleEntryForm;
