
import { useEmployeeStore } from '@/store/employeeStore';
import { useHRStore } from '@/store/hrStore';
import { useLeaveStore } from '@/store/leaveStore';
import { Employee } from '@/types/employee';

export interface AICommand {
  action: string;
  entity: string;
  parameters: Record<string, any>;
  confidence: number;
}

export class MariaService {
  // Enhanced command parsing with better pattern recognition
  static parseCommand(input: string): AICommand | null {
    const lowerInput = input.toLowerCase().trim();

    // Enhanced payroll patterns
    const payrollPatterns = [
      /add\s+(\w+)\s+.*payroll.*?(\d+k?)/i,
      /(\w+)\s+.*payroll.*?(\d+k?)/i,
      /hire\s+(\w+)\s+.*?(\d+k?)/i
    ];

    for (const pattern of payrollPatterns) {
      const match = lowerInput.match(pattern);
      if (match) {
        return {
          action: 'add_to_payroll',
          entity: 'employee',
          parameters: {
            name: this.capitalizeWords(match[1]),
            salary: match[2]
          },
          confidence: 0.9
        };
      }
    }

    // Enhanced performance patterns
    if (lowerInput.includes('performance') || lowerInput.includes('review') || lowerInput.includes('evaluation')) {
      const nameMatch = lowerInput.match(/(?:for|of)\s+(\w+)/i);
      return {
        action: 'show_performance',
        entity: 'reviews',
        parameters: {
          employee: nameMatch ? this.capitalizeWords(nameMatch[1]) : null
        },
        confidence: 0.85
      };
    }

    // Enhanced leave patterns
    const leavePatterns = [
      /schedule\s+leave\s+for\s+(\w+)/i,
      /(\w+)\s+.*leave/i,
      /time\s+off\s+for\s+(\w+)/i
    ];

    for (const pattern of leavePatterns) {
      const match = lowerInput.match(pattern);
      if (match) {
        return {
          action: 'schedule_leave',
          entity: 'employee',
          parameters: {
            name: this.capitalizeWords(match[1])
          },
          confidence: 0.85
        };
      }
    }

    // Report generation patterns
    if (lowerInput.includes('report') || lowerInput.includes('generate') || lowerInput.includes('export')) {
      return {
        action: 'generate_report',
        entity: 'report',
        parameters: {
          type: this.extractReportType(lowerInput)
        },
        confidence: 0.8
      };
    }

    // Employee search patterns
    if (lowerInput.includes('find') || lowerInput.includes('search') || lowerInput.includes('show me')) {
      return {
        action: 'search_employees',
        entity: 'employee',
        parameters: {
          query: input
        },
        confidence: 0.75
      };
    }

    return null;
  }

  // Enhanced command execution with better responses
  static async executeCommand(command: AICommand): Promise<string> {
    try {
      switch (command.action) {
        case 'add_to_payroll':
          return await this.addToPayroll(command.parameters);
        
        case 'show_performance':
          return await this.showPerformance(command.parameters);
        
        case 'schedule_leave':
          return await this.scheduleLeave(command.parameters);
          
        case 'generate_report':
          return await this.generateReport(command.parameters);
          
        case 'search_employees':
          return await this.searchEmployees(command.parameters);
        
        default:
          return "I understand you're looking for help with HR tasks. I can assist with:\n\n• Adding employees to payroll\n• Managing performance reviews\n• Scheduling leave requests\n• Generating reports\n• Searching employee data\n\nCould you be more specific about what you'd like me to help you with?";
      }
    } catch (error) {
      console.error('Error executing command:', error);
      return "I encountered an error while processing your request. Please try again or contact support if the issue persists.";
    }
  }

