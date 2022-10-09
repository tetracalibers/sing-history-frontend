import { memo } from "react"
import styled from "styled-components"
import { Setlist } from "../../../types/setlist"
import { BiUserVoice } from "react-icons/bi"

const _Card = styled.div`
  position: relative;
  padding: 0.5rem auto;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: flex;
  height: 100px;
  box-sizing: border-box;
  color: rgb(72, 84, 97);
  font-family: "Noto Serif JP", serif;
  justify-items: center;
  width: 40vw;
  box-shadow: rgb(17 12 46 / 15%) 0px 48px 100px 0px;
`
const Card = memo(_Card)

const _JacketImage = styled.img`
  filter: opacity(0.8);
  border-radius: 10px 0px 0px 10px;
  transform: translateZ(0px);
`
const JacketImage = memo(_JacketImage)

const _Content = styled.div`
  width: calc(100% - 100px);
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Content = memo(_Content)

const _ArtistName = styled.div`
  font-size: calc(14px * 0.8);
  display: flex;
  align-items: end;
`
const ArtistName = memo(_ArtistName)

const _SongName = styled.div`
  font-weight: 700;
`
const SongName = memo(_SongName)

type Props = {
  artistName: string
  songName: string
  jacketUrl?: string
}

const _Song = ({ artistName, songName, jacketUrl }: Props) => {
  return (
    <Card>
      <JacketImage
        src={jacketUrl ? jacketUrl.replace("30x30", "100x100") : "/noimage.jpg"}
        width={100}
        height={100}
      />
      <Content>
        <SongName>{songName}</SongName>
        <ArtistName>
          <BiUserVoice aria-hidden="true" />
          {artistName}
        </ArtistName>
      </Content>
    </Card>
  )
}

export const Song = memo(_Song)
