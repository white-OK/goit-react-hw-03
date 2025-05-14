import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const OrderSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Phone must be in format 000-00-00')
    .required('Required'),
});
function ContactForm({ onAdd }) {
  const fieldId = useId();
  const handleSubmit = (values, helpers) => {
    console.log(values);
    onAdd({
      id: nanoid(),
      ...values,
    });
    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={OrderSchema}
    >
      <Form className={css.container}>
        <label htmlFor={`${fieldId}-name`}>Name</label>
        <Field
          className={css.field}
          type="text"
          name="name"
          id={`${fieldId}-name`}
        />
        <ErrorMessage name="name" />
        <label htmlFor={`${fieldId}-number`}>Number</label>
        <Field
          className={css.field}
          type="tel"
          name="number"
          id={`${fieldId}-number`}
        />
        <ErrorMessage name="number" />
        <button className={css.btnSubmit} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
export default ContactForm;
