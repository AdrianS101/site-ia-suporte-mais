import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Campaign {
  id: number;
  name: string;
  sent: number;
  total: number;
  status: 'preparing' | 'sending' | 'completed';
}

interface Customer {
  id: number;
  name: string;
  message: string;
  status: 'waiting' | 'responding' | 'completed';
  visible: boolean;
  agentIcon: string;
}

@Component({
  selector: 'app-campaigns',
  imports: [CommonModule],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.scss',
})
export class Campaigns implements OnInit, OnDestroy {
  campaign: Campaign = {
    id: 1,
    name: 'Promoção Black Friday',
    sent: 0,
    total: 1000,
    status: 'preparing'
  };

  customers: Customer[] = [
    {
      id: 1,
      name: 'João Silva',
      message: 'Olá! Vi a promoção, como funciona?',
      status: 'waiting',
      visible: false,
      agentIcon: '👋'
    },
    {
      id: 2,
      name: 'Maria Santos',
      message: 'Quero saber mais sobre o desconto',
      status: 'waiting',
      visible: false,
      agentIcon: '💼'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      message: 'Qual o prazo de entrega?',
      status: 'waiting',
      visible: false,
      agentIcon: '🛠️'
    },
    {
      id: 4,
      name: 'Ana Lima',
      message: 'Gostaria de fazer um pedido',
      status: 'waiting',
      visible: false,
      agentIcon: '💰'
    }
  ];

  animationInterval: any;
  currentStep = 0;
  progressInterval: any;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  startAnimation() {
    // Start campaign sending
    setTimeout(() => {
      this.campaign.status = 'sending';
      this.startProgress();
    }, 1000);

    // Show customers and start responses
    setTimeout(() => {
      this.animateCustomers();
    }, 2000);

    // Reset animation
    this.animationInterval = setInterval(() => {
      this.resetAnimation();
      setTimeout(() => {
        this.campaign.status = 'sending';
        this.startProgress();
        this.animateCustomers();
      }, 1000);
    }, 15000);
  }

  startProgress() {
    this.progressInterval = setInterval(() => {
      if (this.campaign.sent < this.campaign.total) {
        this.campaign.sent += 50;
        if (this.campaign.sent > this.campaign.total) {
          this.campaign.sent = this.campaign.total;
        }
      } else {
        this.campaign.status = 'completed';
        if (this.progressInterval) {
          clearInterval(this.progressInterval);
        }
      }
    }, 200);
  }

  animateCustomers() {
    this.customers.forEach((customer, index) => {
      setTimeout(() => {
        customer.visible = true;

        setTimeout(() => {
          customer.status = 'responding';

          setTimeout(() => {
            customer.status = 'completed';
          }, 1500);
        }, 500);
      }, index * 800);
    });
  }

  resetAnimation() {
    this.campaign.sent = 0;
    this.campaign.status = 'preparing';
    this.customers.forEach(customer => {
      customer.visible = false;
      customer.status = 'waiting';
    });
    this.currentStep = 0;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  getProgress(): number {
    return (this.campaign.sent / this.campaign.total) * 100;
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'waiting': return '#f59e0b';
      case 'responding': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'waiting': return 'Aguardando';
      case 'responding': return 'Respondendo';
      case 'completed': return 'Finalizado';
      default: return 'Aguardando';
    }
  }

  getVisibleCustomersCount(): number {
    return this.customers.filter(c => c.visible).length;
  }
}
