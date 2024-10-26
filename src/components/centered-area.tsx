import { CSSProperties } from 'react'
import { concat } from '../functions/concat'
import { Center, CenterProps } from './center'
import classes from './centered-area.module.css'

type CenteredAreaProps = CenterProps & {
	color?: string;
}

export function CenteredArea({ color, className, style, ...rest }: CenteredAreaProps) {
	const colorStyle = color ? ({ ...style, '--color': color } as CSSProperties) : style

	return (
		<Center
			className={concat(classes.area, className)}
			style={colorStyle}
			{...rest}
		/>
	)
}
