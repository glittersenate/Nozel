
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
  // Parse natural language commands
  static parseCommand(input: string): AICommand | null {
    const lowerInput = input.toLowerCase();

    // Add employee to payroll pattern
    const payrollMatch = lowerInput.match(/add\s+(\w+)\s+.*payroll.*(\d+k?)/i);
    if (payrollMatch) {
      return {
        action: 'add_to_payroll',
        entity: 'employee',
        parameters: {
          name: payrollMatch[1],
          salary: payrollMatch[2]
        },
        confidence: 0.9
      };
    }

    // Show performance reviews pattern
    if (lowerInput.includes('performance') || lowerInput.includes('review')) {
      return {
        action: 'show_performance',
        entity: 'reviews',
        parameters: {},
        confidence: 0.8
      };
    }

    // Leave management pattern
    const leaveMatch = lowerInput.match(/schedule\s+leave\s+for\s+(\w+)/i);
    if (leaveMatch) {
      return {
        action: 'schedule_leave',
        entity: 'employee',
        parameters: {
          name: leaveMatch[1]
        },
        confidence: 0.85
      };
    }

    return null;
  }

  // Execute parsed commands
  static async executeCommand(command: AICommand): Promise<string> {
    try {
      switch (command.action) {
        case 'add_to_payroll':
          return await this.addToPayroll(command.parameters);
        
        case 'show_performance':
          return await this.showPerformance();
        
        case 'schedule_leave':
          return await this.scheduleLeave(command.parameters);
        
        default:
          return "I'm not sure how to handle that request. Could you be more specific?";
      }
    } catch (error) {
      console.error('Error executing command:', error);
      return "I encountered an error while processing your request. Please try again.";
    }
  }

  private static async addToPayroll(params: any): Promise<string> {
    // This would integrate with your employee store
    const { name, salary } = params;
    
    // Simulate adding to payroll
    console.log(`Adding ${name} to payroll with salary ${salary}`);
    
    return `I've prepared to add ${name} to the payroll system with a salary of ${salary}. This action requires final approval from an authorized user. Would you like me to proceed with the addition?`;
  }

  private static async showPerformance(): Promise<string> {
    // This would integrate with your HR store
    console.log('Fetching performance data');
    
    return "I can show you performance reviews and metrics. Here are the recent performance highlights: 8 reviews completed this month with an average rating of 4.3/5. Would you like to see detailed reports for any specific employee?";
  }

  private static async scheduleLeave(params: any): Promise<string> {
    // This would integrate with your leave store
    const { name } = params;
    
    console.log(`Scheduling leave for ${name}`);
    
    return `I can help schedule leave for ${name}. Please provide the dates and type of leave (vacation, sick, personal) you'd like to schedule, and I'll check their available balance and create the request.`;
  }
}
