import React, { Component } from 'react'
import styles from './styles.css'
import Section from 'components/Section'
import Carl from 'static/img_new/people/carl.jpg'
import Christine from 'static/img_new/people/christine.jpg'
import Marko from 'static/img_new/people/marko.jpg'
import Klara from 'static/img_new/people/klara.jpg'
import Cristian from 'static/img_new/people/cristian.jpg'
import Samuel from 'static/img_new/people/samuel.jpg'
import MemberImage from 'components/MemberImage'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

const Image = ({ picture }) => (
  <MemberImage
    className={styles.contactPicture}
    picture={picture}
    size={150}
    square
    round
  />
)

export class StudentComponent extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Grupperna</h1>
        <div className={styles.intro}>
          <p>
            Studs består av sex olika grupper med varsitt arbetsområde och
            varsin ledare, där alla gruppers insats är lika viktiga för att
            projektet ska lyckas. Mycket av arbetet i Studs sker grupperna
            emellan och det är därför viktigt att du som gruppmedlem är
            samarbetsvillig och förstår att vi alla arbetar mot ett gemensamt
            mål. Studs kommer inte att bara ge dig goda kunskaper inom allt vad
            projektarbete innebär, utan du kommer också att ha ett otroligt
            roligt år och knyta värdefulla relationer med näringslivet och inom
            gruppen!
          </p>
        </div>
        <div className={styles.group_container}>
          <h2>Ekonomigruppen</h2>
          <div className={styles.group}>
            <div className={styles.leader}>
              <Image picture={Klara} round />
              <h3>Klara Eserstam</h3>
              <h5>klara@studs.se</h5>
            </div>
            <div className={styles.info}>
              <p>
                Ekonomigruppen är liten grupp som jobbar nära varandra och
                projektledarna med att skapa projektets budget och se till att
                den efterföljs. Gruppen sköter även all bokföring och
                tillgodoser de andra gruppernas ekonomiska behov.
                <br />
                Har du funderingar? Kontakta Klara!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.group_container}>
          <h2>Eventgruppen</h2>
          <div className={styles.group}>
            <div className={styles.leader}>
              <Image picture={Christine} round />
              <h3>Christine Rosquist</h3>
              <h5>christine@studs.se</h5>
            </div>
            <div className={styles.info}>
              <p>
                Eventgruppen ansvarar för planerandet och genomförandet av alla
                företagsevent och arbetar tillsammans med företagen för att
                skapa evenemang som är relevanta, intressanta och roliga både
                för projektmedlemmarna och företagen. Gruppen hjälper företagen
                att visa sina bästa sidor och arbetet är därför kreativt då
                företagen skiljer sig mycket och kräver olika lösningar.
                <br />
                Har du funderingar? Kontakta Christine!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.group_container}>
          <h2>Informationsgruppen</h2>
          <div className={styles.group}>
            <div className={styles.leader}>
              <Image picture={Samuel} round />
              <h3>Samuel Hertzberg</h3>
              <h5>samuel@studs.se</h5>
            </div>
            <div className={styles.info}>
              <p>
                Informationsgruppen består av fotografer, redaktörer och två art
                directors som tillsammans skapar allt innehåll och den grafiska
                profil som syns i våra olika kanaler samt i rapporten.
                Fotograferna tar porträttbilder av projektgruppen samt
                fotograferar alla event och resan. Redaktörerna producerar all
                text i sociala medier och rapporten. Gruppens art directors
                skapar den grafiska profilen och är ansvariga webb-, app- och
                UX-design. De ansvar också för rapportens layout.
                <br />
                Har du funderingar? Kontakta Samuel!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.group_container}>
          <h2>IT-gruppen</h2>
          <div className={styles.group}>
            <div className={styles.leader}>
              <Image picture={Marko} round />
              <h3>Marko Lazic</h3>
              <h5>marko@studs.se</h5>
            </div>
            <div className={styles.info}>
              <p>
                IT-gruppen ansvarar för Studs webbsida och de interna
                mobilapplikationerna som finns för både Android och iOS. Du bör
                ha ett intresse för programmering och mjukvaruutveckling samt
                viljan att lära dig nya saker. Det är ett plus om du har
                tidigare erfarenhet, men det är inget krav.
                <br />
                Har du funderingar? Kontakta Marko!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.group_container}>
          <h2>Resegruppen</h2>
          <div className={styles.group}>
            <div className={styles.leader}>
              <Image picture={Carl} round />
              <h3>Carl Nordling</h3>
              <h5>carl@studs.se</h5>
            </div>
            <div className={styles.info}>
              <p>
                Resegruppen ansvarar för all planering och genomförandet av
                resan som avslutar projektet, allt från resrutt och flyg till
                koordinering av dagsaktiviteter. Arbetet är både kreativt och
                strukturerat då resegruppen utöver planering och logistik också
                är ansvarig för att ta fram inspiration och förslag på resmål.
                Som medlem i resegruppen leder du hela projektgruppen under
                resan, ser till att alla har det bra och hanterar oförutsägbara
                situationer.
                <br />
                Har du funderingar? Kontakta Carl!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.group_container}>
          <h2>Säljgruppen</h2>
          <div className={styles.group}>
            <div className={styles.leader}>
              <Image picture={Cristian} round />
              <h3>Cristian Osorio Bretti</h3>
              <h5>cristian@studs.se</h5>
            </div>
            <div className={styles.info}>
              <p>
                Medlemmarna i säljgruppen skapar den första kontakten mellan
                Studs och företag och säljer in event. Det är viktigt att du som
                medlem i säljgruppen är utåtriktad och social, och inte tappar
                glöden om du får ett nej. Säljgruppen jobbar nära flera andra
                grupper, framförallt eventgruppen som tar över när ett event har
                blivit bokat.
                <br />
                Har du funderingar? Kontakta Cristian!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Image.propTypes = {
  picture: PropTypes.string.isRequired,
}
