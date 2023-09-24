import { useEffect, useRef, useState } from 'react';

export default function App() {
  // const baseUrl = 'http://localhost:4000';
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');

  const [inputText, setInputText] = useState({
    firstName: '',
    lastName: '',
  });
  const handleChange = (e) => {
    setInputText(e.currentTarget.value);
  };

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
        <label htmlFor="firstName">
          First name<span>*</span>
        </label>
        <br />
        <input
          // type='text' --> per default, therefore can be ommitted
          id="firstName"
          name="firstName"
          value={inputText.firstName}
          onChange={handleChange}
          required
          ref={fname}
        />
        <br />
        <label htmlFor="lastName">
          Last name<span>*</span>
        </label>
        <br />
        <input
          // type='text' --> per default, therefore can be ommitted
          id="lastName"
          name="lastName"
          value={inputText.lastName}
          onChange={handleChange}
          required
          ref={lname}
        />
      </form>

      {submitted && (
        <div>
          <br />
          <br />
          Guests <br />
          {inputText.firstName} {inputText.lastName}
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
