import styled from 'styled-components'

export const Navbar = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
export const Logo = styled.div`
  padding-left: 50px;
  p {
    font-size: 40px;
    font-weight: light;
  }
`
export const Links = styled.div`
  padding-right: 20px;
  display: flex;

  p {
    font-size: 20px;
    font-weight: light;
    padding-left: 10px;
    padding-right: 10px;
  }
`
