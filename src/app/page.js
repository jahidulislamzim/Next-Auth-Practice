const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          color: '#4CAF50', 
          fontSize: '3rem',
          textAlign: 'center',
          textShadow: '2px 2px 5px rgba(0,0,0,0.2)',
        }}
      >
        Welcome to The Auth Practice
      </h1>
    </div>
  );
};

export default Home;
