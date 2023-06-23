import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const mealsURL = "http://localhost:3000/meals/";
const menuURL = "http://localhost:3000/menu/";

function EditMeals() {
  const { id } = useParams();
  const [selectedEdit, setSelectedEdit] = useState({
    title: "",
    description: "",
    menu: ""
  });
  let navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(mealsURL + id)
      .then((response) => setSelectedEdit(response.data))
      .catch((err) => console.log(err));
      axios
        .get(menuURL)
        .then((response) => setMenu(response.data))
        .catch((error) => console.log(error));
  }, [id]);
  const menujsx = menu.map((item, index) => (
    <option value={item.title} key={index}>
      {item.title}
    </option>
  ))
  return (
    <>
      <div >
        <h1>Edit</h1>
        <Formik
          initialValues={selectedEdit}
          validationSchema={Yup.object({
            title: Yup.string()
              .required("langelis būtinas")
              .min(2, "pavadinimas per trumpas")
              .max(40, "pavadinimas per ilgas"),
          })}
          onSubmit={(values, {resetForm}) => {
            // console.log(values);
            // axios
            //   .patch(mealsURL + id, values)
            //   .then((response) => console.log(response.data));
            //   resetForm();
            // setUpdated(true);
            
            axios.patch(mealsURL + id, values)
            .then((response) => {
              console.log(response.data);
              setUpdated(true);
              resetForm();
            })
            .catch((error) => {
              console.log(error);
            });
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
            isSubmitting,
            dirty,
            resetForm
          }) => (
            <Form onSubmit={handleSubmit} className="diagram-border p-4">
              <Form.Group className="p-2">
                <Form.Label>Meal title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  isInvalid={touched.title && !values.title}
                />
                <span className="formError">
                  <ErrorMessage name="title" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Meal description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  isInvalid={touched.description && !values.description}
                />
                <span className="formError">
                  <ErrorMessage name="description" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Menu</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="menu"
                  name="menu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.menu}
                  isInvalid={touched.menu && !!errors.menu}
                  maxLength={50}
                >
                <option value="">Choose menu</option>
                {menujsx}
                </Form.Control>
                <span className="formError">
                  <ErrorMessage name="menu" />
                </span>
              </Form.Group>
              <div>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  Edit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditMeals;
