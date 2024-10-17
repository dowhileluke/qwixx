import { useAppContext } from './use-app-context'

export function useBoardState() {
	const [{ board }, actions] = useAppContext()

	return [board, actions] as const
}
