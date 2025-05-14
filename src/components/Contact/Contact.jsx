import { FaPhoneAlt } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import css from './Contact.module.css';
function Contact({ data: { name, number, id }, onDelete }) {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={css.text}>
          <IoPersonSharp /> {name}
        </p>
      </div>
      <div className={css.wrapper}>
        <p className={css.text}>
          <FaPhoneAlt /> {number}
        </p>
      </div>
      <button className={css.btnDelete} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
export default Contact;
