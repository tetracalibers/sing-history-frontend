import { usePagination } from "./usePagination.hook"
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md"
import { TbLineDotted } from "react-icons/tb"

type Props = {
  onPageChange: (pageNumber: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize?: number
}

export const PagenationNav = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 10,
}: Props) => {
  const { paginationRange, lastPage, isDOTS } = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // 最低3ページないと表示しない
  if (currentPage < 1 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrev = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <ul>
      <li>
        <button onClick={onPrev} disabled={currentPage === 1}>
          <MdOutlineKeyboardArrowLeft />
        </button>
      </li>
      {paginationRange.map(pageNumber => (
        <li>
          {isDOTS(pageNumber) ? (
            <TbLineDotted />
          ) : (
            <button onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          )}
        </li>
      ))}
      <li>
        <button onClick={onNext} disabled={currentPage === lastPage}>
          <MdOutlineKeyboardArrowRight />
        </button>
      </li>
    </ul>
  )
}
