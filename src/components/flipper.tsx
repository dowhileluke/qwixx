import { Lock, LockOpen } from '@phosphor-icons/react'
import { CheckboxProps } from '../types'
import classes from './flipper.module.css'
import { concat } from '../functions/concat'

export function Flipper({ isChecked, onChange }: CheckboxProps) {
	return (
		<label className={concat(classes.shape, classes.flipper, isChecked ? classes.flipa : classes.flipz)}>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={e => onChange(e.target.checked)}
			/>
			<div className="icon">
				{isChecked ? <Lock /> : <LockOpen />}
			</div>
		</label>
	)
}
