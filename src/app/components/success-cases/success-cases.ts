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
      id: 'bahamas-cred',
      company: 'Bahamas Cred',
      logo: 'bahamas-logo.png',
      image: 'bahamas-case.png',
      description: 'Ao adotar as soluções da Smart NX, a Bahamas Cred elevou seu padrão de atendimento, conquistando resultados surpreendentes:',
      metrics: [
        {
          value: '+20',
          label: '% DE REDUÇÃO',
          sublabel: 'EM CUSTOS OPERACIONAIS'
        },
        {
          value: '+35',
          label: '% EM AUMENTO DA',
          sublabel: 'EFICIÊNCIA DO ATENDIMENTO'
        }
      ]
    },
    {
      id: 'grupo-dpsp',
      company: 'Balconi',
      logo: 'dpsp-logo.png',
      image: 'dpsp-case.png',
      description: 'Com as soluções inteligentes implementadas, o Grupo DPSP transformou seu atendimento:',
      metrics: [
        {
          value: '5',
          label: 'PARA 1 MINUTO',
          sublabel: 'DE ATENDIMENTO'
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
