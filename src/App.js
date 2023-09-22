import { useState } from 'react';
import styles from './styles.css';

export default function App() {
  // const baseUrl = 'http://localhost:4000';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const guests = [{ firstName: `${firstName}`, lastName: `${lastName}` }];

  return (
    <>
      <main className={styles.heroSection}>
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
            title="Please enter your first name"
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
            title="Please enter your last name"
          />
          {/* create new variable storing the complete name of the guest, which then can be posted to the localhost
        const fullName = [{firstName: `${firstName}`, lastName: `${lastName}`}];
        if(firstName && lastName) {
          return (fullName.push()))
        }

 */}
          <br />
          <button onClick={(event) => setLastName(event.currentTarget.value)}>
            Create guest
          </button>
          <br />
          <br />
          <br />
          <br />
          Guest:
          <br />
          <label htmlFor="notAttending">Not Attending</label>
          <input
            type="checkbox"
            id="notAttending"
            name="notAttending"
            value="notAttending"
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
        <button>Remove</button>
      </main>
      <footer>Test Footer</footer>
    </>
  );
}
