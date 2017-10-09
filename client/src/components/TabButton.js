import Button from './Button'

const TabButton = Button.withComponent('div').extend`
  ${props => props.selected ? `background-color: ${props.theme.hoverColor};` : ''}
`

export default TabButton
