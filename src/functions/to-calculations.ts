import { sum, tail } from '@dowhileluke/fns'
import { BoardState, Calculations, Row, RowDetails } from '../types'
import { toScore } from './to-score'

function toRowDetails({ boxes, isLocked }: Row) {
	let isFinished = isLocked
	let tally = boxes.filter(Boolean).length
	
	if (tail(boxes)) {
		tally += 1
		isFinished = true
	}

	const result: RowDetails = {
		tally,
		score: toScore(tally),
		isFinished,
	}

	return result
}

export function toCalculations({ scores, skips }: BoardState) {
	const rowDetails = scores.map(row => toRowDetails(row))

	const finishedCount = rowDetails.filter(r => r.isFinished).length
	const skipCount = skips.boxes.filter(Boolean).length
	const isGameComplete = finishedCount > 1 || skipCount >= skips.boxes.length

	const scoreList = rowDetails.map(r => r.score)
	const penalty = -5 * skipCount
	const total = sum(scoreList) + penalty

	const result: Calculations = {
		totals: [...scoreList, penalty, total],
		rowDetails,
		isGameComplete,
	}

	return result
}
