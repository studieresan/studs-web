import React from 'react'
import styles from './styles.css'

const RecruitmentHeader = () =>
  <div className={styles.recruitmentHeader}>
    <h2>Sök Studs 2019!</h2>
    <div>
      <p className={styles.boldIntro}>Studs är en årlig projektkurs som genomförs av ca 30 masterstudenter med datainriktning. Gemensamt planerar och anordnar vi i projektgruppen företagsevent, som tillsammans finansierar en studieresa under sommaren 2019. <a href='https://www.kth.se/student/kurser/kurs/AI2151' target="_blank" rel="noopener noreferrer">Kursen (AI2151)</a> är på 15 HP och destinationen för studieresan bestäms gemensamt av projektmedlemmarna.</p>

      <p>De företagsevent som arrangeras under läsåret är obligatoriska för samtliga projektmedlemmar och merparten av dessa event sker under VT19. Vanligtvis äger eventen rum på kvällen och uppläggen kan skilja sig mellan olika event – totalt ca 30 företagsevent under läsåret. Med detta är Studs en unik chans att knyta värdefulla kontakter inom näringslivet.</p>

      <p>Inom projektet har varje projektmedlem en arbetsuppgift inom en undergrupp. Detta arbete sträcker sig över hela läsåret – arbetsintensiteten kan dock variera mellan olika perioder och undergrupper. Målet är att arbetet ska vara jämnt fördelat mellan alla projektmedlemmar oavsett undergrupp.</p>

      <p>Du kan söka om du läser en master på KTH med en inriktning åt datahållet. Det inkluderar dig som läser civilingenjör i Datateknik, master i Datalogi, master i Maskininlärning eller master i Interaktiv Medieteknik (om du inriktar dig mot exempelvis webb eller UX), men det finns andra inriktningar som kan söka. Fråga oss om du är osäker!</p>
    </div>
  </div>

export default RecruitmentHeader
