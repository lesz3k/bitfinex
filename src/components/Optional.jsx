import * as React from 'react';

export class Optional extends React.Component {
  render() {
    const { children, component, renderIf } = this.props;
    return (renderIf ? (!!component ? component() : children) : null);
  }
}
