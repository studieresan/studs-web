import React from 'react'
import FadeInEffect from './FadeInEffect'
import {
  Card,
  CardContainer,
  CardImg,
  Container,
} from './styles/WorkWithUs.styled'

export default function WorkWithUs() {
  return (
    <Container>
      <h1> WORK WITH US!</h1>
      <FadeInEffect>
        <CardContainer>
          <Card>
            <CardImg src='https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
            <h2> Sales manager</h2>
            <p>
              If you are interested in having an event with us, or you are
              curious and want to know more – contact This Guy
              <br />
              <br />
              This Guy
              <br />
              Phone: 7345683475
              <br />
              Email: this.guy@guy.guy
            </p>
          </Card>
          <Card>
            <CardImg src='https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
            <h2> Sales manager</h2>
            <p>
              If you are interested in having an event with us, or you are
              curious and want to know more – contact This Guy
              <br />
              <br />
              This Guy
              <br />
              Phone: 7345683475
              <br />
              Email: this.guy@guy.guy
            </p>
          </Card>
          <Card>
            <CardImg src='https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
            <h2> Sales manager</h2>
            <p>
              If you are interested in having an event with us, or you are
              curious and want to know more – contact This Guy
              <br />
              <br />
              This Guy
              <br />
              Phone: 7345683475
              <br />
              Email: this.guy@guy.guy
            </p>
          </Card>
        </CardContainer>
      </FadeInEffect>
    </Container>
  )
}
