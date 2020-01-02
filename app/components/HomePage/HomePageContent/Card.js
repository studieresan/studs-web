import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styles from './styles.css'
import { Slide } from 'react-slideshow-image'

const Card = ({ title, body, images }) => {
  const slide = useRef()
  const [activeIdx, setActiveIdx] = useState(0)

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: false,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      setActiveIdx(newIndex)
    },
  }

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.title_container}>
          <h1>
            <FormattedMessage {...title} />
          </h1>
        </div>
        <div className={styles.body}>
          {Object.keys(body).map(k => (
            <h3 key={k} className={styles.paragraph}>
              <FormattedMessage {...body[k]} />
            </h3>
          ))}
        </div>
      </div>
      <div className={styles.slideshow}>
        <div className={styles.arrow} onClick={() => slide.current.goBack()}>
          <div>{'<'}</div>
        </div>
        <Slide {...properties} className={styles.slide} ref={slide}>
          {images.map(img => (
            <div key={img} className={styles.each_slide}>
              <div style={{ backgroundImage: `url(${img})` }} />
            </div>
          ))}
        </Slide>
        <div
          className={styles.arrow + ' ' + styles.arrow_right}
          onClick={() => slide.current.goNext()}
        >
          <div>{'>'}</div>
        </div>
        <div className={styles.indicators}>
          {images.map((i, k) => (
            <div
              key={k}
              className={activeIdx === k ? styles.active_dot : styles.dot}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  images: PropTypes.array,
}

export default Card
