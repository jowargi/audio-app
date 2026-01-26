import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./reset.css";
import "./main.css";
import "./globals.css";

createRoot(document.getElementById("root")!).render(<App />);
