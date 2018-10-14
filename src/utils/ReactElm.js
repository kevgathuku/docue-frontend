/* eslint-disable */
var React = require('react');

export default class Elm extends React.Component {
  shouldComponentUpdate = () => {
    return false;
  };
  ref = (node) => {
    if (node === null) return;
    const app = this.props.src.init({
      node,
      flags: this.props.flags,
    });

    if (typeof this.props.ports !== 'undefined') {
      this.props.ports(app.ports);
    }
  };
  render = () => {
    return <div ref={this.ref} />;
  };
}
