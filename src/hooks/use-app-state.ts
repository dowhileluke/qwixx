import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { generateArray } from '@dowhileluke/fns'
import { toCalculations } from '../functions/to-calculations'
import { AppState, BoardState, DieFaces, AppActions, UserState, Row } from '../types'

function createEmptyRow(d: DieFaces) {
	const result: Row = {
		boxes: generateArray(2 * d - 1, () => false),
		isLocked: false,
	}

	return result
}

function createInitialBoardState(d: DieFaces) {
	const result: BoardState = {
		d,
		scores: generateArray(4, () => createEmptyRow(d)),
		skips: createEmptyRow(d),
	}

	return result
}

function createInitialUserState() {
	const result: UserState = {
		isMenuOpen: false,
		board: createInitialBoardState(6),
	}

	return result
}

function updateRow(row: Row, boxIndex: number, isChecked: boolean) {
	if (boxIndex < 0) {
		const result: Row = {
			...row,
			isLocked: isChecked,
		}

		return result
	}

	const result: Row = {
		...row,
		boxes: row.boxes.map((box, index) => index === boxIndex ? isChecked : box),
	}
	
	return result
}

function updateBoard(board: BoardState, rowIndex: number, boxIndex: number, isChecked: boolean) {
	const result = { ...board }

	if (rowIndex < 0) {
		result.skips = updateRow(board.skips, boxIndex, isChecked)
	} else {
		result.scores = board.scores.map((row, index) => (
			index === rowIndex ? updateRow(row, boxIndex, isChecked) : row
		))
	}

	return result
}

function createAppActions(setState: Dispatch<SetStateAction<UserState>>) {
	const result: AppActions = {
		resetBoard() {
			setState(prev => ({
				...prev,
				isMenuOpen: false,
				board: createInitialBoardState(prev.board.d),
			}))
		},
		setBox(rowIndex, boxIndex, isChecked) {
			setState(prev => ({
				...prev,
				board: updateBoard(prev.board, rowIndex, boxIndex, isChecked),
			}))
		},
		// toggleCheck(rowIndex, boxIndex) {
		// 	setState(prev => {
		// 		const row = prev.board.scores[rowIndex]
		// 		const minIndex = getMinimumIndex(row)
		// 		const lastIndex = row.length - LENGTHS[prev.board.d]
		// 		const boxIsChecked = row[boxIndex]
		// 		const isUnlocking =  boxIsChecked && boxIndex === 0

		// 		// bail early if box has been passed
		// 		if (!boxIsChecked && boxIndex < minIndex) return prev

		// 		const result: UserState = {
		// 			...prev,
		// 			board: {
		// 				...prev.board,
		// 				scores: prev.board.scores.map((row, r) => {
		// 					if (r !== rowIndex) return row

		// 					return row.map((isChecked, i) => {
		// 						if (isUnlocking && (i === 0 || i >= lastIndex)) return false
		// 						if (i !== boxIndex) return isChecked

		// 						return !isChecked
		// 					})
		// 				})
		// 			},
		// 		}

		// 		return result
		// 	})
		// },
		toggleMenu(isMenuOpen) {
			setState(prev => ({ ...prev, isMenuOpen, }))
		},
		// setPref(pref, value) {
		// 	setState(prev => ({
		// 		...prev,
		// 		prefs: {
		// 			...prev.prefs,
		// 			[pref]: value,
		// 		},
		// 	}))
		// },
	}

	return result
}

export function useAppState(initialState: UserState | null) {
	const [state, setState] = useState(() => initialState ?? createInitialUserState())
	const [actions] = useState(() => createAppActions(setState)) // use forever
	const calcs = useMemo(() => toCalculations(state.board), [state.board])
	const finalState = useMemo((): AppState => ({ ...state, calcs, }), [state, calcs])

	return [finalState, actions] as const
}
