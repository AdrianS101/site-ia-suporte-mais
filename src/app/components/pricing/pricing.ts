import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadStripe, Stripe } from '@stripe/stripe-js';

interface Plan {
  id: string;
  name: string;
  price: number | null;
  conversations?: number;
  description: string;
  features: string[];
  buttonText: string;
  featured?: boolean;
  stripeProductId?: string;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
}

@Component({
  selector: 'app-pricing',
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing {
  billingCycle: 'monthly' | 'yearly' = 'monthly';
  private stripe: Stripe | null = null;
  private stripePublicKey = 'pk_test_51SC6E2LBoz46skmaO8x4s5TX4mqDleUsCmLgtHwFHP1cs6wCI7DlUGsKhpMnV92plXPZy5I2kJoo3FHjJLYOyBvq00mxeoIA5c';

  constructor() {
    this.initStripe();
  }

  async initStripe() {
    this.stripe = await loadStripe(this.stripePublicKey);
  }

  plans: Plan[] = [
    {
      id: 'light',
      name: 'LIGHT',
      price: 699,
      conversations: 500,
      description: 'Para pequenas empresas que estão começando',
      features: [
        'WhatsApp integrado',
        'Instagram Direct',
        'CRM integrado',
        'Campanhas automáticas',
        'Follow-up inteligente',
        'Análise de sentimento',
        'Suporte plataforma/IA/telefônico',
        'Implantação em 30 dias'
      ],
      buttonText: 'Começar Agora',
      stripeProductId: 'prod_TTjIEWJCU5XBga',
      stripePriceIdMonthly: 'price_YOUR_MONTHLY_PRICE_ID', // TODO: Add monthly price ID
      stripePriceIdYearly: 'price_YOUR_YEARLY_PRICE_ID' // TODO: Add yearly price ID
    },
    {
      id: 'plus',
      name: 'PLUS',
      price: 999,
      conversations: 1000,
      description: 'Perfeito para empresas em crescimento',
      features: [
        'Tudo do LIGHT +',
        '1.000 conversas mensais',
        'Prioridade no suporte',
        'Relatórios avançados',
        'Integrações premium',
        'API de integração',
        'Treinamento personalizado',
        'Gerente de sucesso dedicado'
      ],
      buttonText: 'Escolher PLUS',
      featured: true,
      stripeProductId: 'prod_YOUR_PLUS_PRODUCT_ID', // TODO: Add PLUS product ID
      stripePriceIdMonthly: 'price_YOUR_PLUS_MONTHLY_PRICE_ID', // TODO: Add monthly price ID
      stripePriceIdYearly: 'price_YOUR_PLUS_YEARLY_PRICE_ID' // TODO: Add yearly price ID
    },
    {
      id: 'max',
      name: 'MAX',
      price: 1299,
      conversations: 2000,
      description: 'Solução completa para negócios estabelecidos',
      features: [
        'Tudo do PLUS +',
        '2.000 conversas mensais',
        'Equipes de agentes IA',
        'Dashboard em tempo real',
        'Automações customizadas',
        'SLA garantido',
        'Suporte prioritário 24/7',
        'Infraestrutura dedicada'
      ],
      buttonText: 'Escolher MAX',
      stripeProductId: 'prod_YOUR_MAX_PRODUCT_ID', // TODO: Add MAX product ID
      stripePriceIdMonthly: 'price_YOUR_MAX_MONTHLY_PRICE_ID', // TODO: Add monthly price ID
      stripePriceIdYearly: 'price_YOUR_MAX_YEARLY_PRICE_ID' // TODO: Add yearly price ID
    }
  ];

  toggleBillingCycle(cycle: 'monthly' | 'yearly'): void {
    this.billingCycle = cycle;
  }

  getPrice(basePrice: number): number {
    if (this.billingCycle === 'yearly') {
      // 20% discount for yearly plans
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
  }

  getSavings(basePrice: number): number {
    return Math.round(basePrice * 0.2);
  }

  async selectPlan(plan: Plan): Promise<void> {
    if (!plan.stripePriceIdMonthly || !plan.stripePriceIdYearly) {
      console.error('Stripe price IDs not configured for this plan');
      alert('Este plano ainda não está configurado. Por favor, entre em contato conosco.');
      return;
    }

    try {
      // Get the correct price ID based on billing cycle
      const priceId = this.billingCycle === 'monthly'
        ? plan.stripePriceIdMonthly
        : plan.stripePriceIdYearly;

      // For now, redirect to Stripe Checkout URL directly
      // In production, you should create this via your backend
      const checkoutUrl = `https://checkout.stripe.com/pay/${priceId}`;

      console.log('Selected plan:', plan.name);
      console.log('Billing cycle:', this.billingCycle);
      console.log('Price ID:', priceId);

      // TODO: Implement backend API to create checkout session
      // For now, just log the information
      alert(`Plano ${plan.name} selecionado!\n\nPara completar a integração, configure o backend conforme instruções em STRIPE_SETUP.md`);

      // Uncomment when backend is ready:
      /*
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          planName: plan.name,
          billingCycle: this.billingCycle
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to checkout
      window.location.href = session.url;
      */
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao processar o pagamento. Por favor, tente novamente ou entre em contato conosco.');
    }
  }
}
