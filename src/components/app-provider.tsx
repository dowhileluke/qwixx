import { PropsWithChildren } from 'react'
import { AppContext } from '../hooks/use-app-state'
import { useProviderState } from '../hooks/use-provider-state'

export function AppProvider({ children }: PropsWithChildren) {
	const ctx = useProviderState()

	return (
		<AppContext.Provider value={ctx}>
			{children}
		</AppContext.Provider>
	)
}
