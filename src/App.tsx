import type { Component, Accessor, Setter } from 'solid-js'
import { createSignal, For } from 'solid-js'
import logo from './logo.svg'
import styles from './App.module.css'
import Bar from './components/Bar'
import String from './components/String'

export const [strings, setStrings] = createSignal([
  'e',
  'B',
  'G',
  'D',
  'A',
  'E',
])

export const [line, setLine] = createSignal([
  '2',
  '-',
  '4',
  '-',
  '0',
  '-',
  'x',
  'x',
  'x',
])

interface InstrumentString {
  name: string
  bars: [] | string[]
}

const defaultStrings = ['e', 'B', 'G', 'D', 'A', 'E']

export const [measure, setMeasure] = createSignal<InstrumentString[]>([
  { name: 'e', bars: [] },
  { name: 'B', bars: [] },
  { name: 'G', bars: [] },
  { name: 'D', bars: [] },
  { name: 'A', bars: [] },
  { name: 'E', bars: [] },
])

const updateBeat = (barValue: string) => {
  const [beatValue, setBeatValue] = createSignal('-')
}

const [timeSignature, setTimeSignature] = createSignal(4)
const [beats, setBeats] = createSignal(4)
const [stringNumber, setStringNumber] = createSignal(6)

const [bars, setBars] = createSignal<
  {
    beatValue: Accessor<string>
    setBeatValue: Setter<string>
  }[][]
>([])

const [stringNotes, setStringNotes] = createSignal(getStringNotes())

const setDefaultBars = (ignoreStored?: boolean) => {
  console.log(bars())
  const numOfBars = Array.from(new Array(stringNumber()))

  const newBars = numOfBars.map((bar) => {
    const string = Array.from(Array(timeSignature() * beats()), (_) => {
      const [beatValue, setBeatValue] = createSignal('-')
      return { beatValue, setBeatValue }
    })
    return string
  })

  console.log(newBars)
  if (ignoreStored) {
    setBars(newBars)
  }
  const storedJson = localStorage.getItem('measures')
  if (storedJson) {
    const storedMeasures = JSON.parse(storedJson)
    setBars(storedMeasures)
  }
  if (!storedJson) {
    setBars(newBars)
  }
}

const updateBars = (
  beatValue: string,
  stringNum: number,
  beatNumber: number
) => {
  const beat = { ...bars()[stringNum][beatNumber] }
  console.log('beat: ', beat)
  console.log('beat value: ', beat.beatValue())
  beat.setBeatValue(beatValue)
}

// const setDefaultBars = (ignoreStored?: boolean) => {
//   const updatedMeasure = measure().map((string, index) => {
//     const numberOfBars = timeSignature() * beats()
//     let newString: InstrumentString = {
//       name: '',
//       bars: [],
//     }
//     for (let i = 0; i < numberOfBars; i++) {
//       console.log(i)
//       newString = { ...string, bars: [...newString.bars, '-'] }
//     }
//     return newString
//   })
//   if (ignoreStored) {
//     setMeasure(updatedMeasure)
//   }
//   console.log(updatedMeasure)
//   const storedJson = localStorage.getItem('measures')
//   if (storedJson) {
//     const storedMeasures = JSON.parse(storedJson)
//     setMeasure(storedMeasures)
//   }
//   if (!storedJson) {
//     setMeasure(updatedMeasure)
//   }
// }

function getStringNotes() {
  const storedJson = localStorage.getItem('notes')
  if (storedJson) {
    const storedNotes = JSON.parse(storedJson)
    return storedNotes
  }
  return defaultStrings
}

export const updateBar = (
  newValue: string,
  stringNumber: number,
  barNumber: number
) => {
  const updatedMeasure = [...measure()]
  updatedMeasure[stringNumber].bars[barNumber] = newValue
  console.log('tried to update measure to: ', updatedMeasure)
  storeMeasure(updatedMeasure)
  setMeasure(updatedMeasure)
}

const storeMeasure = (measureData: InstrumentString[]) => {
  localStorage.setItem('measures', JSON.stringify(measureData))
}

setDefaultBars(true)

console.log('bars: ', bars())

const App: Component = () => {
  return (
    <>
      <For each={bars()}>
        {(string, index) => {
          return (
            <String
              stringNote={stringNotes()[index()]}
              stringNum={index()}
              string={string}
              setLine={setLine}
            />
          )
        }}
      </For>
      <button
        onClick={() => {
          localStorage.clear()
          setDefaultBars(true)
        }}
      >
        clear
      </button>
      <button class="ml-3" onclick={() => updateBars('X', 2, 2)}>
        testing
      </button>
    </>
  )
}

export default App
