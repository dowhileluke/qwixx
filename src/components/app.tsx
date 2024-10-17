// import { useState } from 'react'
import { AppProvider } from './app-provider'
// import { Board } from './board'
// import { Flipper } from './flipper'
import { Row } from './row'
import { Center } from './center'

export function App() {
  // const [state, setState] = useState(false)

  return (
    <AppProvider>
      {/* <Board /> */}
      {/* <Flipper isChecked={state} onChange={setState} /> */}
      <Center column>
        <Row index={0} />
        <Row index={1} />
      </Center>
    </AppProvider>
  )
}
