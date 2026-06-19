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
      a: 'É um sistema de chamados com Inteligência Artificial de copiloto: organiza e resume os chamados, sugere respostas com base no conhecimento da empresa e dá ao gestor uma visão completa da operação.',
    },
    {
      q: 'A IA substitui meus atendentes?',
      a: 'Não. A IA é copiloto, não piloto. Ela acelera o trabalho da equipe sugerindo contexto e respostas, mas quem decide e responde é sempre o atendente.',
    },
    {
      q: 'A IA inventa respostas?',
      a: 'Não. As sugestões são baseadas no conhecimento e no histórico da sua empresa, não em achismo.',
    },
    {
      q: 'Consigo controlar SLA e prazos?',
      a: 'Sim. A plataforma acompanha prazos, prioridades, responsáveis e mostra o que está vencendo antes de virar problema.',
    },
    {
      q: 'Onde ficam os dados da minha empresa?',
      a: 'Os dados permanecem na infraestrutura da sua empresa, com conformidade LGPD, controle de acesso, auditoria e criptografia.',
    },
    {
      q: 'A IA HelpDesk+ integra com outros sistemas?',
      a: 'Sim. A plataforma pode ser integrada aos processos e ferramentas já utilizados pela empresa.',
    },
  ];
}
