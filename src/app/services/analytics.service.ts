import { Injectable } from '@angular/core';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private sectionTimers: Map<string, number> = new Map();
  private sessionStartTime: number = Date.now();
  private lastScrollDepth: number = 0;

  constructor() {
    this.initializeSessionTracking();
  }

  /**
   * Rastreia pageview — chamado a cada navegação de rota (SPA)
   */
  trackPageView(url: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-1SD2VR904K', {
        page_path: url,
      });
      console.log('GA PageView:', url);
    }
  }

  /**
   * Envia um evento customizado para o Google Analytics
   */
  trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
      console.log('GA Event:', eventName, eventParams);
    }
  }

  /**
   * Inicializa o rastreamento de sessão
   */
  private initializeSessionTracking() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.trackSessionEnd();
      });

      this.setupScrollTracking();

      setInterval(() => {
        this.trackSessionProgress();
      }, 30000);
    }
  }

  /**
   * Inicia o rastreamento de tempo em uma seção específica
   */
  startSectionTimer(sectionName: string) {
    this.sectionTimers.set(sectionName, Date.now());

    this.trackEvent('section_view', {
      event_category: 'engagement',
      event_label: `Visualizando ${sectionName}`,
      section_name: sectionName,
    });
  }

  /**
   * Para o rastreamento de tempo em uma seção e envia o evento
   */
  endSectionTimer(sectionName: string) {
    const startTime = this.sectionTimers.get(sectionName);
    if (startTime) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      this.sectionTimers.delete(sectionName);

      this.trackEvent('section_time', {
        event_category: 'engagement',
        event_label: `Tempo em ${sectionName}`,
        section_name: sectionName,
        time_seconds: timeSpent,
        time_minutes: Math.round((timeSpent / 60) * 10) / 10,
      });
    }
  }

  /**
   * Configura o rastreamento de profundidade de scroll
   */
  private setupScrollTracking() {
    if (typeof window === 'undefined') return;

    let scrollTimeout: any;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100,
        );

        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
          if (
            scrollPercentage >= milestone &&
            this.lastScrollDepth < milestone
          ) {
            this.lastScrollDepth = milestone;
            this.trackScrollDepth(milestone);
            break;
          }
        }
      }, 150);
    });
  }

  trackScrollDepth(depth: number) {
    this.trackEvent('scroll_depth', {
      event_category: 'engagement',
      event_label: `Scroll ${depth}%`,
      scroll_percentage: depth,
    });
  }

  private trackSessionProgress() {
    const sessionTime = Math.round((Date.now() - this.sessionStartTime) / 1000);

    this.trackEvent('session_progress', {
      event_category: 'engagement',
      event_label: 'Sessão ativa',
      session_time_seconds: sessionTime,
      session_time_minutes: Math.round(sessionTime / 60),
    });
  }

  private trackSessionEnd() {
    const sessionTime = Math.round((Date.now() - this.sessionStartTime) / 1000);

    this.trackEvent('session_end', {
      event_category: 'engagement',
      event_label: 'Fim da sessão',
      total_session_time_seconds: sessionTime,
      total_session_time_minutes: Math.round(sessionTime / 60),
      max_scroll_depth: this.lastScrollDepth,
    });
  }

  trackFormInteractionStart(formName: string) {
    this.startSectionTimer(`form_${formName}`);

    this.trackEvent('form_interaction_start', {
      event_category: 'engagement',
      event_label: `Começou a interagir com ${formName}`,
      form_name: formName,
    });
  }

  trackFormInteractionEnd(formName: string) {
    this.endSectionTimer(`form_${formName}`);
  }

  trackBudgetRequestClick(formData: {
    users?: number;
    monthlyVolume?: number;
    dispatchVolume?: number;
    integrations?: string;
    selectedModules?: string[];
  }) {
    this.trackEvent('budget_request_click', {
      event_category: 'engagement',
      event_label: 'Formulário de Orçamento - Clique',
      users: formData.users || 0,
      monthly_volume: formData.monthlyVolume || 0,
      dispatch_volume: formData.dispatchVolume || 0,
      integrations: formData.integrations || 'none',
      selected_modules_count: formData.selectedModules?.length || 0,
      selected_modules: formData.selectedModules?.join(', ') || 'none',
    });
  }

  trackModalOpen(modalType: string = 'budget_contact') {
    this.trackEvent('modal_open', {
      event_category: 'engagement',
      event_label: 'Modal de Contato Aberto',
      modal_type: modalType,
    });
  }

  trackFormStart(formType: string = 'budget_contact') {
    this.trackEvent('form_start', {
      event_category: 'engagement',
      event_label: 'Formulário Iniciado',
      form_type: formType,
    });
  }

  trackFormSubmit(formData: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    selectedModules?: string[];
    users?: number;
    monthlyVolume?: number;
    dispatchVolume?: number;
  }) {
    this.trackEvent('generate_lead', {
      event_category: 'conversion',
      event_label: 'Orçamento Solicitado',
      company: formData.company || 'not_provided',
      selected_modules_count: formData.selectedModules?.length || 0,
      users: formData.users || 0,
      monthly_volume: formData.monthlyVolume || 0,
      value: this.calculateLeadValue(formData),
    });

    this.trackEvent('conversion', {
      event_category: 'conversion',
      event_label: 'Budget Request Completed',
      conversion_type: 'budget_request',
    });
  }

  trackFormError(errorType: string, formType: string = 'budget_contact') {
    this.trackEvent('form_error', {
      event_category: 'engagement',
      event_label: 'Erro no Formulário',
      form_type: formType,
      error_type: errorType,
    });
  }

  private calculateLeadValue(formData: {
    users?: number;
    monthlyVolume?: number;
    dispatchVolume?: number;
    selectedModules?: string[];
  }): number {
    const userValue = (formData.users || 0) * 50;
    const volumeValue = Math.min((formData.monthlyVolume || 0) / 100, 500);
    const moduleValue = (formData.selectedModules?.length || 0) * 100;

    return Math.round(userValue + volumeValue + moduleValue);
  }
}
