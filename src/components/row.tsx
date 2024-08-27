import { PropsWithChildren } from 'react'
import classes from './row.module.css'

export function Row({ children }: PropsWithChildren) {
	return (
		<div className={classes.row}>
			{children}
		</div>
	)
}
