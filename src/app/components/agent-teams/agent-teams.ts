import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Agent {
  id: number;
  name: string;
  role: string;
  icon: string;
  color: string;
  status: 'idle' | 'active' | 'completed';
  visible: boolean;
}

interface Task {
  id: number;
  text: string;
  fromAgent: number;
  toAgent: number;
  visible: boolean;
}

@Component({
  selector: 'app-agent-teams',
  imports: [CommonModule],
  templateUrl: './agent-teams.html',
  styleUrl: './agent-teams.scss',
})
export class AgentTeams implements OnInit, OnDestroy {
  agents: Agent[] = [
    {
      id: 1,
      name: 'Triagem',
      role: 'Abertura do chamado',
      icon: '👋',
      color: '#10b981',
      status: 'idle',
      visible: false
    },
    {
      id: 2,
      name: 'Atendimento N1',
      role: 'Primeiro nível',
      icon: '💼',
      color: '#3b82f6',
      status: 'idle',
      visible: false
    },
    {
      id: 3,
      name: 'Suporte N2',
      role: 'Atendimento técnico',
      icon: '🛠️',
      color: '#8b5cf6',
      status: 'idle',
      visible: false
    },
    {
      id: 4,
      name: 'Especialista',
      role: 'Resolução final',
      icon: '💰',
      color: '#f59e0b',
      status: 'idle',
      visible: false
    }
  ];

  tasks: Task[] = [];
  animationInterval: any;
  currentStep = 0;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  startAnimation() {
    // Show agents one by one
    setTimeout(() => {
      this.agents.forEach((agent, index) => {
        setTimeout(() => {
          agent.visible = true;
        }, index * 300);
      });
    }, 500);

    // Start workflow animation
    this.animationInterval = setInterval(() => {
      this.animateWorkflow();
    }, 4000);
  }

  animateWorkflow() {
    this.currentStep++;

    switch(this.currentStep) {
      case 1:
        // Agent 1 receives task
        this.setAgentStatus(1, 'active');
        setTimeout(() => {
          this.setAgentStatus(1, 'completed');
          this.addTask('Chamado classificado', 1, 2);
        }, 1500);
        break;

      case 2:
        // Agent 2 processes
        this.setAgentStatus(2, 'active');
        setTimeout(() => {
          this.setAgentStatus(2, 'completed');
          this.addTask('Resposta inicial enviada', 2, 3);
        }, 1500);
        break;

      case 3:
        // Agent 3 processes
        this.setAgentStatus(3, 'active');
        setTimeout(() => {
          this.setAgentStatus(3, 'completed');
          this.addTask('Diagnóstico concluído', 3, 4);
        }, 1500);
        break;

      case 4:
        // Agent 4 finalizes
        this.setAgentStatus(4, 'active');
        setTimeout(() => {
          this.setAgentStatus(4, 'completed');
          this.addTask('Chamado resolvido', 4, 0);

          // Reset after completion
          setTimeout(() => {
            this.resetAnimation();
          }, 2000);
        }, 1500);
        break;
    }
  }

  setAgentStatus(agentId: number, status: 'idle' | 'active' | 'completed') {
    const agent = this.agents.find(a => a.id === agentId);
    if (agent) {
      agent.status = status;
    }
  }

  addTask(text: string, fromAgent: number, toAgent: number) {
    const task: Task = {
      id: Date.now(),
      text,
      fromAgent,
      toAgent,
      visible: false
    };
    this.tasks.push(task);

    setTimeout(() => {
      task.visible = true;
    }, 100);
  }

  resetAnimation() {
    this.agents.forEach(agent => agent.status = 'idle');
    this.tasks = [];
    this.currentStep = 0;
  }

  getAgentPosition(agentId: number): { x: number, y: number } {
    const positions = [
      { x: 15, y: 35 },  // Agent 1 - Triagem
      { x: 38, y: 15 },  // Agent 2 - Atendimento N1
      { x: 62, y: 15 },  // Agent 3 - Suporte N2
      { x: 85, y: 35 }   // Agent 4 - Especialista
    ];
    return positions[agentId - 1] || { x: 50, y: 50 };
  }
}
