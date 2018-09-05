import React, { PureComponent } from 'react'
import StudsRecruitmentSectionModel
  from 'models/StudsRecruitmentSectionModel'
import StudsRecruitmentLeaderModel
  from 'models/StudsRecruitmentLeaderModel'
import StudsRecruitmentRoleModel from 'models/StudsRecruitmentRoleModel'
import RecruitmentSection from 'components/RecruitmentSection'
import styles from './styles.css'
import Nils from 'static/img/people/nils.png'
import Michel from 'static/img/people/michel.png'
import Emmeli from 'static/img/people/emmeli.jpg'
import Moa from 'static/img/people/moa.jpg'
import Mauritz from 'static/img/people/mauritz.png'
import RecruitmentHeader from 'components/RecruitmentHeader'
import RecruitmentFooter from 'components/RecruitmentFooter'
import ReactGA from 'react-ga'

const RECRUITMENT_URL = 'https://studieresan.se/ansok'

class Recruitment extends PureComponent {
  constructor() {
    super()
    this.state = {
      sections: [
        new StudsRecruitmentSectionModel(
          1,
          'Sälj- och eventgrupperna ',
          'utgör ryggraden i Studs och jobbar tätt tillsammans med alla de företagsevent som finansierar studieresan.',
          [
            new StudsRecruitmentLeaderModel(
              'Säljansvarig',
              'Nils Streijffert',
              Nils,
              'nilsstre@kth.se',
              [
                new StudsRecruitmentRoleModel(
                  'Säljgruppen',
                  'Säljgruppen är Studs största grupp, och arbetar med att kontakta företag och sälja in event. ',
                  `I denna grupp behöver du tycka om att arbeta i grupp, vara utåtriktad och social. 
                  Arbetet är som mest intensivt under hösten och drar igång direkt efter rekryteringen. 
                  Om du söker denna grupp så boka upp D-dagen den 11:e oktober.`),
              ]),
            new StudsRecruitmentLeaderModel(
              'Eventansvarig',
              'Moa Bäck',
              Moa,
              'moa2@kth.se',
              [
                new StudsRecruitmentRoleModel(
                  'Eventgruppen',
                  'Eventgruppen ansvarar för genomförandet av alla företagsevent ',
                  `och kommer tillsammans med företagen att utforma event som är relevanta, intressanta och roliga både för oss och företagen. 
                  Som en del av detta arbete kommer gruppen också att sammanställa feedback i samband med varje event. 
                  Till eventgruppen söker vi personer som vill jobba nära företagen i en kreativ roll.`),
              ]),
          ]),

        new StudsRecruitmentSectionModel(
          2,
          '',
          '',
          [
            new StudsRecruitmentLeaderModel(
              'Reseansvarig',
              'Mauritz Zachrisson',
              Mauritz,
              'mauritzz@kth.se',
              [
                new StudsRecruitmentRoleModel(
                  'Resegruppen',
                  'Resegruppen står för all planering och genomförande av studieresan som avslutar projektet',
                  ` – allt ifrån resrutt och flyg till koordinering av dagsaktiviteter. 
                  Arbetet är både kreativt och strukturerat, då resegruppen utöver planering och logistik också är ansvarig för att ta fram inspiration och förslag på resmål, som gruppen sedan väljer bland. 
                  Merparten av arbetet sker under hösten.`),
              ]),
          ]),

        new StudsRecruitmentSectionModel(
          3,
          'IT- och informationsgrupperna ',
          `
          jobbar med information om Studs, både internt och externt. 
          Informationsgruppen består av fotografer, redaktörer och en Art Director. 
          De sätter tillsammans ihop en rapport för projektet, som är en sammanställning av projektet, resan och eventen. 
          IT-gruppen består av utvecklare och en Art Director, som ansvarar för Studs webbsida och de interna webbapplikationerna.
          `,
          [
            new StudsRecruitmentLeaderModel(
              'IT-ansvarig',
              'Michel Tabari',
              Michel,
              'tabari@kth.se',
              [
                new StudsRecruitmentRoleModel(
                  'Utvecklare',
                  'IT-gruppen ansvarar för Studs webbsida och de interna mobilapplikationerna. ',
                  `
                  De programmeringsspråk som används är JavaScript (React, Node), Kotlin (Android) och Swift (iOS). 
                  Som utvecklare får du stor frihet att jobba med det du vill inom webb och app. 
                  Du bör ha ett intresse för programmering och mjukvaruutveckling och ett sug efter att lära dig nya saker. 
                  Det är ett plus om du har tidigare erfarenhet, men det är inget krav. 
                  Arbetsbelastningen är kontinuerlig under året.`),

                new StudsRecruitmentRoleModel(
                  'Art Director',
                  'Studs har två Art Directors som tillsammans skapar projektets grafiska profil. ',
                  'Den ena kommer att jobba mest med webbdesign som en del av IT-gruppen, och den andra mest med designen av rapporten (läs: sammanställning av projektet, resan och eventen i en slags broschyr), som en del av informationsgruppen.'),
              ]),

            new StudsRecruitmentLeaderModel(
              'Informationsansvarig',
              'Emmeli Hansson',
              Emmeli,
              'emmelih@kth.se',
              [
                new StudsRecruitmentRoleModel(
                  'Redaktör',
                  'Redaktörerna skriver de texter som hamnar i rapporten',
                  `, på hemsidan och på sociala medier. 
                  Det är texter om företagen vi besöker, eventen på företagen och intrycken av dessa, samt texter om resan och upplevelserna på resan.`),

                new StudsRecruitmentRoleModel(
                  'Fotograf',
                  'Vill du hjälpa till att fånga ögonblicken? ',
                  'Som fotograf tar du bilder av projektgruppen - både porträttbilder och bilder av de event och resor som vi gör - som används till webbsidan, marknadsföring på sociala medier och rapporten.'),
              ]),
          ]),
      ],
    }
  }

  componentDidMount() {
    ReactGA.pageview('/student')
  }

  onApplyClick() {
    ReactGA.event({
      category: 'Application',
      action: 'Clicked apply now',
      label: 'Apply button',
    })
  }

  render() {
    return (
      <React.Fragment>
        <RecruitmentHeader/>
        <div className={styles.container}>
          <div>
            { this.state.sections.map(section => <RecruitmentSection key={section.id} recruitmentSection={section}/>) }
            <RecruitmentFooter onClickUrl={RECRUITMENT_URL} onClick={this.onApplyClick}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Recruitment
