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
      id: 'suporte-ti',
      company: 'Suporte de TI',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Abertura, triagem e resolução de chamados técnicos com contexto completo e respostas sugeridas pela IA.',
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
      id: 'rh',
      company: 'RH',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Centraliza as solicitações dos colaboradores (benefícios, documentos e dúvidas) e responde com mais agilidade.',
      metrics: [
        {
          value: '+35',
          label: 'DE GANHO EM',
          sublabel: 'AGILIDADE'
        },
        {
          value: '-25',
          label: 'NO RETRABALHO',
          sublabel: 'DE SOLICITAÇÕES'
        }
      ]
    },
    {
      id: 'facilities',
      company: 'Facilities',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Organiza pedidos de manutenção, infraestrutura e serviços prediais em um fluxo único e rastreável.',
      metrics: [
        {
          value: '-30',
          label: 'NO TEMPO DE',
          sublabel: 'ATENDIMENTO'
        },
        {
          value: '+20',
          label: 'DE GANHO EM',
          sublabel: 'ORGANIZAÇÃO'
        }
      ]
    },
    {
      id: 'atendimento-interno',
      company: 'Atendimento interno',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Um único canal inteligente para concentrar e responder todas as demandas internas da empresa.',
      metrics: [
        {
          value: '+40',
          label: 'DE GANHO EM',
          sublabel: 'PRODUTIVIDADE'
        },
        {
          value: '-30',
          label: 'NO TEMPO DE',
          sublabel: 'PRIMEIRA RESPOSTA'
        }
      ]
    },
    {
      id: 'operacoes',
      company: 'Operações',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Acompanha o SLA, prioriza o que é crítico e reduz o tempo de resposta das equipes operacionais.',
      metrics: [
        {
          value: '+95',
          label: 'DE SLA',
          sublabel: 'CUMPRIDO'
        },
        {
          value: '-35',
          label: 'NO TEMPO',
          sublabel: 'DE RESPOSTA'
        }
      ]
    },
    {
      id: 'service-desk',
      company: 'Service Desk',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Padroniza o atendimento e acelera a resolução de chamados com o apoio da IA em cada etapa.',
      metrics: [
        {
          value: '-40',
          label: 'NO TEMPO',
          sublabel: 'DE RESOLUÇÃO'
        },
        {
          value: '+30',
          label: 'DE GANHO EM',
          sublabel: 'PADRONIZAÇÃO'
        }
      ]
    },
    {
      id: 'csc',
      company: 'CSC',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Centro de Serviços Compartilhados: escala o atendimento de múltiplas áreas sem perder qualidade.',
      metrics: [
        {
          value: '+40',
          label: 'DE GANHO EM',
          sublabel: 'CAPACIDADE'
        },
        {
          value: '+30',
          label: 'DE GANHO EM',
          sublabel: 'PRODUTIVIDADE'
        }
      ]
    },
    {
      id: 'equipes-compartilhadas',
      company: 'Equipes compartilhadas',
      logo: 'logo.png',
      image: 'logo.png',
      description: 'Várias equipes atendendo com contexto comum e histórico unificado de cada chamado.',
      metrics: [
        {
          value: '+30',
          label: 'DE GANHO EM',
          sublabel: 'PRODUTIVIDADE'
        },
        {
          value: '-25',
          label: 'NO TEMPO DE',
          sublabel: 'TRANSFERÊNCIA'
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
