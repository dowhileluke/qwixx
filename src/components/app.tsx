import { useLayoutEffect } from 'react'
import { generateArray } from '@dowhileluke/fns'
import { COLORS } from '../const'
import { useAppState } from '../hooks/use-app-state'
import { Center } from './center'
import { Header } from './header'
import { QrCode } from './qr-code'
import { Row } from './row'
import { Scoreboard } from './scoreboard'
import { Skips } from './skips'

const rowIndexes = generateArray(4)

export function App() {
  const [{ isQrCodeVisible, prefs }] = useAppState()
  const { colorScheme } = prefs

  useLayoutEffect(() => {
    document.documentElement.className = colorScheme
  }, [colorScheme])

  return (
    <Center column className="full-screen xl-gap">
      {isQrCodeVisible ? (
        <QrCode />
      ) : (
        <>
          <Center column>
            <Header />
            {rowIndexes.map(n => (
              <Row key={n} index={n} color={COLORS[n]} direction={n < 2 ? 'asc' : 'desc'} />
            ))}
          </Center>
          <Center className="flex-wrap xl-gap">
            <Skips />
            <Scoreboard />
          </Center>
        </>
      )}
    </Center>
  )
}
