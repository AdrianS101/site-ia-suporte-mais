import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SuccessCase {
  id: string;
  company: string;
  logo: string;
  image: string;
  description: string;
  metrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
}

@Component({
  selector: 'app-success-cases',
  imports: [CommonModule],
  templateUrl: './success-cases.html',
  styleUrl: './success-cases.scss',
})
export class SuccessCases {
  currentIndex = 0;

  cases: SuccessCase[] = [
    {
      id: 'suporte-software',
      company: 'Suporte de Software',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Chamados chegam resumidos e com contexto.',
      metrics: [
        {
          value: '-40',
          label: 'NO TEMPO',
          sublabel: 'DE RESOLUÇÃO'
        },
        {
          value: '+30',
          label: 'DE GANHO EM',
          sublabel: 'PRODUTIVIDADE'
        }
      ]
    },
    {
      id: 'service-desk-interno',
      company: 'Service Desk Interno',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Funcionários recebem suporte mais rápido.',
      metrics: [
        {
          value: '-35',
          label: 'NO TEMPO DE',
          sublabel: 'PRIMEIRA RESPOSTA'
        },
        {
          value: '+30',
          label: 'DE GANHO EM',
          sublabel: 'AGILIDADE'
        }
      ]
    },
    {
      id: 'pos-venda',
      company: 'Pós-venda',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Controle de SLA e acompanhamento completo.',
      metrics: [
        {
          value: '+95',
          label: 'DE SLA',
          sublabel: 'CUMPRIDO'
        },
        {
          value: '-30',
          label: 'NO TEMPO',
          sublabel: 'DE RESPOSTA'
        }
      ]
    },
    {
      id: 'operacoes-corporativas',
      company: 'Operações Corporativas',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Gestão centralizada de solicitações.',
      metrics: [
        {
          value: '+40',
          label: 'DE GANHO EM',
          sublabel: 'PRODUTIVIDADE'
        },
        {
          value: '-25',
          label: 'NO RETRABALHO',
          sublabel: 'DE SOLICITAÇÕES'
        }
      ]
    }
  ];

  get visibleCases() {
    // Show 2 cases at a time on desktop
    const result = [];
    for (let i = 0; i < 2; i++) {
      const index = (this.currentIndex + i) % this.cases.length;
      result.push(this.cases[index]);
    }
    return result;
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.cases.length) % this.cases.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.cases.length;
  }

  getProgressWidth() {
    return ((this.currentIndex + 1) / this.cases.length) * 100 + '%';
  }
}
