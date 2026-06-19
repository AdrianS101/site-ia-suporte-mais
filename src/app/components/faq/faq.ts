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
      q: 'O que é a IA Suporte+?',
      a: 'É uma central inteligente de suporte e chamados. A IA Suporte+ organiza as solicitações, resume cada chamado e atua como um co-piloto dos atendentes, sugerindo respostas e próximos passos para resolver mais rápido, com padrão e sem perder o contexto.',
    },
    {
      q: 'A IA substitui os atendentes da minha equipe?',
      a: 'Não. A IA Suporte+ trabalha ao lado da equipe, não no lugar dela. Ela cuida do trabalho repetitivo (triagem, resumo, categorização) e sugere caminhos, deixando o atendente livre para decidir e resolver o que realmente exige julgamento humano.',
    },
    {
      q: 'A IA Suporte+ integra com as ferramentas que já usamos?',
      a: 'Sim. A plataforma se conecta a ferramentas de ITSM, ERPs, CRMs e sistemas internos via integrações e API. O objetivo é entrar na operação que já existe, sem obrigar a equipe a trocar tudo o que usa hoje.',
    },
    {
      q: 'Como a IA prioriza os chamados?',
      a: 'Cada chamado é classificado automaticamente por urgência, criticidade e impacto. Os casos mais sensíveis sobem na fila e o time recebe uma visão clara do que precisa de atenção primeiro, ajudando a cumprir os SLAs.',
    },
    {
      q: 'Em quais áreas posso usar a IA Suporte+?',
      a: 'Em qualquer equipe que receba solicitações internas: Suporte de TI, RH, Facilities, Operações, Service Desk, Centros de Serviços Compartilhados (CSC) e equipes compartilhadas. A mesma central atende várias áreas, cada uma com seu fluxo.',
    },
    {
      q: 'Quanto tempo leva para implementar?',
      a: 'A implantação é guiada e progressiva. Começamos com os fluxos de chamado mais importantes para a sua operação e expandimos a partir dali, de forma que a equipe sinta valor logo nas primeiras semanas, sem um projeto longo de configuração.',
    },
    {
      q: 'Os dados da empresa ficam seguros?',
      a: 'Sim. As informações dos chamados são tratadas com controle de acesso e boas práticas de segurança e privacidade. Os dados da sua operação são usados para apoiar o atendimento, não para finalidades fora do contexto da plataforma.',
    },
    {
      q: 'Preciso treinar a IA com a nossa base de conhecimento?',
      a: 'A IA já chega operando e melhora conforme aprende com o histórico dos seus chamados e com a sua base de conhecimento. Quanto mais contexto da sua operação ela tem, mais precisas ficam as sugestões de resposta e os encaminhamentos.',
    },
    {
      q: 'A IA Suporte+ funciona de forma independente?',
      a: 'Sim. Ela pode operar como central autônoma de chamados ou integrada às suas ferramentas atuais. Também faz parte do ecossistema IA+, então cresce junto com as outras soluções conforme a sua operação evolui.',
    },
  ];
}
