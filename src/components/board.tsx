import { useAppContext } from '../hooks/use-app-context'
import { Checkbox } from './checkbox'
import { Row } from './row'

export function Board() {
	const [state, actions] = useAppContext()

	return (
		<div>
			{state.board.scores.map((row, rowIndex) => {
				return (
					<Row key={rowIndex}>
						{row.map((isChecked, boxIndex) => boxIndex > 0 && (
							<Checkbox
								key={boxIndex}
								isChecked={isChecked}
								onChange={() => actions.toggleCheck(rowIndex, boxIndex)}
								label={boxIndex}
							/>
						))}
					</Row>
				)
			})}
		</div>
	)
}

// export function Board() {
// 	const [state, actions] = useAppContext()

// 	return (
// 		<div>
// 			{state.scores.map((row, rowIndex) => {
// 				const isRowLocked = Boolean(row[10] || row[11])
// 				const isFinalAvailable = sum(row.slice(0, -1)) >= 5

// 				return (
// 					<Row key={rowIndex}>
// 						{row.map((isChecked, colIndex) => (
// 							<Checkbox
// 								key={colIndex}
// 								isChecked={Boolean(isChecked || row[10] && colIndex > 10)}
// 								isDisabled={isRowLocked && colIndex < 11 || colIndex === 10 && !isFinalAvailable}
// 								onChange={() => actions.toggleCheck(rowIndex, colIndex)}
// 								label={colIndex}
// 							/>
// 						))}
// 					</Row>
// 				)
// 			})}
// 			<br />
// 			{state.skips.map((isSkipped, index) => (
// 				<Checkbox key={index} isChecked={Boolean(isSkipped)} onChange={() => actions.toggleSkip(index)} />
// 			))}
// 			<pre>{state.total}</pre>
// 		</div>
// 	)
// }
