import { Show, createSignal } from 'solid-js'
import type { Setter } from 'solid-js'
import { updateBar } from '../App'

export interface BarProps {
  display: string
  barNum: number
  stringNum: number
  last: boolean
  setLine: Setter<string[]>
  setBeatValue: Setter<string>
}

// <Show when={!empty}>
//   <div class="w-2 bg-slate-700 h-[2px]">{props.display}</div>
// </Show>

export default function Bar(props: BarProps) {
  const [barValue, setBarValue] = createSignal(props.display)

  return (
    <div
      class={`${
        props.last
          ? 'w-4 border-r-slate-600 border-r-2 cursor-pointer'
          : 'w-4 cursor-pointer'
      }`}
      onClick={() => {
        props.setBeatValue('4')
        // updateBar('4', props.stringNum, props.barNum)
      }}
    >
      {props.display}
    </div>
  )
}
