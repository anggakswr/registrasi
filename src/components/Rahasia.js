import React from "react";
import { connect } from "react-redux";

const Rahasia = ({ email }) => {
  return (
    <>
      <div>{email && "Selamat anda berhasil login."}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state,
  };
};

export default connect(mapStateToProps)(Rahasia);
