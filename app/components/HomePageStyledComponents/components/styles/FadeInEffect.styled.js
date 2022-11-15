import styled from 'styled-components'

export const EffectDiv = styled.div`
transition: opacity 2s;
${props => 'width:' + props.width + ';'}
opacity:${props => (props.visible ? '0' : '1')};
`
