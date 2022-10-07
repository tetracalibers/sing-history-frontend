export type Edge<T> = {
  cursor: number
  node: T
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}

export type Page<T> = {
  edges: Edge<T>[]
  static?: Edge<T>[]
  pageInfo: PageInfo
  totalCount: number
}
