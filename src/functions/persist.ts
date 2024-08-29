import { InputState } from '../types'

const PERSIST_KEY = 'q-state'

function encode(state: InputState) {
	return `${state.scores.map(row => row.join('')).join(',')};${state.skips.join('')}`
}

function decode(str: string) {
	const [scoreStr, skipStr] = str.split(';')
	const result: InputState = {
		scores: scoreStr.split(',').map(row => row.split('').map(Number)),
		skips: skipStr.split('').map(Number),
	}

	return result
}

export function setPersistedState(state: InputState) {
	localStorage.setItem(PERSIST_KEY, encode(state))
}

export function getPersistedState() {
	const state = localStorage.getItem(PERSIST_KEY)

	return state ? decode(state) : null
}
