import { Prohibit, X } from '@phosphor-icons/react'
import { CheckboxProps } from '../types'
import { concat } from '../functions/concat'
import classes from './checkbox.module.css'

// const X_CLASS = `${classes.box} ${classes.}`

export function Checkbox({
	isChecked = false, isDisabled = false, isDiscouraged = false, label, onChange,
}: CheckboxProps) {
	return (
		<label
			className={concat(classes.slot, isDisabled && classes.disabled)}
		>
			<div className={classes.label}>
				{label}
			</div>
			<div className={classes.x}>
				{isDiscouraged ? (
					<Prohibit className={isChecked ? '' : classes.half} />
				) : (
					isChecked && (
						<X weight="bold" />
					)
				)}
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
