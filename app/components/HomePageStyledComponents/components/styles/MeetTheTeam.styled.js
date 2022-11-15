import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.color.PageColor};
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`
export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const TextBox1 = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    margin-bottom: 30px;
  }
`
export const TextBox2 = styled.div`
  width: 60%;
  margin-left: 10px;
  margin-right: 10px;
  p {
    margin-top: 10px;
  }
`
export const Box = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 70px;
  box-shadow: 5px 5px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.color.BoxColor};
  border-radius: 50px;
  padding: 20px;
  @media (max-width: 1200px) {
    height: 150px;
    margin-bottom: 50px;
  }
`
export const BoxImg = styled.img`
  border-radius: 70px;
  width: 170px;
  height: 170px;
  @media (max-width: 1200px) {
    border-radius: 50px;
    width: 120px;
    height: 120px;
  }
`
