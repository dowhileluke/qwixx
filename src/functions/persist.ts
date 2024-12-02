import { split } from '@dowhileluke/fns'
import { BoardState, DieFaces, Prefs, Row, UserState } from '../types'

type EncodedState = {
	board: string;
	prefs: Prefs;
}

const PERSIST_KEY = 'q-state'

function toDigit(b: boolean) {
	return b ? '1' : '0'
}

export function encodeRow({ boxes, isLocked }: Row) {
	return toDigit(isLocked) + boxes.map(isChecked => toDigit(isChecked)).join('')
}

export function encodeBoard({ d, scores, skips }: BoardState) {
	const encodedScores = scores.map(s => encodeRow(s)).join(',')

	return [d, encodedScores, encodeRow(skips)].join(';')
}

function encode({ board, prefs }: UserState) {
	return JSON.stringify({ board: encodeBoard(board), prefs })
}

function fromDigit(s: string) {
	return s !== '0'
}

function decodeRow(s: string) {
	const [lockDigit, boxDigits] = split(s, 1)

	const result: Row = {
		boxes: boxDigits.split('').map(d => fromDigit(d)),
		isLocked: fromDigit(lockDigit),
	}

	return result
}

export function decodeBoard(board: string) {
	const [encodedD, encodedScores, encodedSkips] = board.split(';')
	const scores = encodedScores.split(',').map(row => decodeRow(row))

	const result: BoardState = {
		d: Number(encodedD) as DieFaces,
		scores,
		skips: decodeRow(encodedSkips),
	}

	return result
}

function decode(str: string) {
	const encoded = JSON.parse(str) as EncodedState
	const board = decodeBoard(encoded.board)
	const result: UserState = {
		board,
		isMenuOpen: false,
		isQrCodeVisible: false,
		prefs: encoded.prefs ?? { colorScheme: 'auto', },
	}

	return result
}

export function setPersistedState(state: UserState) {
	localStorage.setItem(PERSIST_KEY, encode(state))
}

export function getPersistedState() {
	const state = localStorage.getItem(PERSIST_KEY)

	return state ? decode(state) : null
}
