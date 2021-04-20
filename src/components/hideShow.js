import React from 'react';

export default class HideShowWrapper extends React.Component {
  render() {
    if (this.props.show) {
      return this.props.children || null
    } else {
      return null;
    }
  }
}