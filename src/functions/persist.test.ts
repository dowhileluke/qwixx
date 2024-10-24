import { expect, test } from 'vitest'
import { encodeBoard, encodeRow, decodeBoard } from './persist'
import { BoardState } from '../types'

const demo: BoardState = {
	d: 6,
	scores: [
		{ boxes: [true], isLocked: false, },
		{ boxes: [false], isLocked: false, },
	],
	skips: { boxes: [], isLocked: false, },
}

test('encodeRow', () => {
	expect(encodeRow({ boxes: [true, false, false], isLocked: true, })).toEqual('1100')
})

test('encodeBoard', () => {
	expect(encodeBoard(demo)).toEqual('6;01,00;0')
})

test('decodeBoard', () => {
	expect(decodeBoard(encodeBoard(demo))).toEqual(demo)
})
