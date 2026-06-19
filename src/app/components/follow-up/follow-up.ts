import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-follow-up',
  imports: [CommonModule],
  templateUrl: './follow-up.html',
  styleUrl: './follow-up.scss',
})
export class FollowUp {
  features = [
    {
      icon: 'bell',
      title: 'Alertas de Inatividade e SLA',
      description: 'Monitore chamados parados e prazos em risco com alertas automáticos que evitam atrasos e estouro de SLA.',
      color: '#6d5efc'
    },
    {
      icon: 'clock',
      title: 'Lembretes Inteligentes',
      description: 'Agende lembretes e cobranças automáticas com base no tempo, na prioridade e no status de cada chamado.',
      color: '#6d5efc'
    },
    {
      icon: 'brain',
      title: 'Escalonamento Automático',
      description: 'A IA decide quando escalar o chamado para o nível seguinte, considerando o contexto e o histórico da solicitação.',
      color: '#6d5efc'
    },
    {
      icon: 'chart',
      title: 'Analytics de Resolução',
      description: 'Acompanhe tempo de resolução, taxas de reabertura e cumprimento de SLA para melhorar continuamente o suporte.',
      color: '#6d5efc'
    }
  ];

  hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0';
  }
}
