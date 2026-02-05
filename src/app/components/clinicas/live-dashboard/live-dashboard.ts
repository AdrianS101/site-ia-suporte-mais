import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  status: 'available' | 'busy' | 'off';
  appointmentsToday: number;
}

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
  isNew: boolean;
}

@Component({
  selector: 'app-live-dashboard',
  imports: [CommonModule],
  templateUrl: './live-dashboard.html',
  styleUrl: './live-dashboard.scss'
})
export class LiveDashboard implements OnInit, OnDestroy {
  doctors: Doctor[] = [
    { id: 1, name: 'Dr. João Silva', specialty: 'Cardiologista', avatar: '👨‍⚕️', status: 'available', appointmentsToday: 8 },
    { id: 2, name: 'Dra. Maria Santos', specialty: 'Pediatra', avatar: '👩‍⚕️', status: 'busy', appointmentsToday: 12 },
    { id: 3, name: 'Dr. Carlos Souza', specialty: 'Ortopedista', avatar: '👨‍⚕️', status: 'available', appointmentsToday: 6 },
    { id: 4, name: 'Dra. Ana Costa', specialty: 'Dermatologista', avatar: '👩‍⚕️', status: 'available', appointmentsToday: 9 },
    { id: 5, name: 'Dr. Pedro Lima', specialty: 'Neurologista', avatar: '👨‍⚕️', status: 'off', appointmentsToday: 0 },
  ];

  appointments: Appointment[] = [
    { id: 1, patientName: 'Lucas Oliveira', doctorName: 'Dr. João Silva', time: '14:00', status: 'confirmed', isNew: false },
    { id: 2, patientName: 'Julia Ferreira', doctorName: 'Dra. Maria Santos', time: '14:30', status: 'pending', isNew: false },
    { id: 3, patientName: 'Roberto Carlos', doctorName: 'Dr. Carlos Souza', time: '15:00', status: 'confirmed', isNew: false },
  ];

  stats = {
    totalAppointments: 47,
    completedToday: 28,
    pendingConfirmation: 8,
    doctorsAvailable: 3
  };

  private intervalId: any;
  private appointmentCounter = 4;

  ngOnInit() {
    // Simulate real-time appointments
    this.intervalId = setInterval(() => {
      this.addNewAppointment();
      this.updateStats();
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private addNewAppointment() {
    const patients = ['Ana Silva', 'Carlos Mendes', 'Beatriz Lima', 'Diego Santos', 'Fernanda Costa', 'Gabriel Rocha'];
    const times = ['15:30', '16:00', '16:30', '17:00', '17:30'];

    const newAppointment: Appointment = {
      id: this.appointmentCounter++,
      patientName: patients[Math.floor(Math.random() * patients.length)],
      doctorName: this.doctors[Math.floor(Math.random() * 4)].name,
      time: times[Math.floor(Math.random() * times.length)],
      status: 'confirmed',
      isNew: true
    };

    this.appointments = [newAppointment, ...this.appointments].slice(0, 6);

    // Remove "new" flag after animation
    setTimeout(() => {
      newAppointment.isNew = false;
    }, 500);
  }

  private updateStats() {
    this.stats.totalAppointments++;
    if (Math.random() > 0.5) {
      this.stats.completedToday++;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'available': return '#22c55e';
      case 'busy': return '#eab308';
      case 'off': return '#94a3b8';
      default: return '#64748b';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available': return 'Disponível';
      case 'busy': return 'Em atendimento';
      case 'off': return 'Ausente';
      default: return 'Indefinido';
    }
  }
}
