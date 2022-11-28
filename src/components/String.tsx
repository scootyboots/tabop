import type { Setter, Accessor } from 'solid-js'
import { For, Show } from 'solid-js'
import Bar from './Bar'

export interface StringProps {
  stringNote: string
  string: { beatValue: Accessor<string>; setBeatValue: Setter<string> }[]
  stringNum: number
  setLine: Setter<string[]>
}

export default function String(props: StringProps) {
  return (
    <div class="flex flex-nowrap gap-px">
      <div class="mx-1 w-4">{props.stringNote}</div>
      <For each={props.string}>
        {(bar, index) => {
          const last = index() + 1 === props.string.length ? true : false
          return (
            <>
              <Bar
                display={bar.beatValue()}
                barNum={index()}
                stringNum={props.stringNum}
                setLine={props.setLine}
                last={last}
                setBeatValue={bar.setBeatValue}
              />
              {/* <Show when={last}>|</Show> */}
            </>
          )
        }}
      </For>
    </div>
  )
}
