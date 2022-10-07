import { memo } from "react"
import { Setlist } from "../../../types/setlist"

type Props = {
  song: Setlist
}

const _Song = ({ song }: Props) => {
  return (
    <li>
      {song.artistName} : {song.songName}
    </li>
  )
}

export const Song = memo(_Song)
