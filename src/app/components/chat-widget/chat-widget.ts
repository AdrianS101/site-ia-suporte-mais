import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { NgxMaskDirective } from 'ngx-mask';

interface ChatMessage {
  id: number;
  text: string;
  htmlContent?: SafeHtml;
  sender: 'user' | 'agent';
  timestamp: Date;
  isTyping?: boolean;
  displayedText?: string;
}

interface ApiResponse {
  status: string;
  message: string;
}

interface ApiRequest {
  canal_id: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  message: {
    id: string;
    text: string;
    type: string;
    attachment: null | string;
  };
}

@Component({
  selector: 'app-chat-widget',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.scss',
})
export class ChatWidget implements OnInit, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer?: ElementRef;
  isOpen = false;
  isMinimized = false;
  messages: ChatMessage[] = [];
  newMessage = '';
  isTyping = false;
  shouldScrollToBottom = false;

  // Contact form
  showContactForm = true;
  userName = '';
  userEmail = '';
  userPhone = '';
  isSubmittingContact = false;

  // API configuration
  private readonly API_URL =
    'https://vigia.novetalk.com.br/api/integracao/webchat';
  private readonly CANAL_ID = 48;
  private userId = '';
  private sessionId = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    // Generate unique user ID and session ID
    this.userId = `user_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    this.sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }

  ngOnInit() {
    // Don't show welcome message until contact form is submitted
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
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.isMinimized = false;
    if (this.isOpen) {
      setTimeout(() => {
        this.shouldScrollToBottom = true;
      }, 100);
    }
  }

  minimizeChat() {
    this.isMinimized = !this.isMinimized;
  }

  closeChat() {
    this.isOpen = false;
    this.isMinimized = false;
  }

  submitContactForm() {
    if (
      !this.userName.trim() ||
      !this.userEmail.trim() ||
      !this.userPhone.trim()
    ) {
      return;
    }

    this.isSubmittingContact = true;

    // Send initial message to API
    const initialMessage = `Olá! Meu nome é ${this.userName}, meu e-mail é ${this.userEmail} e meu telefone é ${this.userPhone}.`;

    this.sendToApi(initialMessage).subscribe({
      next: (response: ApiResponse) => {
        this.isSubmittingContact = false;
        this.showContactForm = false;

        // Add agent's welcome message
        if (response.status === 'success' && response.message) {
          this.addAgentMessage(response.message);
        }
      },
      error: (error) => {
        console.error('Erro ao conectar com o agente:', error);
        this.isSubmittingContact = false;
        this.showContactForm = false;
        this.addAgentMessage(
          'Olá! Bem-vindo ao chat da IA Suporte+. Como posso ajudar você hoje?',
        );
      },
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const messageText = this.newMessage.trim();

    // Add user message
    this.messages.push({
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    });

    this.newMessage = '';
    this.shouldScrollToBottom = true;

    // Show typing indicator
    this.isTyping = true;
    this.shouldScrollToBottom = true;

    // Send to API
    this.sendToApi(messageText).subscribe({
      next: (response: ApiResponse) => {
        this.isTyping = false;
        if (response.status === 'success' && response.message) {
          this.addAgentMessage(response.message);
        } else {
          this.addAgentMessage(
            'Desculpe, ocorreu um erro. Por favor, tente novamente.',
          );
        }
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.isTyping = false;
        this.addAgentMessage(
          'Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.',
        );
      },
    });
  }

  private sendToApi(messageText: string) {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const body: ApiRequest = {
      canal_id: this.CANAL_ID,
      user: {
        id: this.userId,
        name: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
      },
      message: {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        text: messageText,
        type: 'text',
        attachment: null,
      },
    };

    return this.http.post<ApiResponse>(this.API_URL, body, { headers });
  }

  addAgentMessage(text: string) {
    // Create message with typing state
    const message: ChatMessage = {
      id: Date.now(),
      text,
      htmlContent: undefined,
      sender: 'agent',
      timestamp: new Date(),
      isTyping: true,
      displayedText: '',
    };

    this.messages.push(message);
    this.shouldScrollToBottom = true;

    // Start typing effect
    this.typeMessage(message, text);
  }

  private typeMessage(message: ChatMessage, fullText: string) {
    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentIndex++;
        message.displayedText = fullText.substring(0, currentIndex);
        message.htmlContent = this.parseMarkdown(message.displayedText);
        this.shouldScrollToBottom = true;
      } else {
        // Typing complete
        message.isTyping = false;
        message.displayedText = fullText;
        message.htmlContent = this.parseMarkdown(fullText);
        clearInterval(typeInterval);
      }
    }, typingSpeed);
  }

  private parseMarkdown(text: string): SafeHtml {
    const html = marked.parse(text);
    return this.sanitizer.sanitize(1, html) || '';
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
