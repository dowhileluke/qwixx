import { useState } from 'react'
import { Checkbox } from './components/checkbox'
import { Lock } from '@phosphor-icons/react'
import { Row } from './components/row'

export function App() {
  const [boxOne, setOne] = useState(false)
  const [boxTwo, setTwo] = useState(false)

  return (
    <Row>
    text
      <Checkbox isChecked={boxOne} onChange={setOne} label={<Lock weight="bold" size="1em" />} />
      <Checkbox isChecked={boxTwo} isDisabled={boxOne} label={5} onChange={setTwo} />
    </Row>
  )
}
