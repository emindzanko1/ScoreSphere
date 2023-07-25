import React from "react";
import { Link } from "react-router-dom";

const England = props => {
  return (
    <div>
      <h2>Dobro došao u {props.name}!</h2>
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default England;
