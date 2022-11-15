import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 110px;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${({ theme }) => theme.color.PageColor};
`
export const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`
export const Card = styled.div`
  margin-top: 150px;
  position: relative;
  padding-top: 100px;
  display: flex;
  box-shadow: 5px 5px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.BoxColor};
  border-radius: 50px;
  width: 27%;
  h2 {
    padding-top: 30px;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: bold;
    font-family: outfit;
  }
  p {
    width: 80%;
    text-align: left;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`
export const CardImg = styled.img`
  border-radius: 100px;
  width: 200px;
  height: 200px;
  position: absolute;
  top: -100px;
`
