import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const menuURL = "http://localhost:3000/menu/";

function EditMenu() {
  const [submitted, setSubmitted] = useState(false);
  const [InitialValues, setInitialValues] = useState({
    title: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    axios
    .get(menuURL + id)
    .then((response) => {
      const menu = response.data;
      setInitialValues({ title: menu.title });
      console.log(response.data)
      // setInitialValues(response.data)
    })
    .catch((error) => console.log(error));
  }, [id]);

  const updateMealMenuTitles = (newMenuTitle) => {
    // Fetch all meals with the current menu title
    axios
      .get("http://localhost:3000/meals?menu=" + InitialValues.title)
      .then((response) => {
        const meals = response.data;

        // Update the menu title for each meal
        meals.forEach((meal) => {
          const updatedMeal = { ...meal, menu: newMenuTitle };

          axios
            .patch("http://localhost:3000/meals/" + meal._id, updatedMeal)
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  };
  return ( 
    <>
    <div>
    <Formik
          // initialValues={{title: ""}}
          initialValues={InitialValues}
          validationSchema={Yup.object({
            title: Yup.string()
              .required("Langelis būtinas")
              .min(2, "Pavadinimas per trumpas")
              .max(40, "Pavadinimas per ilgas"),
          })}
          onSubmit={(values, { resetForm }) => {
            // const updatedMenu = { title: values.title };
            axios
              .patch(menuURL + id, values)
              .then((response) => {
                console.log(response.data)
                updateMealMenuTitles(values.title);
              })
              .catch((error) => console.log(error));
            // console.log(values);
            resetForm();
            setSubmitted(true);
          }}
          enableReinitialize
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
                  <ErrorMessage name="title" />
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

export default EditMenu;