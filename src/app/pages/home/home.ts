import { Component } from '@angular/core';
import { AgentTeams } from '../../components/agent-teams/agent-teams';
import { Campaigns } from '../../components/campaigns/campaigns';
import { ChatDemo } from '../../components/chat-demo/chat-demo';
import { ChatWidget } from '../../components/chat-widget/chat-widget';
import { CustomizeSolution } from '../../components/customize-solution/customize-solution';
import { FollowUp } from '../../components/follow-up/follow-up';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { Pricing } from '../../components/pricing/pricing';
import { SentimentAnalysis } from '../../components/sentiment-analysis/sentiment-analysis';
import { Workflow } from '../../components/workflow/workflow';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Hero,
    ChatDemo,
    Workflow,
    FollowUp,
    SentimentAnalysis,
    AgentTeams,
    Campaigns,
    Pricing,
    CustomizeSolution,
    Footer,
    ChatWidget,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  title = 'IA ATENDE MAIS';
}
