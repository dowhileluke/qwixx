import { Row } from '../types'

export function getMinimumIndex(row: Row) {
	return row.reduce((min, isChecked, index) => isChecked ? index : min, 0)
}
