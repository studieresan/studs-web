import React from 'react'
import FadeInEffect from './FadeInEffect'
import { ButtonWork } from './styles/HeroPic.styled'
import {
  Box,
  BoxContainer,
  TextBox2,
  TextBox1,
  Container,
  BoxImg,
} from './styles/MeetTheTeam.styled'

export default function MeetTheTeam() {
  return (
    <Container>
      <TextBox1>
        <h1>Meet The Team</h1>
        <p>Our team is handpicked like the finest vine</p>
        <ButtonWork>ALL OF STUDS</ButtonWork>
      </TextBox1>
      <BoxContainer>
        <FadeInEffect>
          <Box>
            <BoxImg src='https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
            <TextBox2>
              <p>
                This is William. William is one of 28 students taking part of
                the Studs project
              </p>
              <p>- William sandner, Event group</p>
            </TextBox2>
          </Box>
        </FadeInEffect>

        <FadeInEffect>
          <Box>
            <BoxImg src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
            <TextBox2>
              <p>
                This is William. William is one of 28 students taking part of
                the Studs project
              </p>
              <p>- William sandner, Event group</p>
            </TextBox2>
          </Box>
        </FadeInEffect>
        <FadeInEffect>
          <Box>
            <BoxImg src='https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
            <TextBox2>
              <p>
                This is William. William is one of 28 students taking part of
                the Studs project
              </p>
              <p>- William sandner, Event group</p>
            </TextBox2>
          </Box>
        </FadeInEffect>
      </BoxContainer>
    </Container>
  )
}
