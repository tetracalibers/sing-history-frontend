import { Page } from "./pagenation"

export type Setlist = {
  artistName: string
  songName: string
  id: string
  jacketUrl: string
  singKey: number
}

export type SetlistPerPage = {
  setlistPerPage: Page<Setlist>
}
