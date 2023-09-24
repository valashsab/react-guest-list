import { useEffect, useRef, useState } from 'react';
import styles from './styles.css';

export default function App() {
  // const baseUrl = 'http://localhost:4000';
  // User input first name
  const [firstName, setFirstName] = useState('');
  // Uer input last name
  const [lastName, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [removeGuest, setRemoveGuest] = useState({ firstName } + { lastName });

  const fname = useRef('');
  const lname = useRef('');

  const handleSubmit = () => {
    setSubmitted(true);
    // fname.current.value = ''; // --> error: cannot create property 'value' on string
    // lname.current.value = ''; // --> error: cannot create property 'value' on string
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log('user pressed: ', event.key);

      if (event.key === 'Enter') {
        event.preventDefault();
        // setFirstName(''); --> div unterhalb wird nach submitting nicht abgebildet
        // setLastName('');  --> div unterhalb wird nach submitting nicht abgebildet
        fname.current.value = '';
        lname.current.value = '';

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

      <form
        onSubmit={handleSubmit} // after pushing the enter button the input fields are cleared
        action="http://localhost:4000'"
        // onSubmit={handleSubmit}
      >
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
          // autoComplete="off"
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
          // autoComplete="off"
        />
      </form>
      <br />
      <br />
      {submitted && (
        <div data-test-id="guest">
          New guest: <br />
          {firstName} {lastName}
          <br />
          <br />
          <form>
            <label htmlFor="notAttending" data-bind="checked">
              Not Attending
            </label>
            <input
              type="checkbox"
              id="notAttending"
              name="notAttending"
              value="notAttending"
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
          <br />
          <button onClick={() => setRemoveGuest(newGuests.pop)}>Remove</button>
        </div>
      )}
    </>
  );
}
