import { Clientes } from '../../components/clientes/clientes';
import { Component } from '@angular/core';
import { AgentTeams } from '../../components/agent-teams/agent-teams';
import { Benefits } from '../../components/benefits/benefits';
import { Campaigns } from '../../components/campaigns/campaigns';
import { CtaFinal } from '../../components/cta-final/cta-final';
import { ChatDemo } from '../../components/chat-demo/chat-demo';
import { ChatWidget } from '../../components/chat-widget/chat-widget';
import { CustomizeSolution } from '../../components/customize-solution/customize-solution';
import { Diferencial } from '../../components/diferencial/diferencial';
import { Faq } from '../../components/faq/faq';
import { Features } from '../../components/features/features';
import { FollowUp } from '../../components/follow-up/follow-up';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { Pricing } from '../../components/pricing/pricing';
import { SentimentAnalysis } from '../../components/sentiment-analysis/sentiment-analysis';
import { SuccessCases } from '../../components/success-cases/success-cases';
import { Workflow } from '../../components/workflow/workflow';



@Component({
  selector: 'app-home',
  imports: [
    Header,
    Hero,
    Clientes,
    ChatDemo,
    Workflow,
    FollowUp,
    SentimentAnalysis,
    AgentTeams,
    Campaigns,
    Pricing,
    CustomizeSolution,
    Features,
    Benefits,
    Diferencial,
    SuccessCases,
    Faq,
    CtaFinal,
    Footer,
    ChatWidget,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  title = 'IA HelpDesk+ - Plataforma Inteligente de Gestão de Chamados';
}
