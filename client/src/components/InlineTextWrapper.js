import Text from './Text';

const InlineTextWrapper = Text.withComponent('div').extend`
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.secondaryColor};
  & + & {
    margin-left: 2px;
  }
`

export default InlineTextWrapper
