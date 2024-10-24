import { useAppState } from './use-app-state'

export function useBoardState() {
	const [{ board }, actions] = useAppState()

	return [board, actions] as const
}
