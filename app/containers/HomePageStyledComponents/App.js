import React from 'react'
import EventAndPlanning from '../../components/HomePageStyledComponents/components/EventAndPlanning'
import Footer from '../../components/HomePageStyledComponents/components/Footer'
import HeroSection from '../../components/HomePageStyledComponents/components/HeroSection'
import MeetTheTeam from '../../components/HomePageStyledComponents/components/MeetTheTeam'
import SponsorSection from '../../components/HomePageStyledComponents/components/SponsorSection'
import GlobalStyles from '../../components/HomePageStyledComponents/components/styles/Global'
import WhatIsSection from '../../components/HomePageStyledComponents/components/WhatIsSection'
import WorkWithUs from '../../components/HomePageStyledComponents/components/WorkWithUs'
import { ThemeProvider } from 'styled-components'
const theme = {
  color: {
    PageColor: '#F7EED7',
    BoxColor: '#B0FFFA',
  },
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HeroSection />
      <WhatIsSection />
      <SponsorSection />
      <MeetTheTeam />
      <EventAndPlanning />
      <WorkWithUs />
      <Footer />
    </ThemeProvider>
  )
}

export default App
