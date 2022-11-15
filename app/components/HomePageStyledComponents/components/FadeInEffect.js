import React, { useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'
import { EffectDiv } from './styles/FadeInEffect.styled'
import PropTypes from 'prop-types'
export default function FadeInEffect(props) {
  const [inView, setInView] = useState(false)
  const [updateOnce, setUpdateOnce] = useState(false)
  function setUpdateOnceTrue() {
    if (inView) {
      setUpdateOnce(true)
    }
  }
  useEffect(
    () => {
      setUpdateOnceTrue()
    },
    [inView]
  )

  return (
    <InView onChange={setInView}>
      {({ ref, inView }) => (
        <EffectDiv ref={ref} width={props.width} visible={!updateOnce}>
          {props.children}
        </EffectDiv>
      )}
    </InView>
  )
}
FadeInEffect.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
}
