import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import AuthorList from "./AuthorList";

class AuthorsPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  async componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      try {
        await actions.loadCourses();
      } catch (error) {
        alert("Loading courses failed" + error);
      }
    }

    if (authors.length === 0) {
      try {
        await actions.loadAuthors();
      } catch (error) {
        alert("Loading authors failed" + error);
      }
    }
  }

  handleDeleteAuthor = async author => {
    try {
      if (this.props.courses.length > 0 && this.props.authors.length > 0) {
        if (this.props.courses.find(c => c.authorId === author.id)) {
          toast.error(
            "Author cannot be deleted since author contains course(s)"
          );
          return;
        }
      }
      toast.success("Author deleted");
      await this.props.actions.deleteAuhtor(author);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        <h2>Authors</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            {/* <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button> */}

            <AuthorList
              authors={this.props.authors}
              onDeleteClick={this.handleDeleteAuthor}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteAuhtor: bindActionCreators(authorActions.deleteAuhtor, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
