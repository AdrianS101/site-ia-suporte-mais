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
      title: 'Follow-up Automático',
      description: 'Configure regras inteligentes de follow-up que mantêm seus leads engajados automaticamente, aumentando suas chances de conversão.',
      color: '#48C1C4'
    },
    {
      icon: 'clock',
      title: 'Regras Temporizadas',
      description: 'Configure follow-ups automáticos baseados em tempo, condições específicas e comportamento do cliente.',
      color: '#48C1C4'
    },
    {
      icon: 'brain',
      title: 'IA Inteligente',
      description: 'Mensagens personalizadas que se adaptam ao contexto da conversa e histórico do cliente.',
      color: '#48C1C4'
    },
    {
      icon: 'chart',
      title: 'Aumento de Conversão',
      description: 'Follow-ups estratégicos que aumentam em até 300% as taxas de resposta e conversão.',
      color: '#48C1C4'
    }
  ];

  hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0';
  }
}
