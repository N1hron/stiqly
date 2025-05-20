import { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children?: ReactNode;
  fallback?: ReactNode | ((message: string, restore: () => void) => ReactNode);
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: unknown) {
    let message = 'Unexpected error occured';
    if (error instanceof Error) {
      message = error.message;
    }

    return { hasError: true, message };
  }

  restore() {
    this.setState({
      hasError: false,
      message: '',
    });
  }

  render() {
    const fallback = this.props.fallback;
    if (this.state.hasError) {
      if (typeof fallback === 'function') {
        const restore = this.restore.bind(this);
        return fallback(this.state.message, restore);
      } else {
        return fallback;
      }
    } else {
      return this.props.children;
    }
  }
}

export { ErrorBoundary };
