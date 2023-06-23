import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const menuURL = "http://localhost:3000/menu";

function AddMenu() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  return ( 
    <>
    <div>
    <Formik
          initialValues={{
            title: ""
          }}
          validationSchema={Yup.object({
            title: Yup.string()
            .required("Langelis būtinas")
            .min(2, "Pavadinimas per trumpas")
            .max(40, "Pavadinimas per ilgas"),
          })}
          onSubmit={(values, { resetForm }) => {
            axios
            .post(menuURL, values)
            .then((response) => response.data)
            .catch((error) => console.log(error));
            // console.log(values);
            resetForm();
            setSubmitted(true);
          }}
          >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            isSubmitting,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit} className="diagram-border p-4">
              {/* Show a success message if the form has been submitted */}
              {submitted && (
                <h4 style={{ color: "orange" }}>Menu created</h4>
                )}

              {/* Form fields */}
              <Form.Group className="p-2">
                <Form.Label>Menu title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="menu title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  isInvalid={touched.title && !!errors.title}
                  maxLength={50}
                  />
                <span className="formError">
                  <ErrorMessage name="menu" />
                </span>
              </Form.Group>
              {/* <Form.Group className="p-2">
                <Form.Label>Menu id</Form.Label>
                <Form.Control
                type="number"
                placeholder="menu title"
                name="id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
                isInvalid={touched.id && !!errors.id}
                maxLength={50}
                />
                <span className="formError">
                <ErrorMessage name="menu" />
                </span>
              </Form.Group> */}

              {/* Form buttons */}
              <div>
                <Button
                  type="button"
                  onClick={resetForm}
                  disabled={!dirty || isSubmitting}
                  >
                  Atšaukti
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                  >
                  Pateikti
                </Button>
                {/* <Button
                  variant="primary"
                  onClick={() => navigate("/categorycreate/")}
                  >
                  Kategorijos
                </Button> */}
              </div>
            </Form>
          )}
        </Formik>
    </div>
    </>
   );
}

export default AddMenu;