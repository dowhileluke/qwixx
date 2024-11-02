import { CSSProperties } from 'react'
import { concat } from '../functions/concat'
import { Center } from './center'
import classes from './score.module.css'

type ScoreProps = {
	value: number;
	color?: string;
	final?: boolean;
}

export function Score({ value, color, final = false, }: ScoreProps) {
	const colorStyle = { '--color': color, } as CSSProperties
	
	return (
		<Center className={concat(classes.score, final && classes.final)} style={colorStyle}>
			{/* {value > 0 && !final ? '+' + value : value} */}
			{value}
		</Center>
	)
}
