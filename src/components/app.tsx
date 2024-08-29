import { GameProvider } from './game-context-provider'
import { Board } from './board'

export function App() {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  )
}
