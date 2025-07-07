
import { MariaService } from './mariaService';

interface PageContext {
  route: string;
  pageData: any;
  userActions: string[];
  currentFocus: string | null;
}

export class ContextAwareMariaService extends MariaService {
  private static currentContext: PageContext = {
    route: '/',
    pageData: {},
    userActions: [],
    currentFocus: null
  };

  static setContext(context: Partial<PageContext>) {
    this.currentContext = { ...this.currentContext, ...context };
  }

  static getContext(): PageContext {
    return this.currentContext;
  }

  static async processContextualCommand(input: string): Promise<string> {
    const context = this.getContext();
    
    // Analyze input with context
    const contextualInput = this.addContextToInput(input, context);
    
    // Use parent class logic with enhanced context
    const command = this.parseCommand(contextualInput);
    
    if (command) {
      return await this.executeContextualCommand(command, context);
    }
    
    return this.generateContextualResponse(input, context);
  }

  private static addContextToInput(input: string, context: PageContext): string {
    let contextualInput = input;
    
    // Add route context
    if (context.route !== '/') {
      contextualInput += ` [Current page: ${context.route}]`;
    }
    
    // Add data context
    if (Object.keys(context.pageData).length > 0) {
      contextualInput += ` [Available data: ${Object.keys(context.pageData).join(', ')}]`;
    }
    
    // Add focus context
    if (context.currentFocus) {
      contextualInput += ` [User is looking at: ${context.currentFocus}]`;
    }
    
    return contextualInput;
  }

  private static async executeContextualCommand(command: any, context: PageContext): Promise<string> {
    // Enhanced command execution with context
    switch (command.action) {
      case 'analyze_current_page':
        return this.analyzeCurrentPage(context);
      case 'suggest_next_action':
        return this.suggestNextAction(context);
      case 'explain_data':
        return this.explainCurrentData(context);
      case 'navigate_to':
        return this.suggestNavigation(command.target, context);
      default:
        return await this.executeCommand(command);
    }
  }

  private static analyzeCurrentPage(context: PageContext): string {
    switch (context.route) {
      case '/':
        return "You're on the main dashboard. I can see your payroll metrics, employee stats, and recent activities. What would you like to focus on?";
      case '/employees':
        return "You're viewing the employee management section. I can help you add employees, update records, or analyze workforce data.";
      case '/payroll':
        return "You're in the payroll section. I can help you run payroll, review calculations, or analyze costs.";
      case '/performance':
        return "You're viewing performance management. I can help with reviews, goal tracking, or performance analytics.";
      default:
        return "I can see you're exploring the system. What specific task can I help you with?";
    }
  }

  private static suggestNextAction(context: PageContext): string {
    const suggestions = [
      "Review pending payroll for this month",
      "Check employees needing performance reviews",
      "Analyze department budget allocation",
      "Update employee information",
      "Generate compliance reports"
    ];
    
    return `Based on your current activity, here are some suggested actions: ${suggestions.slice(0, 3).join(', ')}. Which one interests you?`;
  }

  private static explainCurrentData(context: PageContext): string {
    if (Object.keys(context.pageData).length === 0) {
      return "I don't see any specific data on this page to explain. Could you click on a chart or table element you'd like me to analyze?";
    }
    
    return `I can see data about ${Object.keys(context.pageData).join(', ')}. What specific aspect would you like me to explain?`;
  }

  private static suggestNavigation(target: string, context: PageContext): string {
    const routes = {
      employees: '/employees',
      payroll: '/payroll',
      performance: '/performance',
      analytics: '/analytics',
      reports: '/reports'
    };
    
    const route = routes[target.toLowerCase() as keyof typeof routes];
    if (route) {
      return `I'll help you navigate to ${target}. You can find it in the main navigation or I can guide you there.`;
    }
    
    return `I'm not sure about that navigation target. Available sections include: ${Object.keys(routes).join(', ')}.`;
  }

  private static generateContextualResponse(input: string, context: PageContext): string {
    const responses = [
      `I understand you're asking about "${input}". Based on your current location (${context.route}), I can help you with that.`,
      `Let me help you with "${input}". I can see you're currently viewing ${context.route === '/' ? 'the dashboard' : context.route.replace('/', '')}.`,
      `Regarding "${input}" - I can provide assistance based on what you're currently looking at.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
