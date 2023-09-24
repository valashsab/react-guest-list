import { useState } from 'react';

// useEffect, useRef
export default function App() {
  // const baseUrl = 'http://localhost:4000';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [list, setList] = useState([]);

  // const [submitted, setSubmitted] = useState(false);
  // const fname = useRef('');
  // const lname = useRef('');

  // new version of handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const guestData = { firstName, lastName };
    if (firstName && lastName) {
      setList((ls) => [...ls, guestData]);
      setFirstName('');
      setLastName('');
    }
  };

  // useEffect(() => {
  // const keyDownHandler = (event) => {
  // if (event.key === 'Enter') {
  // event.preventDefault();

  // handleSubmit();
  // }
  // };

  // document.addEventListener('keydown', keyDownHandler);

  // return () => {
  // document.removeEventListener('keydown', keyDownHandler);
  // };
  // }, []);

  // old, working version of submit with enter
  // const handleSubmit = () => {
  // setSubmitted(true);
  // fname.current.value = '';
  // lname.current.value = '';
  // };

  // useEffect(() => {
  // const keyDownHandler = (event) => {
  // if (event.key === 'Enter') {
  // event.preventDefault();

  // handleSubmit();
  // }
  // };

  // document.addEventListener('keydown', keyDownHandler);

  // return () => {
  // document.removeEventListener('keydown', keyDownHandler);
  // };
  // }, []);

  return (
    <>
      <header>
        <h1>Guest List</h1>
      </header>

      <form action="http://localhost:4000'" onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First name<span>*</span>
        </label>
        <br />
        <input
          // type='text' --> per default, therefore can be ommitted
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
          required
          // ref={fname}
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
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          required
          // ref={lname}
        />
      </form>

      {list.map((a) => (
        <div key={`guestData-div-${guestData}`}>
          <div>{a.firstName}</div>
          <div>{a.LastName}</div>
        </div>
      ))}
    </>
  );
}

{
  /*      {submitted && (
        <div data-test-id="guest">
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
*/
}
