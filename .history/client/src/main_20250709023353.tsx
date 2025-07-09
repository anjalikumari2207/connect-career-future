// main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ✅ Correct way to import Buffer in Vite
import { Buffer } from 'buffer';
window.Buffer = Buffer; 

createRoot(document.getElementById("root")!).render(<App />);
