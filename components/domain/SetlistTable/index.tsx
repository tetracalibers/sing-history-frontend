import { Song } from "./Song"
import styled from "styled-components"
import { useVirtualScroll } from "./useVirtualScroll.hook"
import { memo, useRef } from "react"
import { useWindowSize } from "../../../hooks/useWindowSize.hook"

const _TwinkleBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/twinkleBack.jpg");
  background-blend-mode: screen;
  background-size: cover;
`

const TwinkleBack = memo(_TwinkleBack)

const _VirtualRoot = styled.div`
  --bg-color: #f7f9ff;
  --shadow-color: #b1b2ff;
  --float-color: #8c1bab;
  --gap: 1rem;

  /* メニューをスクロール可能にする */
  overflow-y: auto;
  /* iOSで慣性スクロールができるようにする */
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cdf0ea;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 6%) 0px 2px 4px 0px inset;
    box-shadow: rgb(171 216 255) -3px -3px 6px 0px inset,
      rgb(255 255 255 / 50%) 3px 3px 6px 1px inset;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ecc5fb;
    border-radius: 6px;
    border: 1px solid transparent;
    background-clip: content-box;
  }

  /* design */
  list-style: none;
  background-image: linear-gradient(
    221deg,
    rgba(12, 186, 186, 0.9) 0%,
    rgba(100, 125, 238, 0.9) 74%
  );
`

const _VirtualScrollArea = styled.div`
  height: fit-content;
`

const _Ul = styled.ul`
  padding: 0;
  margin: 0;
`

const VirtualScrollArea = memo(_VirtualScrollArea)
const VirtualRoot = memo(_VirtualRoot)
const Ul = memo(_Ul)

const vItemHeight = 56

const _SetlistTable = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [, wHeight] = useWindowSize()

  const { renderItems, ulStyle } = useVirtualScroll({
    vAreaHeight: wHeight,
    vItemHeight,
    rootRef,
  })

  return (
    <TwinkleBack>
      <VirtualRoot ref={rootRef} style={{ maxHeight: wHeight }}>
        <VirtualScrollArea>
          <Ul style={ulStyle}>
            {renderItems.map(node => (
              <li style={{ height: vItemHeight }} key={node.id}>
                <Song song={node} />
              </li>
            ))}
          </Ul>
        </VirtualScrollArea>
      </VirtualRoot>
    </TwinkleBack>
  )
}

export const SetlistTable = memo(_SetlistTable)
