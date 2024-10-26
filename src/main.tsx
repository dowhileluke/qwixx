import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/app.tsx'
import { AppProvider } from './components/app-provider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
