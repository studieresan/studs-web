import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 70px;
  p {
    font-size: 45px;
    text-align: center;
    padding: 20px;
    font-style: italic;
  }
  @media (max-width: 1200px) {
    p {
      font-size: 35px;
    }
  }
  @media (max-width: 800px) {
    p {
      font-size: 30px;
    }
  }
`
export const SponsImg = styled.img`
  width: 80%;
`

export const BackSwiper = styled.div`
  background-color: ${({ theme }) => theme.color.BoxColor};
`
