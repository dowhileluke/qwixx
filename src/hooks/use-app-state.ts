import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { generateArray } from '@dowhileluke/fns'
import { toGameState } from '../functions/to-game-state'
import { AppState, BoardState, DieFaces, AppActions, UserState } from '../types'
import { LENGTHS } from '../const'
import { getMinimumIndex } from '../functions/get-minimum-index'

function createInitialBoardState(d: DieFaces) {
	const result: BoardState = {
		d,
		scores: generateArray(4, () => generateArray(2 * d, () => false)),
		skips: generateArray(4, () => false),
	}

	return result
}

function createInitialUserState() {
	const result: UserState = {
		isMenuOpen: false,
		board: createInitialBoardState(6),
		prefs: {
			boardColors: ['red', 'yellow', 'green', 'blue'],
			colorScheme: 'auto',
			d: 6,
		},
	}

	return result
}

function createAppActions(setState: Dispatch<SetStateAction<UserState>>) {
	const result: AppActions = {
		resetGame() {
			setState(prev => ({
				...prev,
				isMenuOpen: false,
				board: createInitialBoardState(prev.prefs.d),
			}))
		},
		toggleCheck(rowIndex, boxIndex) {
			setState(prev => {
				const row = prev.board.scores[rowIndex]
				const minIndex = getMinimumIndex(row)
				const lastIndex = row.length - LENGTHS[prev.board.d]
				const boxIsChecked = row[boxIndex]
				const isUnlocking =  boxIsChecked && boxIndex === 0

				// bail early if box has been passed
				if (!boxIsChecked && boxIndex < minIndex) return prev

				const result: UserState = {
					...prev,
					board: {
						...prev.board,
						scores: prev.board.scores.map((row, r) => {
							if (r !== rowIndex) return row

							return row.map((isChecked, i) => {
								if (isUnlocking && (i === 0 || i >= lastIndex)) return false
								if (i !== boxIndex) return isChecked

								return !isChecked
							})
						})
					},
				}

				return result
			})
		},
		toggleMenu(isMenuOpen) {
			setState(prev => ({ ...prev, isMenuOpen, }))
		},
		setPref(pref, value) {
			setState(prev => ({
				...prev,
				prefs: {
					...prev.prefs,
					[pref]: value,
				},
			}))
		},
	}

	return result
}

export function useAppState(initialState: UserState | null) {
	const [state, setState] = useState(() => initialState ?? createInitialUserState())
	const [actions] = useState(() => createAppActions(setState))
	const game = useMemo(() => toGameState(state.board), [state.board])
	const finalState = useMemo((): AppState => ({ ...state, game, }), [state, game])

	return [finalState, actions] as const
}
