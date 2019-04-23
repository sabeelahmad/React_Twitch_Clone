import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    // This function will return JSX to display an error on touch
    // That is if a user has selected and then deselected an element
    // Only then will we display the error messages if any
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // Arrow function because of issues with this
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  // Redux form's handlesubmit function passes the formvalues
  // To our custom submit handler so that we can use them for
  // Whatever purpose we want
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// Validating forms
// If there is an error in validating a field, redux-from will pass the
// error message to our custom renderInput method which we can display afterwards
const validate = formValues => {
  // If valid values => return an empty object
  // If invalid, return an errors object for each key value pair invalid

  const errors = {};

  // If no title
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  // If no description
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  // Return validation object
  return errors;
};

// Wire up redux form
export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);
