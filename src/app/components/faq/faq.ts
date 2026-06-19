import { Component } from '@angular/core';

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  openIndex = 0;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index;
  }

  faqs: FaqItem[] = [
    {
      q: 'O que é a IA HelpDesk+?',
      a: 'A IA HelpDesk+ é uma plataforma inteligente de gestão de chamados que utiliza Inteligência Artificial para apoiar equipes de suporte e service desk.',
    },
    {
      q: 'A IA substitui meus atendentes?',
      a: 'Não. Ela atua como copiloto operacional, ajudando a equipe a trabalhar com mais eficiência.',
    },
    {
      q: 'Posso controlar SLA?',
      a: 'Sim. A plataforma possui acompanhamento de SLA, prioridades e responsáveis.',
    },
    {
      q: 'É possível acompanhar indicadores?',
      a: 'Sim. A solução oferece dashboards e métricas operacionais em tempo real.',
    },
    {
      q: 'A IA HelpDesk+ integra com outros sistemas?',
      a: 'Sim. A plataforma pode ser integrada aos processos e ferramentas já utilizados pela empresa.',
    },
  ];
}
