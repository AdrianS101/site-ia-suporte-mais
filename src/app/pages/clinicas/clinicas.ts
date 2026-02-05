import { Component } from '@angular/core';
import { HeaderClinicas } from '../../components/clinicas/header-clinicas/header-clinicas';
import { HeroClinicas } from '../../components/clinicas/hero-clinicas/hero-clinicas';
import { LiveDashboard } from '../../components/clinicas/live-dashboard/live-dashboard';
import { Telemedicine } from '../../components/clinicas/telemedicine/telemedicine';
import { SentimentAnalysis } from '../../components/sentiment-analysis/sentiment-analysis';
import { AgentTeams } from '../../components/agent-teams/agent-teams';
import { Workflow } from '../../components/workflow/workflow';
import { CustomizeSolution } from '../../components/customize-solution/customize-solution';
import { Footer } from '../../components/footer/footer';
import { ChatWidget } from '../../components/chat-widget/chat-widget';

@Component({
  selector: 'app-clinicas',
  imports: [HeaderClinicas, HeroClinicas, LiveDashboard, Telemedicine, SentimentAnalysis, AgentTeams, Workflow, CustomizeSolution, Footer, ChatWidget],
  templateUrl: './clinicas.html',
  styleUrl: './clinicas.scss'
})
export class ClinicasPage {}
