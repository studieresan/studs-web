import React from 'react'
import { Links, Logo, Navbar } from './styles/Navbar.styled'
export default function NavBar() {
  return (
    <Navbar>
      <Logo>
        <p>Studs</p>
      </Logo>
      <Links>
        <p>Om oss</p>
        <p>Event</p>
        <p>Grupperna</p>
        <p>Blogg</p>
        <p>English</p>
        <p>Logga in</p>
      </Links>
    </Navbar>
  )
}
