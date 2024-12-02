import { Fragment, SyntheticEvent } from 'react'
import { useAppState } from '../hooks/use-app-state'
import { ColorScheme } from '../types'
import { Center } from './center'

type LabeledScheme = {
	label: string;
	scheme: ColorScheme;
}

const SCHEMES: LabeledScheme[] = [
	{ label: 'Light', scheme: 'light', },
	{ label: 'Auto', scheme: 'auto', },
	{ label: 'Dark', scheme: 'dark', },
]

export function QrCode() {
	const [{ prefs }, { toggleQrCode, setPref }] = useAppState()

	function toggleOff() {
		toggleQrCode(false)
	}

	function handleScheme(e: SyntheticEvent, s: ColorScheme) {
		e.stopPropagation()

		setPref('colorScheme', s)
	}

	return (
		<Center column className="xl-gap">
			<div>
				{SCHEMES.map(({ label, scheme }, i) => {
					const isCurrent = scheme === prefs.colorScheme
					
					return (
						<Fragment key={i}>
							{i ? ' / ' : ''}
							{isCurrent ? label : (
								<span className="action" onClick={e => handleScheme(e, scheme)}>
									{label}
								</span>
							)}
						</Fragment>
					)
				})}
			</div>
			<img src="qr.png" alt="QR Code" onClick={toggleOff} />
			<span className="action" onClick={toggleOff}>Done</span>
		</Center>
	)
}