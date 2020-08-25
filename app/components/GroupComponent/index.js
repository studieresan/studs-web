import React, { Component } from 'react'
import styles from './styles.css'
import messages from './messages.js'
import { it, event, finance, info, sales, travel } from 'static/groups.js'
import MemberImage from 'components/MemberImage'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

const Image = ({ picture }) => (
  <MemberImage
    className={styles.contactPicture}
    picture={picture}
    size={150}
    square
    round
  />
)

export default class GroupComponent extends Component {
  render() {
    const groups = [finance, event, info, it, travel, sales]
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
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
        {groups.map((group, idx) => {
          const groupResponsible = group.responsible
          //If it is the last element, don't render the bottom golden border
          const id =
            idx === groups.length - 1 ? styles.last_group_container : ''
          return (
            <div key={group.name} className={styles.group_container} id={id}>
              <h2>{group.name}</h2>
              <div className={styles.group}>
                <div className={styles.leader}>
                  <Image picture={groupResponsible.image} round />
                  <h3>
                    {groupResponsible.firstName} {groupResponsible.lastName}
                  </h3>
                  <h5>{groupResponsible.email}</h5>
                </div>
                <div className={styles.info}>
                  <p>
                    {group.description}
                    <br />
                    Har du funderingar? Kontakta {groupResponsible.firstName}!
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

Image.propTypes = {
  picture: PropTypes.string.isRequired,
}
