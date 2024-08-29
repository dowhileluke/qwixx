import { sum } from '@dowhileluke/fns'
import { useGameState } from '../hooks/use-game-state'
import { Checkbox } from './checkbox'
import { Row } from './row'

export function Board() {
	const [state, actions] = useGameState()

	return (
		<div>
			{state.scores.map((row, rowIndex) => {
				const isRowLocked = Boolean(row[10] || row[11])
				const isFinalAvailable = sum(row.slice(0, -1)) >= 5

				return (
					<Row key={rowIndex}>
						{row.map((isChecked, colIndex) => (
							<Checkbox
								key={colIndex}
								isChecked={Boolean(isChecked || row[10] && colIndex > 10)}
								isDisabled={isRowLocked && colIndex < 11 || colIndex === 10 && !isFinalAvailable}
								onChange={() => actions.toggleCheck(rowIndex, colIndex)}
								label={colIndex}
							/>
						))}
					</Row>
				)
			})}
		</div>
	)
}
