import { useAppState } from '../hooks/use-app-state'
import { Center } from './center'

export function QrCode() {
	const [, { toggleQrCode }] = useAppState()

	return (
		<Center column className="xl-gap" onClick={() => toggleQrCode(false)}>
			<img src="qr.png" alt="QR Code" />
			<span className="action">Done</span>
		</Center>
	)
}