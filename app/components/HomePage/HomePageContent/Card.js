import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styles from './styles.css'
import { Slide } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'

const Card = React.forwardRef(
  ({ title, body, buttonText, images, to }, ref) => {
    const slide = useRef()
    const [activeIdx, setActiveIdx] = useState(0)
    const [touchStart, setTouchStart] = useState(0)

    const properties = {
      duration: 4000,
      transitionDuration: 350,
      infinite: true,
      indicators: false,
      arrows: true,
      onChange: (oldIndex, newIndex) => {
        setActiveIdx(newIndex)
      },
    }

    return (
      <div ref={ref} className={styles.card}>
        <div className={styles.info}>
          <div className={styles.title_container}>
            <h1>
              <FormattedMessage {...title} />
            </h1>
          </div>
          <div className={styles.info_text}>
            {Object.keys(body).map(k => (
              <h3 key={k} className={styles.paragraph}>
                <FormattedMessage {...body[k]} />
              </h3>
            ))}
          </div>
          <div className={styles.info_button}>
            <Link to={to}>
              <Button color='homepage'>
                <FormattedMessage {...buttonText} />
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.slideshow}>
          <div
            className={styles.arrow}
            onClick={() => slide.current.goBack()}
            onTouchStart={e => {
              setTouchStart(e.changedTouches[0].clientX)
            }}
            onTouchEnd={e => {
              const diff = touchStart - e.changedTouches[0].clientX
              if (Math.abs(diff) > 10) {
                if (diff > 0) {
                  slide.current.goNext()
                } else {
                  slide.current.goBack()
                }
              }
            }}
          >
            <i className='fas fa-chevron-left' />
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
            onTouchStart={e => {
              setTouchStart(e.changedTouches[0].clientX)
            }}
            onTouchEnd={e => {
              const diff = touchStart - e.changedTouches[0].clientX
              if (Math.abs(diff) > 10) {
                if (diff > 0) {
                  slide.current.goNext()
                } else {
                  slide.current.goBack()
                }
              }
            }}
          >
            <i className='fas fa-chevron-right' />
          </div>
          <div className={styles.indicators}>
            <div className={styles.indicator_filler}>
              <div className={styles.dot_container}>
                {images.map((i, k) => (
                  <div
                    key={k}
                    className={activeIdx === k ? styles.active_dot : styles.dot}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mobile_button}>
          <Link to={to}>
            <Button color='homepage'>
              <FormattedMessage {...buttonText} />
            </Button>
          </Link>
        </div>
      </div>
    )
  }
)

Card.propTypes = {
  title: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  buttonText: PropTypes.object.isRequired,
  images: PropTypes.array,
  to: PropTypes.string.isRequired,
}

export default Card
