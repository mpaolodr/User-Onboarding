import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = () => {
  return (
    <div className="user-form">
      <Form>
        <label>
          Name:
          <Field type="text" name="name" placeholder="Name" />
        </label>
        <label>
          Email:
          <Field type="email" name="email" placeholder="Email" />
        </label>
        <label>
          Password:
          <Field type="password" name="password" placeholder="Password" />
        </label>
        <label>
          Terms of Service:
          <Field type="checkbox" name="password" />
          {/* remember to add checked attr for this later */}
        </label>

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

const FormikUserForm = withFormik(UserForm);

export default FormikUserForm;
