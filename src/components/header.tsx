import { QrCode } from '@phosphor-icons/react'
import classes from './header.module.css'
import { Center } from './center'
import { useAppState } from '../hooks/use-app-state'

export function Header() {
	const [, { toggleQrCode }] = useAppState()

	return (
		<h4 className={classes.grid}>
			<div>Scored Dice</div>
			<Center>
				<QrCode /> <span className="action" onClick={() => toggleQrCode(true)}>QR Code</span>
			</Center>
			<div>
				<span className="dash">At Least 5 X's</span>
			</div>
		</h4>
	)
}
