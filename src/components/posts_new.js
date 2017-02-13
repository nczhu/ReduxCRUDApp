import React, { Component, PropTypes } from 'react';
//similar to connect: connects oru form with redux form
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

// has validation on the inputs
class PostsNew extends Component {
	// programmatic navigation
	// defines new obj on PostsNew class
	// React recognizes we want a context called router
	// will search this components parents until it finds the field, e.g. router
	static contextTypes = { //access to react-router
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => { 
				// blogpost has been created, nav user to the index
				// we nav to calling this.context.router.push with new path
				this.context.router.push('/');
			});
	}

	render() {
		// from redux form; const title = this.props.title
		const { fields: { title, categories, content }, handleSubmit} = this.props;  //eqls handlesubmit = this.props.handlesubmit
		
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a New Post</h3>

				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories} />
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className="form-control" {...content} />
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
 				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	
	if (!values.title) {
		errors.title = 'Enter a username';
	}
	if (!values.categories) {
		errors.categories = 'Enter categories';
	}
	if (!values.content) {
		errors.content = 'Enter some content';
	}

	return errors;
}

// connect (mapstatetoprops, mapdispatchtoprops)
// reduxform (form config, mapstatetoprops, mapdispatchtoprops)
// redux is using this to track user edits.
// tracked at the application level
export default reduxForm({
	form: 'PostsNewForm',  //form name needs to be unique
	fields: ['title', 'categories', 'content'], 
	validate
}, null, { createPost })(PostsNew);