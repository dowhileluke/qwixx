import { AppProvider } from './app-provider'
import { Board } from './board'

export function App() {
  return (
    <AppProvider>
      <Board />
    </AppProvider>
  )
}
