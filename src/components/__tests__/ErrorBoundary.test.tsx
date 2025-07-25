import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple Error Boundary component for testing
class TestErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div data-testid="normal-content">Normal content</div>;
}

describe('Error Boundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('should render children when there is no error', () => {
    render(
      <TestErrorBoundary>
        <ThrowError shouldThrow={false} />
      </TestErrorBoundary>
    );

    expect(screen.getByTestId('normal-content')).toBeInTheDocument();
    expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument();
  });

  it('should render error fallback when child component throws', () => {
    render(
      <TestErrorBoundary>
        <ThrowError shouldThrow={true} />
      </TestErrorBoundary>
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('normal-content')).not.toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('should provide try again functionality', () => {
    const { rerender } = render(
      <TestErrorBoundary>
        <ThrowError shouldThrow={true} />
      </TestErrorBoundary>
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();

    // Click try again button
    const tryAgainButton = screen.getByText('Try again');
    tryAgainButton.click();

    // Re-render with no error
    rerender(
      <TestErrorBoundary>
        <ThrowError shouldThrow={false} />
      </TestErrorBoundary>
    );

    expect(screen.getByTestId('normal-content')).toBeInTheDocument();
    expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument();
  });

  it('should log error information when error occurs', () => {
    render(
      <TestErrorBoundary>
        <ThrowError shouldThrow={true} />
      </TestErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      'Error caught by boundary:',
      expect.any(Error),
      expect.any(Object)
    );
  });
});