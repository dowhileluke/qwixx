import { Lock } from '@phosphor-icons/react'
import { generateArray } from '@dowhileluke/fns'
import { concat } from '../functions/concat'
// import { getMinimumIndex } from '../functions/get-minimum-index'
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
	// const count = row.boxes.slice(0, -1).filter(Boolean).length
	// const minIndex = getMinimumIndex(row)

	const isRowFinished = row.boxes[10]

	function getSegment(begin: number, end: number) {
		return row.boxes.slice(begin, end).map((isChecked, i) => {
			const n = begin + i
			// const isDiscouraged = (
			// 	isChecked
			// 		? isEnd && !row[10]
			// 		: n === 10 && count < 5 || n < minIndex
			// )

			return (
				<Checkbox
					key={n}
					isChecked={isChecked}
					onChange={(yes) => actions.setBox(index, n, yes)}
					isDisabled={row.isLocked || (isRowFinished && n < 10)}
					// isDiscouraged={isDiscouraged}
					label={digits[n]}
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
					{getSegment(10, 11)}
					<Checkbox
						isChecked={row.isLocked || isRowFinished}
						onChange={(yes) => actions.setBox(index, -1, yes)}
						label={row.isLocked ? null : <Lock />}
						checkedIcon={row.isLocked ? <Lock weight="bold" size="0.8em" /> : null}
					/>
				</Center>
			</Center>
		</Center>
	)
}
