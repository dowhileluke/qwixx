import { QrCode } from '@phosphor-icons/react'
import classes from './header.module.css'
import { Center } from './center'
import { useAppState } from '../hooks/use-app-state'
import { SyntheticEvent } from 'react'

export function Header() {
	const [, { toggleQrCode }] = useAppState()

	function handleClick(e: SyntheticEvent) {
		e.stopPropagation()

		toggleQrCode(true)
	}

	return (
		<h4 className={classes.grid}>
			<Center>
				<QrCode /> <span className="action" onClick={handleClick}>QR Code</span>
			</Center>
			<div>Scored Dice</div>
			<div>
				<span className="dash">At Least 5 X's</span>
			</div>
		</h4>
	)
}
