import { RefObject, useEffect, useMemo, useState } from "react"
import {
  fromEvent,
  map,
  filter,
  tap,
  exhaustMap,
  combineLatestWith,
  throttleTime,
  debounceTime,
  distinct,
  merge,
  BehaviorSubject,
} from "rxjs"
import { useGetMore } from "./useGetMore.hook"
import { useObservedValue } from "./useObservedValue.hook"

type HookArgs<R extends HTMLElement> = {
  rootRef: RefObject<R>
  vAreaHeight: number
  vItemHeight: number
}

const RESERVE_ITEM_COUNT = 3
const LOAD_ONCE = 5

export const useVirtualScroll = <R extends HTMLElement>({
  rootRef,
  vItemHeight,
  vAreaHeight,
}: HookArgs<R>) => {
  const renderItemsMax = Math.floor(
    vAreaHeight / vItemHeight + RESERVE_ITEM_COUNT,
  )
  const [startIdx, setStartIdx] = useState(0)

  const { nodes, loadMoreFn } = useGetMore({ loadOnce: LOAD_ONCE })

  const onScrollFetch$ = useObservedValue(loadMoreFn)

  useEffect(() => {
    const pageByScroll$ = fromEvent(rootRef?.current!, "scroll").pipe(
      map(e => e.target as HTMLElement),
      map(el => ({
        sH: el.scrollHeight,
        sT: el.scrollTop,
        cH: el.clientHeight,
      })),
      tap(pos => setStartIdx(Math.floor(pos.sT / vItemHeight))),
      filter(
        pos =>
          pos.sH >=
          vItemHeight * Math.floor(vAreaHeight / vItemHeight) + pos.sT,
      ),
      debounceTime(200),
      distinct(),
      map(pos => Math.ceil((pos.sT + pos.cH) / (vItemHeight * LOAD_ONCE))),
    )

    const pageByResize$ = fromEvent(window, "resize").pipe(
      debounceTime(200),
      map(_ =>
        Math.ceil(
          (window.innerHeight + document.body.scrollTop) /
            (vItemHeight * LOAD_ONCE),
        ),
      ),
    )

    const pageByManual$ = new BehaviorSubject(1)

    const pageToLoad$ = merge(pageByManual$, pageByScroll$, pageByResize$).pipe(
      distinct(),
      filter(page => page > 1),
    )

    const ssc$ = pageToLoad$
      .pipe(
        combineLatestWith(onScrollFetch$),
        throttleTime(150),
        exhaustMap(([, fn]) => fn()),
      )
      .subscribe()

    return () => ssc$.unsubscribe()
  }, [])

  const renderItems = useMemo(
    () => nodes.slice(startIdx, startIdx + renderItemsMax),
    [nodes, startIdx, renderItemsMax],
  )

  const ulStyle = { position: "relative", top: startIdx * vItemHeight } as const

  return { renderItems, ulStyle }
}
