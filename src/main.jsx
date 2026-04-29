import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToolProvider } from "./assets/Context/ToolContext.jsx"
import { GameProvider } from "./assets/Context/GameContext.jsx"

const UIcolor = getComputedStyle(document.documentElement)
    .getPropertyValue('--card-bg-color').trim();

document.querySelector('meta[name="theme-color"]').setAttribute('content', UIcolor);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToolProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ToolProvider>
  </StrictMode>,
)
