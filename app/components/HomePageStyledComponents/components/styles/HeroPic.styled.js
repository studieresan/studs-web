import styled from 'styled-components'
import { ButtonMain } from './Buttons.styled'

export const HeroPic = styled.iframe`
  width: 2200px;
  height: 1100px;
  left: 50%;
  transform: translate(-50%, 0);
  top: -10%;
  opacity: 70%;
  position: absolute;
  z-index: -1;
  @media (max-width: 1200px) {
    width: 1500px;
    height: 800px;
  }
  @media (max-width: 800px) {
    width: 1200px;
    height: 500px;
  }
`
export const HeroContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 50vw;
  min-height: 500px;
`
export const HeroDiv = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: auto;
  h1 {
    text-align: left;
    margin-bottom: 30px;
  }
  p {
    font-weight: bold;
    margin-bottom: 30px;
  }
`
export const ButtonProject = styled(ButtonMain)`
  background-color: white;
  color: #0e4142;
`
export const ButtonWork = styled(ButtonMain)``
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`
