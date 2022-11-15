import React from 'react'
import FadeInEffect from './FadeInEffect'
import {
  PreviousBox,
  Container,
  EventPlanningBox,
  EventImg1,
  EventImg2,
  TextBox1,
  TextBox2,
  ButtonPreviousEvents,
} from './styles/EventAndPlanning.styled'

export default function EventAndPlanning() {
  return (
    <Container>
      <EventPlanningBox>
        <EventImg1 src='https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' />
        <FadeInEffect>
          <TextBox1>
            <h1>Events & Planning</h1>
            <p>
              During the year, Studs members will meet with companies during
              events, usually arranged at corporate offices.
              <br />
              <br />
              For students, this is an opportunity to gain deeper insights into
              the working life of the company and about the company&apos;s
              operations.
            </p>
          </TextBox1>
        </FadeInEffect>
      </EventPlanningBox>
      <PreviousBox>
        <FadeInEffect width='100%'>
          <TextBox2>
            <p>Interested?</p>
            <h1>CHECK OUT PREVIOUS EVENTS!</h1>
            <ButtonPreviousEvents>PREVIOUS EVENTS</ButtonPreviousEvents>
          </TextBox2>
        </FadeInEffect>
        <EventImg2 src='https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80' />
      </PreviousBox>
    </Container>
  )
}
