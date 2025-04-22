import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000',
          color: '#00ff00',
          padding: '20px',
          textAlign: 'center',
          fontFamily: "'Press Start 2P', monospace"
        }}>
          <h1 style={{ marginBottom: '20px' }}>D'oh! Something went wrong!</h1>
          <p style={{ marginBottom: '20px' }}>
            Even Homer makes mistakes sometimes. Let's try that again!
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '15px 30px',
              background: '#00ff00',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '16px'
            }}
          >
            Return Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 