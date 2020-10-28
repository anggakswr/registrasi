import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const Login = ({ changeEmail }) => {
  const [submit, setSubmit] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleLogin = (e) => {
    // spy halaman tdk refresh
    e.preventDefault();

    axios
      .post("http://apidev.pluginesia.com/api/authenticate", submit)
      .then((response) => {
        // jika response tidak ok
        if (response.status !== 200) {
          throw new Error(response);
        }

        // jika response ok
        setSuccess(response.data.message);
        setError("");
        changeEmail(submit.email);
        console.log(submit.email);
        console.log(response.data.message);
        console.log(response);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setSuccess("");
        console.log(error.response.errors);
        console.log(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    setSubmit({
      ...submit,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Peringatan error dan success */}
      <div className="mt-5">
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange}
        />
      </div>

      {/* Button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeEmail: (email) => dispatch({ type: "CHANGE_EMAIL", email }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
