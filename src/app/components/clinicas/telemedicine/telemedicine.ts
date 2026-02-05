import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CallParticipant {
  name: string;
  role: string;
  avatar: string;
  isActive: boolean;
}

interface Feature {
  icon: string;
  name: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-telemedicine',
  imports: [CommonModule],
  templateUrl: './telemedicine.html',
  styleUrl: './telemedicine.scss'
})
export class Telemedicine implements OnInit, OnDestroy {
  callStatus: 'connecting' | 'connected' | 'idle' = 'idle';
  connectionQuality: 'excellent' | 'good' | 'poor' = 'excellent';
  callDuration: string = '00:00';

  doctor: CallParticipant = {
    name: 'Dr. João Silva',
    role: 'Cardiologista',
    avatar: '👨‍⚕️',
    isActive: true
  };

  patient: CallParticipant = {
    name: 'Maria Santos',
    role: 'Paciente',
    avatar: '👩',
    isActive: true
  };

  features: Feature[] = [
    {
      icon: '💬',
      name: 'Chat em Tempo Real',
      description: 'Envie mensagens e arquivos durante a consulta',
      isActive: true
    },
    {
      icon: '🖥️',
      name: 'Compartilhamento de Tela',
      description: 'Compartilhe exames e documentos',
      isActive: false
    },
    {
      icon: '📋',
      name: 'Receita Digital',
      description: 'Emita receitas e atestados online',
      isActive: true
    },
    {
      icon: '📊',
      name: 'Histórico Completo',
      description: 'Acesso ao prontuário durante a consulta',
      isActive: true
    }
  ];

  stats = {
    consultationsToday: 47,
    averageDuration: '28min',
    satisfaction: '98%',
    activeCalls: 12
  };

  private intervalId: any;
  private durationInterval: any;
  private seconds = 0;

  ngOnInit() {
    // Simulate call connection
    setTimeout(() => {
      this.startCall();
    }, 1500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }
  }

  private startCall() {
    this.callStatus = 'connecting';

    setTimeout(() => {
      this.callStatus = 'connected';
      this.startDurationTimer();
      this.simulateConnectionChanges();
    }, 2000);
  }

  private startDurationTimer() {
    this.durationInterval = setInterval(() => {
      this.seconds++;
      const minutes = Math.floor(this.seconds / 60);
      const secs = this.seconds % 60;
      this.callDuration = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  }

  private simulateConnectionChanges() {
    this.intervalId = setInterval(() => {
      // Randomly toggle features
      const randomFeature = this.features[Math.floor(Math.random() * this.features.length)];
      randomFeature.isActive = !randomFeature.isActive;

      // Simulate connection quality changes (rarely)
      if (Math.random() < 0.1) {
        const qualities: ('excellent' | 'good' | 'poor')[] = ['excellent', 'good'];
        this.connectionQuality = qualities[Math.floor(Math.random() * qualities.length)];
      }
    }, 5000);
  }

  getConnectionColor(): string {
    switch (this.connectionQuality) {
      case 'excellent': return '#22c55e';
      case 'good': return '#eab308';
      case 'poor': return '#ef4444';
      default: return '#64748b';
    }
  }

  getConnectionText(): string {
    switch (this.connectionQuality) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Boa';
      case 'poor': return 'Fraca';
      default: return 'Conectando';
    }
  }
}
