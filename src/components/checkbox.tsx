import { ReactNode } from 'react'
import { merge } from '../functions/merge'
import classes from './checkbox.module.css'

export type CheckboxProps = {
	isChecked?: boolean;
	isDisabled?: boolean;
	label?: ReactNode;
	onChange: (isChecked: boolean) => void;
}

// const X_CLASS = `${classes.box} ${classes.}`

export function Checkbox({ isChecked = false, isDisabled = false, label, onChange }: CheckboxProps) {
	return (
		<label
			className={merge(classes.slot, isDisabled && classes.disabled)}
		>
			<div className={classes.label}>
				{label}
			</div>
			<div className={classes.x}>
				{isChecked ? 'X' : ''}
			</div>
			<input
				type="checkbox"
				checked={isChecked}
				disabled={isDisabled}
				onChange={e => onChange(e.target.checked)}
			/>
		</label>
	)
}
