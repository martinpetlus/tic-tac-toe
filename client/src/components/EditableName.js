import React, { Component } from 'react'

import InlineTextWrapper from './InlineTextWrapper'
import Input from './Input'

const NameWrapper = InlineTextWrapper.withComponent('div').extend`
  display: inline-flex;
`

export default class EditableName extends Component {
  state = {
    focused: false
  }

  handleNameClick = () => {
    this.setState(
      { focused: true, name: this.props.name },
      () => this.input.focus()
    )
  }

  handleInputBlur = () => {
    const newName = this.state.name

    this.setState({ focused: false, name: undefined })

    if (newName && this.props.name !== newName) {
      this.props.onNameChange(newName)
    }
  }

  handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleInputBlur()
    }
  }

  handleInputChange = () => {
    this.setState({ name: this.input.value })
  }

  render() {
    if (this.state.focused) {
      return (
        <Input
          type="text"
          value={this.state.name}
          onChange={this.handleInputChange}
          innerRef={input => this.input = input}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
        />
      )
    }

    return <NameWrapper onClick={this.handleNameClick}>{this.props.name}</NameWrapper>
  }
}
