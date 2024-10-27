import { sum, tail } from '@dowhileluke/fns'
import { BoardState, Calculations, Row } from '../types'
import { toScore } from './to-score'

type RowDetails = {
	tally: number;
	score: number;
	isLocked: boolean;
}

function toRowDetails({ boxes, isLocked }: Row) {
	let tally = boxes.filter(Boolean).length
	
	if (tail(boxes)) {
		tally += 1
		isLocked = true
	}

	const result: RowDetails = {
		tally,
		score: toScore(tally),
		isLocked,
	}

	return result
}

export function toCalculations({ scores, skips }: BoardState) {
	const rowDetails = scores.map(row => toRowDetails(row))

	const lockCount = rowDetails.filter(r => r.isLocked).length
	const skipCount = skips.boxes.filter(Boolean).length
	const isComplete = lockCount > 1 || skipCount >= skips.boxes.length

	const scoreList = rowDetails.map(r => r.score)
	const penalty = -5 * skipCount
	const total = sum(scoreList) + penalty

	const result: Calculations = {
		totals: [...scoreList, penalty, total],
		isComplete,
	}

	return result
}
