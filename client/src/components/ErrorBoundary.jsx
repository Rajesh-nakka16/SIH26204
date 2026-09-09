import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0b1820',
          color: '#f4fbf6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: '"DM Sans", sans-serif'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(182, 239, 117, 0.1)',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '20px',
            border: '1px solid #b6ef75'
          }}>
            🧭
          </div>
          <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '28px', margin: '0 0 10px' }}>
            EXPLOREX encountered a minor detour
          </h2>
          <p style={{ color: '#8faea7', maxWidth: '460px', lineHeight: '1.6', marginBottom: '24px' }}>
            Don't worry! Your travel companion can easily recover. Click below to refresh your journey.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#b6ef75',
              color: '#10211e',
              border: 0,
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Restart Explorer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
