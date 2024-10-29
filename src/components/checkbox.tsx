import { ReactNode } from 'react'
import { Prohibit, X } from '@phosphor-icons/react'
import { concat } from '../functions/concat'
import classes from './checkbox.module.css'

type CheckboxProps = {
	isChecked?: boolean;
	isDisabled?: boolean;
	label?: ReactNode;
	checkedIcon?: ReactNode;
	onChange?: (isChecked: boolean) => void;
}

export function Checkbox({
	isChecked = false, isDisabled = false, label, checkedIcon, onChange,
}: CheckboxProps) {
	return (
		<label
			className={concat(classes.slot, isDisabled && classes.disabled)}
		>
			<div className={classes.label}>
				{label}
			</div>
			<div className={classes.x}>
				{isChecked && (checkedIcon ?? <X weight="bold" />)}
			</div>
			<input
				type="checkbox"
				checked={isChecked}
				disabled={isDisabled}
				onChange={e => onChange?.(e.target.checked)}
			/>
		</label>
	)
}
