import "../styles/App.css";

import Reports from "./Reports";

import { useState } from "react";
import { type AppPages } from "../interfaces/app.interface";

export default function Admin() : React.ReactNode {
  const [page, setPage] = useState<AppPages>("all");

  return (
    <main className="admin-panel">
      <div className="app-container">
        <Reports setPage={setPage} getPage={page}/>
      </div>
    </main>
  );
};