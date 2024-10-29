import { Lock } from '@phosphor-icons/react'
import { generateArray } from '@dowhileluke/fns'
import { useRowState } from '../functions/use-row-state'
import { Center } from './center'
import { CenteredArea } from './centered-area'
import { Checkbox } from './checkbox'
import classes from './row.module.css'

type RowProps = {
	index: number;
	color?: string;
	direction?: 'asc' | 'desc';
}

const DIGITS_ASC = generateArray(2, 12)
const DIGITS_DESC = generateArray(12, 2)

export function Row({ index, color, direction }: RowProps) {
	const [{ boxes, isLocked, isFinished, minimumIndex, isReady, isGameComplete }, actions] = useRowState(index)
	const digits = direction === 'desc' ? DIGITS_DESC : DIGITS_ASC

	function getSegment(begin: number, end: number) {
		return boxes.slice(begin, end).map((isChecked, i) => {
			const n = begin + i
			const isDisabled = isLocked
				|| (n < minimumIndex)
				|| (n === 10 ? (!isReady || (isGameComplete && !isChecked)) : (isFinished || isGameComplete))

			return (
				<Checkbox
					key={n}
					isChecked={isChecked}
					onChange={(yes) => actions.setBox(index, n, yes)}
					isDisabled={isDisabled}
					label={digits[n]}
				/>
			)
		})
	}

	return (
		<CenteredArea color={color} className="flex-wrap">
			<Center>
				{getSegment(0, 6)}
			</Center>
			<Center>
				{getSegment(6, 10)}
				<Center className={classes.outline}>
					{getSegment(10, 11)}
					<Checkbox
						isChecked={isFinished}
						onChange={(yes) => actions.setBox(index, -1, yes)}
						label={isLocked ? null : <Lock />}
						checkedIcon={isLocked ? <Lock weight="bold" size="0.8em" /> : null}
					/>
				</Center>
			</Center>
		</CenteredArea>
	)
}
