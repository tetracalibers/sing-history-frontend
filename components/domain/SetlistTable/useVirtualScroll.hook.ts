import { UIEventHandler, useMemo, useState } from "react"

type HookArgs<T> = {
  items: T[]
  vAreaHeight: number
  vItemHeight: number
}

const RESERVE_ITEM_COUNT = 3

export const useVirtualScroll = <T>({
  items,
  vItemHeight,
  vAreaHeight,
}: HookArgs<T>) => {
  const renderItemsMax = Math.floor(
    vAreaHeight / vItemHeight + RESERVE_ITEM_COUNT,
  )
  const [startIdx, setStartIdx] = useState(0)

  const updateRenderItem: UIEventHandler<HTMLDivElement> = e => {
    const { scrollTop } = e.currentTarget
    const nextStartIdx = Math.floor(scrollTop / vItemHeight)
    setStartIdx(nextStartIdx)
  }

  const renderItems = useMemo(
    () => items.slice(startIdx, startIdx + renderItemsMax),
    [items, startIdx, renderItemsMax],
  )

  const ulStyle = { position: "relative", top: startIdx * vItemHeight } as const

  return { renderItems, ulStyle, updateRenderItem }
}
