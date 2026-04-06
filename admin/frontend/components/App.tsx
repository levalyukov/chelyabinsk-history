import "../styles/App.css";

import Reports from "./Reports";

export default function Admin() : React.ReactNode {

  return (
    <main className="admin-panel">
      <div className="app-container">
        <Reports/>
      </div>
    </main>
  );
};