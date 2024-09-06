// src/types/schema.ts

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'operator' | 'viewer';
    createdAt: Date;
    lastLogin: Date;
  }
  
  export interface Transformer {
    id: string;
    name: string;
    meterNumber: string; // Unique identifier for the meter
    location: {
      latitude: number;
      longitude: number;
    };
    capacity: number; // in kVA
    feederId: string; // reference to feeder
    lastMaintenance: Date;
    status: 'active' | 'inactive' | 'maintenance';
  }
  
  export interface Feeder {
    id: string;
    name: string;
    voltage: number; // in kV
    maxCapacity: number; // in MW
    connectedTransformers: string[]; // array of transformer IDs
    status: 'active' | 'inactive' | 'maintenance';
  }
  
  export interface EnergyReading {
    id: string;
    transformerId: string;
    meterNumber: string; // Corresponds to the transformer's meter number
    timestamp: Date;
    activePower: number; // in kW
    reactivePower: number; // in kVAR
    voltage: number; // in V
    current: number; // in A
    frequency: number; // in Hz
    availabilityHr: number; 
    dtConsumption: number; 
  }
  
  export interface Alert {
    id: string;
    type: 'overload' | 'undervoltage' | 'overvoltage' | 'maintenance';
    severity: 'low' | 'medium' | 'high';
    entityId: string; // ID of related transformer or feeder
    entityType: 'transformer' | 'feeder';
    message: string;
    timestamp: Date;
    status: 'active' | 'acknowledged' | 'resolved';
  }
  