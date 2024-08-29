import { sum, tail } from '@dowhileluke/fns'
import { InputState } from '../types'

function toRowTotal(row: number[]) {
	const dice = row.slice(0, -1)
	let n = sum(dice)

	if (tail(dice)) n += 1

	return n * (n + 1) / 2
}

export function toTotal(state: InputState) {
	const scoreTotal = sum(state.scores, row => toRowTotal(row))
	const skipPenalty = 5 * sum(state.skips)

	return scoreTotal - skipPenalty
}
