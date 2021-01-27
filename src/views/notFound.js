import React from "react";

export default function NotFound({ history }) {
  return (
    <div>
      <h1>PAGE NOT FOUND - 404</h1>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => history.push("/")}
      >
        HOME
      </button>
    </div>
  );
}
