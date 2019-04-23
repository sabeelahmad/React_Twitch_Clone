import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // Load up the client auth lib
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // Callback after load complete
      window.gapi.client
        .init({
          clientId:
            "669109037033-9pk0tlkl8u5u1somp5ahmjgs6786fiqf.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          // After initialization complete
          // Assign a auth variable to the class
          this.auth = window.gapi.auth2.getAuthInstance();
          // Dispatch initial action
          this.onAuthChange(this.auth.isSignedIn.get());
          // Listen for AuthChange
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      // Call action creator that signs in
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      // Call action creator that signs out
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
