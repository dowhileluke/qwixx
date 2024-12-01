import { Fragment } from 'react'
import { COLORS } from '../const'
import { useAppState } from '../hooks/use-app-state'
import { Center } from './center'
import { CenteredArea } from './centered-area'
import { Score } from './score'

const scoreColors = COLORS.concat('var(--text)')
const symbols: Record<number, string> = {
	0: '+',
	1: '+',
	2: '+',
	3: '-',
	4: '='
}

export function Scoreboard() {
	const [{ calcs }, actions] = useAppState()
	const label = calcs.isGameComplete ? 'Final Score' : 'Current Score'

	function handleReset() {
		if (confirm('Reset this scoresheet?')) {
			actions.resetBoard()
		}
	}

	const resetter = (<span className="action" onClick={handleReset}>Reset</span>)

	return (
		<Center column>
			<h4>{label} ({resetter})</h4>
			<CenteredArea>
				{calcs.totals.map((v, i) => (
					<Fragment key={i}>
						<Score value={v} color={scoreColors[i]} final={i === 5} />
						{symbols[i]}
					</Fragment>
				))}
			</CenteredArea>
		</Center>
	)
}
