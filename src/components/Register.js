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
  const [errorFields, setErrorFields] = React.useState({});
  const [success, setSuccess] = React.useState("");

  const handleRegister = (e) => {
    // spy halaman tdk refresh
    e.preventDefault();

    axios
      .post("http://apidev.pluginesia.com/api/register", submit)
      .then((response) => {
        // jika response ok, tampilkan pesan success
        setSuccess(response.data.message);
        // hapus pesan error
        setError("");
        setErrorFields({});
      })
      .catch((error) => {
        // jika email sdh ada
        setError(error.response.data.message);
        // error per field
        setErrorFields(error.response.data.errors);
        // hapus pesan success
        setSuccess("");
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
      {/* peringatan error dan success */}
      <div className="mt-5">
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
      </div>

      {/* fields di looping */}
      {fields.map((field, i) => (
        <div className="form-group" key={i.toString()}>
          <label htmlFor={field.name}>Password</label>
          <input
            type={field.type}
            className="form-control"
            id={field.name}
            onChange={handleChange}
          />
          {errorFields[field.error] &&
            errorFields[field.error].map((error, i) => (
              <small
                id={field.name}
                className="form-text text-danger"
                key={i.toString()}
              >
                {error}
              </small>
            ))}
        </div>
      ))}

      {/* button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const fields = [
  { name: "fullName", type: "text", error: "FullName" },
  { name: "email", type: "text", error: "Email" },
  { name: "password", type: "password", error: "Password" },
  { name: "confirmPassword", type: "password", error: "ConfirmPassword" },
];

export default Register;
