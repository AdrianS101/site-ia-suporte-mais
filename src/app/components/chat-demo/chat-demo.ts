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
    { id: 1, text: 'Não consigo acessar meu e-mail, aparece "senha incorreta" desde hoje cedo.', sender: 'user', visible: false },
    { id: 2, text: 'Resumo do chamado #1842: acesso ao e-mail bloqueado após várias tentativas. Sugestão: redefinir a senha e liberar o bloqueio no Active Directory. Deseja aplicar essa solução?', sender: 'bot', visible: false },
    { id: 3, text: 'Sim, pode aplicar. Já tentei reiniciar e não resolveu.', sender: 'user', visible: false },
    { id: 4, text: 'Bloqueio removido e senha temporária enviada para o seu ramal. Acesse com ela e cadastre uma nova senha. Conseguiu entrar?', sender: 'bot', visible: false },
    { id: 5, text: 'Funcionou, já estou com o e-mail aberto. Obrigado pela agilidade!', sender: 'user', visible: false },
    { id: 6, text: 'Ótimo! Vou marcar o chamado como resolvido. Qualquer novo problema, é só abrir um chamado.', sender: 'bot', visible: false }
  ];

  kanbanCards: KanbanCard[] = [
    { id: 1, title: 'Acesso ao e-mail bloqueado', customer: 'Carlos M.', category: 'Acessos', column: 'new' },
    { id: 2, title: 'Erro ao emitir nota no ERP', customer: 'Maria S.', category: 'Sistemas', column: 'new' },
    { id: 3, title: 'Solicitação de novo notebook', customer: 'João P.', category: 'Infraestrutura', column: 'new' }
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
