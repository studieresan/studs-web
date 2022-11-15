import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
    padding : 0px;
    margin : 0px;
}
p {
    font-family : outfit;
    font-size:25px;
}
h1{
    font-family : outfit;
    font-size:80px;
}
@media (max-width: 1200px) {
    p{
        font-size:20px;
    }
    h1{
        font-size:50px;
    }
  }
  @media (max-width: 800px) {
    p{
        font-size:20px;
    }
  }
`

export default GlobalStyles
