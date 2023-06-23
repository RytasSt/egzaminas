import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const mealURL = "http://localhost:3000/meals";
const menuURL = "http://localhost:3000/menu";

function AddService() {
  const [submitted, setSubmitted] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
      axios
          .get(menuURL)
          .then((response) => setMenu(response.data))
          .catch((error) => console.log(error));
          axios
          .get(mealURL)
          .then((response) => {
            const meals = response.data;
            if (meals.length > 0) {
              setCounter(meals.length);
            }
          })
          .catch((error) => console.log(error));
  }, [])

  const menujsx = menu.map((item, index) => (
    <option value={item.title} key={index}>
      {item.title}
    </option>
  ))
  return ( 
    <>
    <div>
    <Formik
          initialValues={{
            title: "",
            description: "",
            menu: "",
            id: counter + 1
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .required("Langelis būtinas")
              .min(2, "Pavadinimas per trumpas")
              .max(40, "Pavadinimas per ilgas"),
          })}
          onSubmit={(values, { resetForm }) => {
            axios
              .post(mealURL, values)
              .then((response) => response.data)
              .catch((error) => console.log(error));
            console.log(values);
            resetForm();
            setSubmitted(true);
            setCounter(counter + 1);
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
                <h4 style={{ color: "orange" }}>Meal created</h4>
              )}

              {/* Form fields */}
              <Form.Group className="p-2">
                <Form.Label>Service title</Form.Label>
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
              <Form.Group className="p-2">
                <Form.Label>Service description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  isInvalid={touched.description && !!errors.description}
                  maxLength={50}
                />
                <span className="formError">
                  <ErrorMessage name="menu" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="menu"
                  name="menu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id}
                  isInvalid={touched.id && !!errors.id}
                  maxLength={50}
                >
                <option value="">Choose menu</option>
                {menujsx}
                </Form.Control>
                <span className="formError">
                  <ErrorMessage name="menu" />
                </span>
              </Form.Group>
              {/* <Form.Group className="p-2">
                <Form.Label>nuotrauka</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="image"
                  name="picture"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.picture}
                  isInvalid={touched.picture && !!errors.picture}
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

export default AddService;