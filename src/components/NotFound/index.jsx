import React from 'react';

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <div className="card-panel">
          <div className="row">
            <h2 className="header center-align">Not Found</h2>
          </div>
          <div className="row">
            <p className="flow-text center-align">
              Sorry. This is not the page you were looking for
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
