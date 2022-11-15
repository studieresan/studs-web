import styled from 'styled-components'
import { ButtonMain } from './Buttons.styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const EventPlanningBox = styled.div`
  display: flex;
  margin-bottom: 100px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
export const EventImg1 = styled.img`
  width: 50%;
  border-radius: 0px 0px 50px 0px;
  @media (max-width: 800px) {
    border-radius: 0px 0px 0px 0px;
    width: 100%;
  }
`
export const EventImg2 = styled.img`
  width: 50%;
  border-radius: 50px 0px 0px 0px;
  @media (max-width: 800px) {
    border-radius: 0px 0px 0px 0px;
    width: 100%;
  }
`
export const TextBox1 = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    width: 90%;
  }
  p {
    width: 80%;
  }
`
export const TextBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 50px;
    margin-bottom: 30px;
    text-align: center;
    height: 100%;
  }
  p {
    margin-bottom: 20px;
  }
  @media (max-width: 800px) {
    margin-bottom: 50px;
    margin-top: 50px;
  }
  @media (max-width: 1200px) {
    h1 {
      font-size: 40px;
    }
  }
`
export const ButtonPreviousEvents = styled(ButtonMain)`
  padding-left: 50px;
  padding-right: 50px;
  color: white;
  background-color: black;
`
export const PreviousBox = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`
