import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Buffer } from 'buffer';
import process from 'process';
(window as any).Buffer = Buffer;
(window as any).process = process;


createRoot(document.getElementById("root")!).render(<App />);
