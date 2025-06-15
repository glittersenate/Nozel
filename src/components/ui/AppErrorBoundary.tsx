
import React, { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    // Optionally: window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-950 text-center">
          <AlertTriangle className="w-14 h-14 text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-yellow-200 mb-1">Something went wrong...</h2>
          <p className="text-blue-100 mb-4">{this.state.error?.message || "An unexpected error occurred."}</p>
          <Button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold" onClick={this.handleRetry}>
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
