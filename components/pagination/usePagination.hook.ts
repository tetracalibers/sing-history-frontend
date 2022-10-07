import { useMemo } from "react"

const DOTS = "..."

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

type HookArgs = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: HookArgs) => {
  const paginationRange = useMemo(() => {
    // 何ページに分割されるか
    // 余ったアイテムを表示する用のページも必要なので、ceilで切り上げ
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // 以下のように、3つの番号と2つのDOTSが並ぶので、5を加える
    //    firstPage ... currentPage ... lastPage
    // siblingCountは、currentPageの左右に並べるページ番号の個数
    const totalPageNumbers = siblingCount + 5

    // Case1. 合計ページ数が、表示したいページ番号の個数より少ない場合
    //    < 1 2 3 4 5 >
    // のように、全てのページ番号を並べればいいだけ
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    // currentPageの前のページ番号
    // 負の数にはならないように、最低を1とする
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)

    // currentPageの後のページ番号
    // ページ数を超えないように、最高をページ数とする
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    )

    // 左のDOTSを表示する必要があるのは、leftSibingIndexが3以上の時
    //    firstPage ... leftSibling currentPage
    const shouldShowLeftDots = leftSiblingIndex > 2

    // 右のDOTSを表示する必要があるのは、rightSibingIndexがlastPegeより3以上小さい時
    //    currentPage rightSibling ... lastPage
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    // 最初のページ番号
    const firstPageIndex = 1

    // 最後のページ番号
    const lastPageIndex = totalPageCount

    // Case2. 右のDOTSだけ表示する必要がある場合
    //    < first left current right ... last >
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // 3 ... first + current + (開始番号を1にするために加える1)
      // 2 * siblingCount ... left + right
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    // Case3. 左のDOTSだけ表示する必要がある場合
    //    < first ... left current right last >
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    // Case4. 左右のDOTSを表示する必要がある場合
    //    < first ... left current right ... last >
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [totalCount, pageSize, siblingCount, currentPage])

  const lastPage = paginationRange[paginationRange.length - 1]

  const isDOTS = (pageNumber: number | string): pageNumber is string =>
    pageNumber === DOTS

  return { paginationRange, lastPage, isDOTS }
}
