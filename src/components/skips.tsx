import { COLORS } from '../const'
import { useAppState } from '../hooks/use-app-state'
import { Center } from './center'
import { CenteredArea } from './centered-area'
import { Checkbox } from './checkbox'

export function Skips() {
	const [state, actions] = useAppState()

	return (
		<Center column>
			<h4>Skipped Active Turn</h4>
			<CenteredArea color={COLORS[4]}>
				{state.board.skips.boxes.map((isSkip, i) => (
					<Checkbox isChecked={isSkip} onChange={isChecked => actions.setBox(-1, i, isChecked)} />
				))}
			</CenteredArea>
		</Center>
	)
}