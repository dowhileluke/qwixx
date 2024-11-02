import { generateArray } from '@dowhileluke/fns'
import { COLORS } from '../const'
import { Center } from './center'
import { Header } from './header'
import { Row } from './row'
import { Scoreboard } from './scoreboard'
import { Skips } from './skips'

const rowIndexes = generateArray(4)

export function App() {
  return (
    <Center column className="full-screen xl-gap">
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
    </Center>
  )
}
