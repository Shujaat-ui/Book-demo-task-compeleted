import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // yahan CSS rakhenge

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
