import React from 'react'
import FadeInEffect from './FadeInEffect'
import {
  OnTopBoxImg,
  Container,
  LeftPic,
  TextBox2,
  TextBox1,
  OnTopBox,
  ContainerStuds,
} from './styles/WhatIsSection.styled'
import messages from './messages'
import { FormattedMessage } from 'react-intl'

export default function WhatIsSection() {
  return (
    <Container>
      <ContainerStuds>
        <LeftPic />
        <FadeInEffect width='55%'>
          <TextBox1>
            <h1>
              <FormattedMessage {...messages.whatis.title} />
            </h1>
            {/* <p>Studs is an annual nonprofit project from KTH, run by students. The project consists of 28 selected engineering students in master programs relevant to computer science.

              <br /><br />By organizing events together with companies, we create opportunities to give both students and their potential employers valuable time together.</p> */}
            {Object.keys(messages.whatis.body).map(k => (
              <p key={k}>
                <FormattedMessage {...messages.whatis.body[k]} />
                <br />
                <br />
              </p>
            ))}
          </TextBox1>
        </FadeInEffect>
      </ContainerStuds>
      <OnTopBox>
        <OnTopBoxImg />
        <FadeInEffect width='60%'>
          <TextBox2>
            <h1>
              <FormattedMessage {...messages.createEvent.title} />
            </h1>
            {/* <p>Studs helps companies tailor events to their needs, which guarantees that each event is as unique as the company that arranged it.</p> */}
            <p>
              {Object.keys(messages.createEvent.body).map(k => (
                <p key={k}>
                  <FormattedMessage {...messages.createEvent.body[k]} />
                </p>
              ))}
            </p>
          </TextBox2>
        </FadeInEffect>
      </OnTopBox>
    </Container>
  )
}
