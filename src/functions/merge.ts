export function merge(...args: Array<string | boolean>) {
	return args.filter(Boolean).join(' ')
}
