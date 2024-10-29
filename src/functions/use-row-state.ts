import { useAppState } from '../hooks/use-app-state'
import { Row } from '../types'
import { getMinimumIndex } from './get-minimum-index';

type RowState = Row & {
	isReady: boolean;
	isFinished: boolean;
	minimumIndex: number;
	isGameComplete: boolean;
}

export function useRowState(rowIndex: number) {
	const [{ board, calcs }, actions] = useAppState()
	const row = board.scores[rowIndex]
	const { rowDetails, isGameComplete} = calcs
	const { isFinished, tally } = rowDetails[rowIndex]
	const minimumIndex = getMinimumIndex(row)
	const state: RowState = {
		...row,
		isReady: tally >= 5,
		isFinished,
		minimumIndex,
		isGameComplete,
	}

	return [state, actions] as const
}
