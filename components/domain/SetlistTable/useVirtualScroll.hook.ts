import { RefObject, useEffect, useMemo, useState } from "react"
import {
  fromEvent,
  map,
  pairwise,
  filter,
  tap,
  exhaustMap,
  combineLatestWith,
  throttleTime,
} from "rxjs"
import { useGetMore } from "./useGetMore.hook"
import { useObservedValue } from "./useObservedValue.hook"

type HookArgs<R extends HTMLElement> = {
  rootRef: RefObject<R>
  vAreaHeight: number
  vItemHeight: number
}

const RESERVE_ITEM_COUNT = 3

type ScrollPos = {
  sT: number
  sH: number
  cH: number
}

/**
    check if the user is scrolling down by 
    previous scroll position and current scroll position
**/
const isUserScrollingDown = (positions: [ScrollPos, ScrollPos]) => {
  return positions[0].sT < positions[1].sT
}

/** Check if the scroll position at required
    percentage relative to the container 
**/
const isScrollExpectedPercent = (position: ScrollPos, percent: number) => {
  return (position.sT + position.cH) / position.sH > percent / 100
}

export const useVirtualScroll = <R extends HTMLElement>({
  rootRef,
  vItemHeight,
  vAreaHeight,
}: HookArgs<R>) => {
  const renderItemsMax = Math.floor(
    vAreaHeight / vItemHeight + RESERVE_ITEM_COUNT,
  )
  const [startIdx, setStartIdx] = useState(0)

  const { nodes, loadMoreFn } = useGetMore({})

  const onScrollFetch$ = useObservedValue(loadMoreFn)

  useEffect(() => {
    const scrollEvent$ = fromEvent(rootRef?.current!, "scroll")

    const userScrolledDown$ = scrollEvent$.pipe(
      map(e => e.target as HTMLElement),
      map(el => ({
        sH: el.scrollHeight,
        sT: el.scrollTop,
        cH: el.clientHeight,
      })),
      pairwise(),
      tap(pos => {
        const top = pos[1].sT
        setStartIdx(Math.floor(top / vItemHeight))
      }),
      filter(positions => {
        return (
          isUserScrollingDown(positions) &&
          isScrollExpectedPercent(positions[1], 99)
        )
      }),
      combineLatestWith(onScrollFetch$),
      throttleTime(150),
      exhaustMap(([, fn]) => fn()),
    )

    const ssc$ = userScrolledDown$.subscribe()

    return () => ssc$.unsubscribe()
  }, [])

  const renderItems = useMemo(
    () => nodes.slice(startIdx, startIdx + renderItemsMax),
    [nodes, startIdx, renderItemsMax],
  )

  const ulStyle = { position: "relative", top: startIdx * vItemHeight } as const

  return { renderItems, ulStyle }
}
