import { Component } from '@angular/core';

@Component({
  selector: 'app-como-resolve',
  standalone: true,
  imports: [],
  templateUrl: './como-resolve.html',
  styleUrl: './como-resolve.scss',
})
export class ComoResolve {
  protected readonly etapas = [
    {
      numero: 1,
      titulo: 'O chamado entra organizado',
      texto: 'Status, prioridade, prazo e responsável definidos desde a abertura.',
    },
    {
      numero: 2,
      titulo: 'A IA resume o caso',
      texto: 'O atendente não precisa reconstruir toda a história do chamado.',
    },
    {
      numero: 3,
      titulo: 'A IA sugere a resposta',
      texto: 'Baseada no conhecimento da sua empresa. A IA não inventa.',
    },
    {
      numero: 4,
      titulo: 'O atendente revisa e responde',
      texto: 'Mais rápido e com mais segurança. A decisão é sempre humana.',
    },
    {
      numero: 5,
      titulo: 'O gestor acompanha tudo',
      texto: 'Atrasos, SLAs, gargalos e sobrecarga, em um só painel.',
    },
  ];
}
