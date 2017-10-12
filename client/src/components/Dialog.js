import styled from 'styled-components'

export default styled.div`
  width: 300px;
  height: 200px;
  border: 2px solid ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.secondaryColor};
  display: flex;
  flex-direction: column;
`
