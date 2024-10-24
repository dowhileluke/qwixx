import { Row } from '../types'

export function getMinimumIndex({ boxes }: Row) {
	return boxes.reduce((min, isChecked, index) => isChecked ? index : min, 0)
}
