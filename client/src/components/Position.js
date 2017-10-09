import React from 'react'
import styled from 'styled-components'

const Position = styled(({ mark, onClick, className }) => (
  <div onClick={onClick} className={className}>
    {mark}
  </div>
))`
  width: 50px;
  height: 50px;
  border: 2px solid ${props => props.theme.primaryColor};
  margin-right: -2px;
  margin-bottom: -2px;
  background-color: ${props => props.theme.secondaryColor};
  line-height: 50px;
  font-size: 40px;
  text-align: center;
  color: ${props => props.greyed ? 'burlywood' : props.theme.textColor};
  font-family: monospace, "sans-serif";
`

export default Position
