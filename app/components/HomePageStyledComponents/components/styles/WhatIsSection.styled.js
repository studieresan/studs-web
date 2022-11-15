import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`
export const ContainerStuds = styled.div`
  position: relative;
  display: flex;
`
export const LeftPic = styled.div`
  background-image: url(https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  width: 45%;
  height: 70vw;
  min-height: 500px;
`
export const TextBox1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 6vw;
    width: 100%;
    font-family: outfit;
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    width: 80%;
  }
`
export const TextBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: left;
    width: 80%;
    font-size: 40px;
    font-family: outfit;
    margin-bottom: 20px;
  }
  p {
    width: 80%;
  }
  @media (max-width: 1200px) {
    h1 {
      font-size: 30px;
    }
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 25px;
    }
  }
`
export const OnTopBox = styled.div`
background-color:${({ theme }) => theme.color.BoxColor};
position:absolute;
height:24vw;
width 75%;
left: 20%;
top: 40vw;
display:flex;
align-items:center;
justify-content:space-around;
@media (max-width: 800px) {
    position:relative;
    left: 0px;
    top: 0px;
    width:100%;
    height:300px;
    margin-top:20px;
    }

`
export const OnTopBoxImg = styled.div`
  background-image: url(https://images.unsplash.com/photo-1484863137850-59afcfe05386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  width: 35%;
  height: 18vw;
  margin-left: 4vw;
  @media (max-width: 800px) {
    height: 150px;
  }
`
