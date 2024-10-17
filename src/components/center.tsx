import { PropsWithChildren } from 'react'
import { concat } from '../functions/concat'
import classes from './center.module.css'

type CenterProps = {
	className?: string;
	column?: boolean;
}

export function Center({ className, column, children }: PropsWithChildren<CenterProps>) {
	return (
		<div
			className={concat(
				classes.center,
				column && classes.col,
				className,
			)}
		>
			{children}
		</div>
	)
}
