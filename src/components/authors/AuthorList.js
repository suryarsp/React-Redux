import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Author Name</th>
        <th>Courses Count</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {authors.map(author => {
        return (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>
              {courses.length > 0
                ? courses.filter(c => c.authorId === author.id).length
                : 0}
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(author)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;
