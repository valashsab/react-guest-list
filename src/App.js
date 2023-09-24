import { useEffect, useRef, useState } from 'react';
import styles from './styles.css';

export default function App() {
  // const baseUrl = 'http://localhost:4000';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const fname = useRef('');
  const lname = useRef('');

  const handleSubmit = () => {
    setSubmitted(true);
    fname.current.value = '';
    lname.current.value = '';
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        handleSubmit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <>
      <header>
        <h1>Guest List</h1>
      </header>

      <form action="http://localhost:4000'">
        <label className={styles.labelName} htmlFor="firstName">
          First name<span className={styles.required}>*</span>
        </label>
        <br />
        <input
          className={styles.inputName}
          // type='text' --> per default, therefore can be ommitted
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
          required
          ref={fname}
        />
        <br />
        <label className={styles.labelName} htmlFor="lastName">
          Last name<span className={styles.required}>*</span>
        </label>
        <br />
        <input
          className={styles.inputName}
          // type='text' --> per default, therefore can be ommitted
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          required
          ref={lname}
        />
      </form>

      {submitted && (
        <div>
          <br />
          <br />
          Guests <br />
          {firstName} {lastName}
          <br />
          <br />
          <form>
            <label htmlFor="notAttending">Not Attending</label>
            <input
              type="checkbox"
              id="notAttending"
              name="notAttending"
              value="notAttending"
              // sets this checkbox to be checked!
              checked
            />
            <br />
            <label htmlFor="Attending">Attending</label>
            <input
              type="checkbox"
              id="Attending"
              name="Attending"
              value="Attending"
            />
          </form>
          <br />
          <button>Remove</button>
        </div>
      )}
      <br />
      <br />
    </>
  );
}
