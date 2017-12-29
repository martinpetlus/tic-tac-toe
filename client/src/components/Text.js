import styled from 'styled-components'

const Text = styled.span`
  font-weight: bold;
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.primaryColor};
`

export default Text
