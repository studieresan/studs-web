import React from 'react'
import {
  ButtonContainer,
  HeroContainer,
  HeroPic,
  HeroDiv,
  ButtonProject,
  ButtonWork,
} from './styles/HeroPic.styled'

export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroPic
        frameborder='0'
        allowfullscreen='1'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        src='https://www.youtube.com/embed/7J1hb2xG8v8?autoplay=1&amp;mute=1&amp;autohide=1&amp;modestbranding=1&amp;playsinline=1&amp;rel=0&amp;frameborder=0&amp;showinfo=0&amp;controls=0&amp;disablekb=1&amp;enablejsapi=1&amp;iv_load_policy=3&amp;loop=1&amp;playlist=7J1hb2xG8v8&amp;origin=https%3A%2F%2Fveriott.com&amp;widgetid=1'
      />
      <HeroDiv>
        <h1>Connecting Stockholm with KTH’s top tier tech students</h1>
        <ButtonContainer>
          <ButtonWork>WORK WITH US</ButtonWork>
          <ButtonProject>THE PROJECT</ButtonProject>
        </ButtonContainer>
      </HeroDiv>
    </HeroContainer>
  )
}
