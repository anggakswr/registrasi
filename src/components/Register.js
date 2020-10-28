import React from "react";
import axios from "axios";

const Register = () => {
  const [submit, setSubmit] = React.useState({
    title: "user",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
  });
  const [error, setError] = React.useState("");
  const [errorFields, setErrorFields] = React.useState([]);
  const [success, setSuccess] = React.useState("");

  const handleRegister = (e) => {
    // spy halaman tdk refresh
    e.preventDefault();

    axios
      .post("http://apidev.pluginesia.com/api/register", submit)
      .then((response) => {
        // jika response tidak ok
        if (response.status !== 200) {
          throw new Error(response);
        }

        // jika response ok
        setSuccess(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setErrorFields(error.response.errors);
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
    <form onSubmit={handleRegister}>
      {/* Peringatan error dan success */}
      <div className="mt-5">
        {error && <p className="text-danger">{error}</p>}

        {errorFields &&
          errorFields.map((field) =>
            field.map((text) => <p className="text-danger">{text}</p>)
          )}

        {success && <p className="text-success">{success}</p>}
      </div>

      {/* Fullname */}
      <div className="form-group">
        <label htmlFor="fullName">Fullname</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
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
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
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

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
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

export default Register;
