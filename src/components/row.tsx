import { Lock } from '@phosphor-icons/react'
import { generateArray } from '@dowhileluke/fns'
import { concat } from '../functions/concat'
import { getMinimumIndex } from '../functions/get-minimum-index'
import { useBoardState } from '../hooks/use-board-state'
import { Center } from './center'
import { Checkbox } from './checkbox'
import classes from './row.module.css'

type RowProps = {
	index: number;
	direction?: 'asc' | 'desc';
}

const DIGITS_ASC = generateArray(2, 12)
const DIGITS_DESC = generateArray(12, 2)
const COLORS = ['red', 'yellow', 'green', 'blue']

export function Row({ index, direction }: RowProps) {
	const [{ scores }, actions] = useBoardState()
	const digits = direction === 'desc' ? DIGITS_DESC : DIGITS_ASC
	const row = scores[index]
	const count = row.slice(0, -2).filter(Boolean).length
	const isLocked = row[11]
	const minIndex = getMinimumIndex(row)

	function getSegment(begin: number, end: number) {
		return row.slice(begin, end).map((isChecked, i) => {
			const n = begin + i
			const isEnd = n === 11
			const isDiscouraged = (
				isChecked
					? isEnd && !row[10]
					: n === 10 && count < 5 || n < minIndex
			)

			return (
				<Checkbox
					key={n}
					isChecked={isChecked}
					onChange={(yes) => actions.setScoreBox(index, n, yes)}
					isDisabled={!isEnd && isLocked}
					isDiscouraged={isDiscouraged}
					label={isEnd ? <Lock /> : digits[n]}
				/>
			)
		})
	}

	return (
		<Center className={concat(classes.row, classes[COLORS[index]])}>
			<Center className={classes.group}>
				{getSegment(0, 6)}
			</Center>
			<Center className={classes.group}>
				{getSegment(6, 10)}
				<Center className={concat(classes.group, classes.outline)}>
					{getSegment(10, 12)}
				</Center>
			</Center>
		</Center>
	)
}
