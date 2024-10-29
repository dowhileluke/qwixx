import { COLORS } from '../const'
import { useAppState } from '../hooks/use-app-state'
import { Center } from './center'
import { Score } from './score'
import classes from './score.module.css'

const scoreColors = COLORS.concat('black')

export function Scoreboard() {
	const [{ calcs }, actions] = useAppState()
	const label = calcs.isGameComplete ? 'Final Score \u2014' : 'Current Score'
	const resetter = (<span className={classes.reset} onClick={actions.resetBoard}>New Game?</span>)

	return (
		<Center column>
			<h4>{label} {calcs.isGameComplete && resetter}</h4>
			<Center>
				{calcs.totals.map((v, i) => (
					<Score value={v} color={scoreColors[i]} final={i === 5} />
				))}
			</Center>
		</Center>
	)
}
