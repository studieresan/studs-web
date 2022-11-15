import React from 'react'
import { SocialMediaIcons, Icon, Container, Info } from './styles/Footer.styled'

export default function Footer() {
  return (
    <Container>
      <Info>
        <p>©2021-2023 Studs</p>
        <p>About us</p>
        <p>Past Events</p>
        <p>Groups</p>
      </Info>
      <SocialMediaIcons>
        <Icon />
        <Icon />
        <Icon />
      </SocialMediaIcons>
    </Container>
  )
}
