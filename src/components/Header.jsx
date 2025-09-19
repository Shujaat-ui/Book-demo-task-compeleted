export default function Header() {
  const headerStyle = {
    background: '#000',          // Black background
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20px 10px',        // Padding adjusts on small screens
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    letterSpacing: '1px',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <header style={headerStyle}>
      Book Management App
    </header>
  );
}
