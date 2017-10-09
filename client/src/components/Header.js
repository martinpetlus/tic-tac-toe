import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 6px;
  background-color: ${props => props.theme.secondaryColor};
  border-bottom: 2px solid ${props => props.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Header = ({ children }) => (
  <Container>{children}</Container>
)

export default Header
