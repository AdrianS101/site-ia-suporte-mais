import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  visible: boolean;
  typing?: boolean;
}

interface KanbanCard {
  id: number;
  title: string;
  customer: string;
  category: string;
  column: 'new' | 'processing' | 'resolved';
}

@Component({
  selector: 'app-chat-demo',
  imports: [CommonModule],
  templateUrl: './chat-demo.html',
  styleUrl: './chat-demo.scss',
})
export class ChatDemo implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer?: ElementRef;
  messages: Message[] = [
    { id: 1, text: 'Olá! Preciso de ajuda com meu pedido', sender: 'user', visible: false },
    { id: 2, text: 'Olá! Claro, vou te ajudar agora mesmo. Qual o número do seu pedido?', sender: 'bot', visible: false },
    { id: 3, text: 'É o pedido #9847', sender: 'user', visible: false },
    { id: 4, text: 'Encontrei seu pedido! Ele está em rota de entrega e deve chegar hoje até as 18h. Deseja mais alguma informação?', sender: 'bot', visible: false },
    { id: 5, text: 'Perfeito! Muito obrigado pelo atendimento rápido 😊', sender: 'user', visible: false },
    { id: 6, text: 'Por nada! Estou sempre aqui para ajudar. Tenha um ótimo dia! 🚀', sender: 'bot', visible: false }
  ];

  kanbanCards: KanbanCard[] = [
    { id: 1, title: 'Pedido #9847', customer: 'Cliente', category: 'Suporte', column: 'new' },
    { id: 2, title: 'Produto não chegou', customer: 'Maria S.', category: 'Entrega', column: 'new' },
    { id: 3, title: 'Dúvida sobre pagamento', customer: 'João P.', category: 'Financeiro', column: 'new' }
  ];

  currentMessageIndex = 0;
  animationInterval: any;
  showTyping = false;
  shouldScrollToBottom = false;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatMessagesContainer) {
        const element = this.chatMessagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch(err) {
      console.error('Scroll error:', err);
    }
  }

  startAnimation() {
    this.animationInterval = setInterval(() => {
      if (this.currentMessageIndex < this.messages.length) {
        // Show typing indicator for bot messages
        if (this.messages[this.currentMessageIndex].sender === 'bot') {
          this.showTyping = true;
          this.shouldScrollToBottom = true;

          // Move card when processing
          if (this.currentMessageIndex === 1) {
            setTimeout(() => this.moveCard(0, 'processing'), 500);
          }

          setTimeout(() => {
            this.showTyping = false;
            if (this.messages[this.currentMessageIndex]) {
              this.messages[this.currentMessageIndex].visible = true;
              this.shouldScrollToBottom = true;
              this.currentMessageIndex++;

              // Move card to resolved when conversation is done
              if (this.currentMessageIndex === 5) {
                setTimeout(() => this.moveCard(0, 'resolved'), 1000);
              }
            }
          }, 1500);
        } else {
          if (this.messages[this.currentMessageIndex]) {
            this.messages[this.currentMessageIndex].visible = true;
            this.shouldScrollToBottom = true;
            this.currentMessageIndex++;
          }
        }
      } else {
        // Reset animation
        setTimeout(() => {
          this.resetAnimation();
        }, 3000);
      }
    }, 2000);
  }

  moveCard(cardId: number, column: 'new' | 'processing' | 'resolved') {
    const card = this.kanbanCards.find(c => c.id === cardId + 1);
    if (card) {
      card.column = column;
    }
  }

  getCardsByColumn(column: 'new' | 'processing' | 'resolved'): KanbanCard[] {
    return this.kanbanCards.filter(card => card.column === column);
  }

  resetAnimation() {
    this.messages.forEach(msg => msg.visible = false);
    this.kanbanCards.forEach(card => card.column = 'new');
    this.currentMessageIndex = 0;
    this.showTyping = false;
  }
}
