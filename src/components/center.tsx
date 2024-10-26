import { ComponentPropsWithoutRef } from 'react'
import { concat } from '../functions/concat'
import classes from './center.module.css'

export type CenterProps = ComponentPropsWithoutRef<'div'> & {
	column?: boolean;
	inline?: boolean;
}

export function Center({ className, column = false, inline = false, ...rest }: CenterProps) {
	return (
		<div
			className={concat(
				classes.center,
				column && classes.col,
				inline && classes.in,
				className,
			)}
			{...rest}
		/>
	)
}
