import styled from 'styled-components'

const InlineTextWrapper = styled.div`
  font-size: ${props => props.theme.fontSize};
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${props => props.theme.primaryColor};
  border: 2px solid ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.secondaryColor};
`

export default InlineTextWrapper
