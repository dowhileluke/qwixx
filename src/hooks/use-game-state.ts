import { createContext, useContext } from 'react'
import { GameActions, GameState } from '../types'

export const GameContext = createContext<null | readonly [GameState, GameActions]>(null)

export function useGameState() {
	const ctx = useContext(GameContext)

	if (!ctx) throw new Error('No context provider!')

	return ctx
}
