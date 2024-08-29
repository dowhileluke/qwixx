import { useEffect, useState } from 'react'
import { generateArray, sum, tail } from '@dowhileluke/fns'
import { getPersistedState, setPersistedState } from '../functions/persist'
import { GameActions, GameState, InputState } from '../types'
import { useForever } from './use-forever'
import { toTotal } from '../functions/to-total'

const persistedState = getPersistedState()

function getInitialState() {
	const result: InputState = {
		scores: generateArray(4, () => generateArray(12, () => 0)),
		skips: generateArray(4, () => 0),
	}

	return result
}

export function useGameContext() {
	const [state, setState] = useState(persistedState ?? getInitialState())
	const lockCount = sum(state.scores, row => tail(row))
	const skipCount = sum(state.skips)
	const derived: GameState = {
		...state,
		total: toTotal(state),
		isComplete: lockCount > 1 || skipCount > 3,
	}

	useEffect(() => {
		setPersistedState(state)
	}, [state])

	const actions = useForever<GameActions>({
		reset() {
			setState(getInitialState())
		},
		toggleCheck(rowIndex, index) {
			setState(prev => {
				const scores = { ...prev.scores }
				const row = scores[rowIndex]
				const isLocked = Boolean(row[10] || row[11])

				if (isLocked && index < 11) return prev

				const isUnlocking = isLocked && index === 11

				return {
					...prev,
					scores: prev.scores.map((row, r) => {
						if (r !== rowIndex) return row

						return row.map((n, i) => {
							if (isUnlocking && i >= 10) return 0
							if (i !== index) return n

							return 1 - n
						})
					}),
				}
			})
		},
		toggleSkip(index) {
			setState(prev => ({
				...prev,
				skips: prev.skips.map((n, i) => i === index ? n : 1 - n),
			}))
		},
	})

	return [derived, actions] as const
}
