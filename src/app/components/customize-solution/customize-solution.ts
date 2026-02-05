import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { LeadService } from '../../services/lead.service';
import { ToastService } from '../../services/toast.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Subscription } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

interface SolutionOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  selected: boolean;
}

@Component({
  selector: 'app-customize-solution',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './customize-solution.html',
  styleUrl: './customize-solution.scss',
})
export class CustomizeSolution implements OnInit, OnDestroy {
  showModal = false;
  isSubmitting = false;
  budgetForm: FormGroup;
  contactForm: FormGroup;
  private modalSubscription?: Subscription;
  private budgetFormInteractionTracked = false;
  private contactFormInteractionTracked = false;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private leadService: LeadService,
    private toastService: ToastService,
    private analyticsService: AnalyticsService,
  ) {
    this.budgetForm = this.fb.group({
      users: [null, [Validators.required, Validators.min(1)]],
      monthlyVolume: [null, [Validators.required, Validators.min(0)]],
      dispatchVolume: [null, [Validators.required, Validators.min(0)]],
      integrations: ['', Validators.required],
    });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.modalSubscription = this.modalService.budgetModal$.subscribe(
      (shouldOpen) => {
        if (shouldOpen) {
          this.showModal = true;
          document.body.style.overflow = 'hidden';
        }
      },
    );

    // Rastrear quando usuário começar a preencher o formulário de orçamento
    this.budgetForm.valueChanges.subscribe(() => {
      if (!this.budgetFormInteractionTracked && !this.budgetForm.pristine) {
        this.analyticsService.trackFormInteractionStart('budget_form');
        this.budgetFormInteractionTracked = true;
      }
    });

    // Rastrear quando usuário começar a preencher o formulário de contato
    this.contactForm.valueChanges.subscribe(() => {
      if (!this.contactFormInteractionTracked && !this.contactForm.pristine) {
        this.analyticsService.trackFormInteractionStart('contact_form');
        this.contactFormInteractionTracked = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  options: SolutionOption[] = [
    {
      id: 'chat-ia',
      icon: 'message-circle',
      title: 'Chat com IA',
      description: 'Agente inteligente para atendimento 24/7',
      category: 'Atendimento',
      selected: false,
    },
    {
      id: 'whatsapp',
      icon: 'phone',
      title: 'WhatsApp',
      description: 'Integração completa com WhatsApp Business',
      category: 'Canais',
      selected: false,
    },
    {
      id: 'workflows',
      icon: 'workflow',
      title: 'Workflows',
      description: 'Automatize processos com fluxos visuais',
      category: 'Automação',
      selected: false,
    },
    {
      id: 'crm',
      icon: 'database',
      title: 'CRM Integration',
      description: 'Conecte com seu CRM favorito',
      category: 'Integrações',
      selected: false,
    },
    {
      id: 'instagram',
      icon: 'instagram',
      title: 'Instagram',
      description: 'Atenda clientes via Direct do Instagram',
      category: 'Canais',
      selected: false,
    },
    {
      id: 'analytics',
      icon: 'chart',
      title: 'Analytics',
      description: 'Métricas e relatórios em tempo real',
      category: 'Gestão',
      selected: false,
    },
    {
      id: 'telegram',
      icon: 'send',
      title: 'Telegram',
      description: 'Suporte através do Telegram',
      category: 'Canais',
      selected: false,
    },
    {
      id: 'api',
      icon: 'code',
      title: 'API Custom',
      description: 'Integre com qualquer sistema via API',
      category: 'Integrações',
      selected: false,
    },
    {
      id: 'ecommerce',
      icon: 'shopping-cart',
      title: 'E-commerce',
      description: 'Integração com lojas virtuais e pagamentos',
      category: 'Vendas',
      selected: false,
    },
    {
      id: 'agendamento',
      icon: 'calendar',
      title: 'Agendamento',
      description: 'Sistema de agendamento inteligente',
      category: 'Gestão',
      selected: false,
    },
    {
      id: 'campanhas',
      icon: 'megaphone',
      title: 'Campanhas',
      description: 'Envio de campanhas em massa personalizadas',
      category: 'Marketing',
      selected: false,
    },
    {
      id: 'times',
      icon: 'users',
      title: 'Times de Agentes',
      description: 'Gerencie equipes e distribua atendimentos',
      category: 'Gestão',
      selected: false,
    },
  ];

  toggleOption(option: SolutionOption) {
    option.selected = !option.selected;
  }

  get selectedOptions() {
    return this.options.filter((opt) => opt.selected);
  }

  get selectedCount() {
    return this.selectedOptions.length;
  }

  openModal(event: Event) {
    event.preventDefault();

    // Marca todos os campos como tocados para mostrar erros
    Object.keys(this.budgetForm.controls).forEach((key) => {
      this.budgetForm.get(key)?.markAsTouched();
    });

    if (this.budgetForm.valid) {
      // Rastrear clique no botão "Fale Conosco"
      const budgetData = this.budgetForm.value;
      const selectedModules = this.selectedOptions.map((opt) => opt.title);

      this.analyticsService.trackBudgetRequestClick({
        users: budgetData.users,
        monthlyVolume: budgetData.monthlyVolume,
        dispatchVolume: budgetData.dispatchVolume,
        integrations: budgetData.integrations,
        selectedModules: selectedModules,
      });

      this.showModal = true;
      document.body.style.overflow = 'hidden';

      // Rastrear abertura do modal
      this.analyticsService.trackModalOpen('budget_contact');
    } else {
      // Rastrear erro de validação
      this.analyticsService.trackFormError('validation_error', 'budget_form');
      console.log('Formulário inválido:', this.budgetForm.value);
      console.log('Erros:', this.budgetForm.errors);
    }
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
    this.modalService.closeBudgetModal();
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const budgetData = this.budgetForm.value;
      const contactData = this.contactForm.value;
      const selectedModules = this.selectedOptions.map((opt) => opt.title);

      // Preparar dados no formato esperado pela API
      const leadData = {
        contato: {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone.replace(/\D/g, ''), // Remove formatação do telefone
          company: contactData.company,
        },
        modulos: selectedModules,
        orcamento: {
          dispatchVolume: budgetData.dispatchVolume,
          integrations: budgetData.integrations,
          monthlyVolume: budgetData.monthlyVolume,
          users: budgetData.users,
        },
        empresa_id: 7,
        canal_id: 48,
      };

      // Enviar para a API
      this.leadService.sendLead(leadData).subscribe({
        next: (response) => {
          console.log('Lead enviado com sucesso:', response);
          this.isSubmitting = false;

          // Rastrear fim de interação com formulários
          this.analyticsService.trackFormInteractionEnd('budget_form');
          this.analyticsService.trackFormInteractionEnd('contact_form');

          // Rastrear conversão bem-sucedida no Google Analytics
          this.analyticsService.trackFormSubmit({
            name: contactData.name,
            company: contactData.company,
            email: contactData.email,
            phone: contactData.phone,
            selectedModules: selectedModules,
            users: budgetData.users,
            monthlyVolume: budgetData.monthlyVolume,
            dispatchVolume: budgetData.dispatchVolume,
          });

          this.closeModal();
          this.budgetForm.reset();
          this.contactForm.reset();
          this.options.forEach((opt) => (opt.selected = false));

          // Mostrar toast de sucesso após fechar o modal
          setTimeout(() => {
            this.toastService.success(
              'Orçamento solicitado com sucesso! Entraremos em contato em breve.',
            );
          }, 300);
        },
        error: (error) => {
          console.error('Erro ao enviar lead:', error);
          this.isSubmitting = false;

          // Rastrear erro de submissão
          this.analyticsService.trackFormError(
            'submission_error',
            'budget_contact',
          );

          this.toastService.error(
            'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.',
          );
        },
      });
    } else if (!this.contactForm.valid) {
      // Rastrear erro de validação no formulário de contato
      this.analyticsService.trackFormError('validation_error', 'contact_form');
    }
  }
}
