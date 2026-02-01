import Dashboard from "./components/Dashboard";
import "./styles/dashboard.css";

function App() {
  return (
    <>
      <header className="header">
        <h1>FocusTrack™</h1>
        <p>Track • Analyze • Improve Productivity</p>
      </header>

      <main className="container">
        <Dashboard />
      </main>
    </>
  );
}

export default App;