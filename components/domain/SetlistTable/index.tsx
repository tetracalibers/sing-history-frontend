import { Song } from "./Song"
import { useGetMore } from "./useGetMore.hook"
import styled from "styled-components"
import { useVirtualScroll } from "./useVirtualScroll.hook"
import { memo } from "react"

const _VirtualRoot = styled.div`
  --bg-color: #f7f9ff;
  --shadow-color: #b1b2ff;
  --float-color: #8c1bab;
  --gap: 1rem;

  /* メニューをスクロール可能にする */
  max-height: 12em;
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

  /* scroll hint */
  background: linear-gradient(var(--bg-color) 33%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), var(--bg-color) 66%) 0 100%,
    radial-gradient(
      farthest-side at 50% 0,
      var(--shadow-color),
      rgba(255, 255, 255, 0)
    ),
    radial-gradient(
        farthest-side at 50% 100%,
        var(--shadow-color),
        rgba(255, 255, 255, 0)
      )
      0 100%;
  background-color: var(--bg-color);
  background-repeat: no-repeat;
  background-attachment: local, local, scroll, scroll;
  background-size: 100% 33px, 100% 33px, 100% 11px, 100% 11px;

  /* design */
  width: 100%;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  border-radius: 10px;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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

const vAreaHeight = 192
const vItemHeight = 56

const _SetlistTable = () => {
  const { nodes, loadMoreFn } = useGetMore({})

  const { renderItems, updateRenderItem, ulStyle } = useVirtualScroll({
    items: nodes,
    vAreaHeight,
    vItemHeight,
  })

  return (
    <>
      <VirtualRoot onScroll={updateRenderItem}>
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
      <button type="button" onClick={loadMoreFn}>
        more
      </button>
    </>
  )
}

export const SetlistTable = memo(_SetlistTable)
