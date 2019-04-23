import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  // Redux form's handlesubmit function passes the formvalues
  // To our custom submit handler so that we can use them for
  // Whatever purpose we want
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
};

// Wiring up action creator
export default connect(
  null,
  { createStream }
)(StreamCreate);
