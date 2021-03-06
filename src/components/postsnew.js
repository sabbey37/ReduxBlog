import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/index';

class PostsNew extends Component {
    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' :  ''}`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control" 
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // history.push automatically navigates to given route
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // handleSubmit property from reduxform being passed to component
        const {handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// Redux Form input states
// pristine == no input, no selection from user
// touched == user has selected input then focused out of input
// invalid == error message needs to be shown

function validate(values) {
    const errors = {};
    // Validate the inputs from 'values'
    if(!values.title) {
        errors.title="Enter a title";
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content please';
    }

    //If errors is empty, the form is fine to submit, otherwise redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);