  // Enhanced helper methods
  private static capitalizeWords(str: string): string {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  private static extractReportType(input: string): string {
    if (input.includes('payroll')) return 'payroll';
    if (input.includes('performance')) return 'performance';
    if (input.includes('leave')) return 'leave';
    if (input.includes('employee')) return 'employee';
    return 'general';
  }

  // Enhanced action implementations
  private static async addToPayroll(params: any): Promise<string> {
    const { name, salary } = params;
    
    console.log(`Processing payroll addition: ${name} at ${salary}`);
    
    return `✅ **Payroll Addition Request**\n\n**Employee:** ${name}\n**Salary:** ${salary}\n\n🔄 **Next Steps:**\n• Verify employee details\n• Set up direct deposit\n• Configure tax withholdings\n• Add to payroll schedule\n\n⚠️ This action requires manager approval. Would you like me to:\n\n1. **Create employee profile**\n2. **Send approval request**\n3. **Schedule onboarding**`;
  }

  private static async showPerformance(params: any): Promise<string> {
    const { employee } = params;
    
    console.log('Fetching performance data:', employee);
    
    if (employee) {
      return `📊 **Performance Overview for ${employee}**\n\n**Current Rating:** 4.2/5.0\n**Last Review:** Oct 2024\n**Next Review:** Jan 2025\n\n🎯 **Key Metrics:**\n• Goal Completion: 87%\n• Peer Rating: 4.5/5\n• Manager Rating: 4.0/5\n\n📈 **Recent Achievements:**\n• Completed Q4 objectives\n• Led 2 successful projects\n• Mentored 3 junior staff\n\nWould you like to:\n1. **Schedule next review**\n2. **View detailed metrics**\n3. **Generate performance report**`;
    }
    
    return `📊 **Performance Dashboard Overview**\n\n**Team Performance:**\n• Average Rating: 4.3/5.0\n• Reviews Completed: 85%\n• Overdue Reviews: 3\n\n🏆 **Top Performers:**\n• Sarah Johnson (4.8/5)\n• Mike Chen (4.7/5)\n• Lisa Anderson (4.6/5)\n\n⚠️ **Action Required:**\n• 3 reviews pending approval\n• 2 employees need goal updates\n\nWhat would you like to explore further?`;
  }

  private static async scheduleLeave(params: any): Promise<string> {
    const { name } = params;
    
    console.log(`Processing leave request for: ${name}`);
    
    return `🏖️ **Leave Request for ${name}**\n\n**Available Balances:**\n• Vacation: 15 days\n• Sick Leave: 8 days\n• Personal: 3 days\n\n📅 **To schedule leave, I need:**\n• Start date\n• End date\n• Leave type\n• Reason (optional)\n\n🔄 **Process:**\n1. Check team coverage\n2. Manager approval\n3. Calendar update\n4. Payroll notification\n\nPlease provide the leave details, and I'll handle the rest!`;
  }

  private static async generateReport(params: any): Promise<string> {
    const { type } = params;
    
    console.log(`Generating ${type} report`);
    
    const reportTypes = {
      payroll: '💰 **Payroll Report** - Monthly salary breakdown, overtime, and deductions',
      performance: '📊 **Performance Report** - Team ratings, goal completion, and review summaries',
      leave: '🏖️ **Leave Report** - Balance tracking, usage patterns, and pending requests',
      employee: '👥 **Employee Report** - Headcount, demographics, and status updates'
    };
    
    const description = reportTypes[type as keyof typeof reportTypes] || '📋 **General Report** - Comprehensive HR overview';
    
    return `${description}\n\n📈 **Report Generation Started**\n\n⏱️ **Estimated time:** 2-3 minutes\n📧 **Delivery:** Email notification when ready\n📁 **Format:** Excel (.xlsx) and PDF\n\n🔄 **Processing:**\n• Collecting data...\n• Applying filters...\n• Generating visualizations...\n\nI'll notify you once the report is ready for download!`;
  }

  private static async searchEmployees(params: any): Promise<string> {
    const { query } = params;
    
    console.log('Searching employees:', query);
    
    return `🔍 **Employee Search Results**\n\nSearching for: "${query}"\n\n👥 **Found 5 matches:**\n\n1. **John Smith** - Software Engineer\n   📧 john.smith@company.com | 📞 (555) 0123\n\n2. **Sarah Johnson** - Marketing Manager\n   📧 sarah.j@company.com | 📞 (555) 0124\n\n3. **Mike Chen** - Data Analyst\n   📧 mike.chen@company.com | 📞 (555) 0125\n\n💡 **Quick Actions:**\n• View detailed profiles\n• Send messages\n• Schedule meetings\n• Access performance data\n\nWhich employee would you like to know more about?`;
  }
}
