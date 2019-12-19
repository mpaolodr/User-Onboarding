import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, touched, errors, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    status && setUser(user => [...user, status]); // remember this
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <label>
          Name:
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </label>
        <label>
          Email:
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </label>
        <label>
          Password:
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </label>
        {/* for stretch */}
        <label>
          Role:
          <Field as="select" name="role">
            <option disabled value="Choose One">
              Choose One
            </option>
            <option value="Front-End Developer">Front-End Developer</option>
            <option value="Back-End Developer">Back-End Developer</option>
            <option value="UX/UI Designer">UX/UI Designer</option>
            <option value="Project Manager">Project Manager</option>
          </Field>
        </label>
        <label>
          Terms of Service:
          <Field type="checkbox" name="terms" checked={values.terms} />
          {touched.terms && errors.terms && <p>{errors.terms}</p>}
        </label>

        <button type="submit">Submit</button>
      </Form>

      <div className="container">
        {user.map(obj => {
          return (
            <div key={obj.id} className="userCard">
              <h2>{obj.name}</h2>
              <h2>{obj.email}</h2>
              <h2>{obj.role}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms, role }) {
    return {
      name: name || "",
      email: email || "",
      password: "",
      terms: false,
      role: "Choose One"
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Your mom must have given you a name!")
      .min(8, "It can't be that short!")
      .max(30, "You gotta be kidding, right?"),

    email: Yup.string()
      .required("You need an email!")
      .email("This can't be an email"),

    password: Yup.string()
      .required("Input password or risk being hacked!")
      .min(5, "Now you're just asking to be hacked!")
      .max(15, "You probably won't be able to sign in again!"),

    terms: Yup.boolean().oneOf(
      [true],
      "You got to accept or we won't accept you too!"
    ),

    role: Yup.string()
      .oneOf([
        "Front-End Developer",
        "Back-End Developer",
        "UX/UI Designer",
        "Project Manager"
      ])
      .required("Select one")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res.data);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  }
})(UserForm);

export default FormikUserForm;
