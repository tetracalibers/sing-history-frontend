import { Page } from "./pagenation"

export type Setlist = {
  artistName: string
  songName: string
  id: string
  jacketUrl: string
}

export type SetlistPerPage = {
  setlistPerPage: Page<Setlist>
}
