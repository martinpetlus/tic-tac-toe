import InlineTextWrapper from './InlineTextWrapper'

const Input = InlineTextWrapper.withComponent('input').extend`
  width: 150px;
  background-color: white;

  &::placeholder {
    font-weight: normal;
  }
`

export default Input
