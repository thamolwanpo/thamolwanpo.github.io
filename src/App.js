import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <AppRoutes />      {/* Route transitions happen here */}
      <Footer />
    </>
  );
}

export default App;
