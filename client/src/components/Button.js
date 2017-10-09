import InlineTextWrapper from './InlineTextWrapper'

const Button = InlineTextWrapper.withComponent('button').extend`
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
`

export default Button
