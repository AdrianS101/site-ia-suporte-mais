import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SentimentMessage {
  id: number;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  visible: boolean;
}

@Component({
  selector: 'app-sentiment-analysis',
  imports: [CommonModule],
  templateUrl: './sentiment-analysis.html',
  styleUrl: './sentiment-analysis.scss',
})
export class SentimentAnalysis implements OnInit, OnDestroy {
  messages: SentimentMessage[] = [
    {
      id: 1,
      text: 'Sistema de faturamento fora do ar, equipe inteira parada',
      sentiment: 'positive',
      score: 95,
      visible: false
    },
    {
      id: 2,
      text: 'Solicitação de acesso a uma nova pasta compartilhada',
      sentiment: 'neutral',
      score: 60,
      visible: false
    },
    {
      id: 3,
      text: 'Dúvida sobre como alterar a foto do perfil interno',
      sentiment: 'negative',
      score: 15,
      visible: false
    },
    {
      id: 4,
      text: 'Falha de login impedindo toda a equipe de bater ponto',
      sentiment: 'positive',
      score: 98,
      visible: false
    }
  ];

  stats = {
    positive: 50,
    neutral: 25,
    negative: 25
  };

  currentIndex = 0;
  animationInterval: any;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  startAnimation() {
    this.animationInterval = setInterval(() => {
      if (this.currentIndex < this.messages.length) {
        this.messages[this.currentIndex].visible = true;
        this.currentIndex++;
      } else {
        setTimeout(() => {
          this.resetAnimation();
        }, 3000);
      }
    }, 1500);
  }

  resetAnimation() {
    this.messages.forEach(msg => msg.visible = false);
    this.currentIndex = 0;
  }

  getSentimentIcon(sentiment: string): string {
    switch(sentiment) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😟';
      default: return '😐';
    }
  }

  getSentimentColor(sentiment: string): string {
    switch(sentiment) {
      case 'positive': return '#10b981';
      case 'neutral': return '#f59e0b';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  }
}
