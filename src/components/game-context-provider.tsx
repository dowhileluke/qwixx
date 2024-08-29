import { PropsWithChildren } from 'react'
import { GameContext } from '../hooks/use-game-state'
import { useGameContext } from '../hooks/use-game-context'

export function GameProvider({ children }: PropsWithChildren) {
	const ctx = useGameContext()

	return (
		<GameContext.Provider value={ctx}>
			{children}
		</GameContext.Provider>
	)
}
