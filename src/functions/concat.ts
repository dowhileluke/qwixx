import { truthy, Falsy } from '@dowhileluke/fns'

export function concat(...args: Array<string | Falsy>) {
	return truthy(args).join(' ')
}
