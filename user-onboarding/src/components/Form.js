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
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: "",
      terms: false
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
    )
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  }
})(UserForm);

export default FormikUserForm;
