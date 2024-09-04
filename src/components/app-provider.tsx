import { PropsWithChildren } from 'react'
import { AppContext } from '../hooks/use-app-context'
import { useAppState } from '../hooks/use-app-state'

export function AppProvider({ children }: PropsWithChildren) {
	const ctx = useAppState(null)

	return (
		<AppContext.Provider value={ctx}>
			{children}
		</AppContext.Provider>
	)
}
