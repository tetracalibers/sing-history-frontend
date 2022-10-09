import { ComponentPropsWithoutRef } from "react"
import styled from "styled-components"

const Svg = styled.svg`
  width: 1rem;

  @media (max-width: 40em) {
    width: 1.25rem;
  }
`

type Props = ComponentPropsWithoutRef<"svg">

export const FlatIcon = ({ ...props }: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill="#29539b"
    stroke="#29539b"
    {...props}
  >
    <path d="M200.438 214.712V0h-71.18v512s170.389-50.606 236.182-162.99c58.612-100.117-40.513-209.986-165.002-134.298zm100.07 87.897c-6.37 82.823-100.117 126.984-100.117 126.984v-156.27c39.058-34.183 105.003-34.183 100.117 29.286z" />
  </Svg>
)
