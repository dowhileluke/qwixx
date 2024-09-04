import { sum } from '@dowhileluke/fns'
import { BoardState, GameState, LockableLength, Row, RowStatus } from '../types'
import { toRowStatus } from './to-row-status'
import { toScore } from './to-score'
import { LENGTHS } from '../const'

type RowDetails = {
	tally: number;
	score: number;
	status: RowStatus;
}

function toRowDetails(row: Row, len: LockableLength) {
	const status = toRowStatus(row, len)
	let tally = row.slice(1, -len).filter(Boolean).length
	
	if (status === 'complete') tally += 1

	const result: RowDetails = {
		tally,
		score: toScore(tally),
		status,
	}

	return result
}

export function toGameState({ d, scores, skips }: BoardState) {
	const lockableLength = LENGTHS[d]
	const rowDetails = scores.map(row => toRowDetails(row, lockableLength))

	const lockCount = rowDetails.filter(r => r.status).length
	const skipCount = skips.filter(Boolean).length
	const isComplete = lockCount > 1 || skipCount >= skips.length

	const scoreList = rowDetails.map(r => r.score)
	const penalty = -5 * skipCount
	const total = sum(scoreList) + penalty

	const result: GameState = {
		lockableLength,
		totals: [...scoreList, penalty, total],
		isComplete,
	}

	return result
}
