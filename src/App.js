import { useEffect, useState } from 'react';

export default function App() {
  // const baseUrl = 'http://localhost:4000';
  const baseUrl = 'https://30abb447-99ee-442a-a854-7c5e19b1b742.id.repl.co';

  // Adding first and last name to the form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Getting all guests (aka GET /guests)
  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await fetch(`${baseUrl}/guests`);
        const allGuests = await response.json();
        setGuests(allGuests);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    fetchGuests().catch(console.error);
  }, []);

  const fullNames = guests.map(
    (guest) => `${guest.firstName} ${guest.lastName}`,
  );
  // Defining three Event handlers

  // Getting a single guest (aka GET /guests/:id)
  /*   async function fetchSingleGuest(index) {
    const response = await fetch(`${baseUrl}/guests/:${index}`);
    const guest = await response.json();
    return guest;
  } */

  // Creating a new guest (aka POST /guests)
  async function createNewGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        attending: false,
      }),
    });
    const createdGuest = await response.json();
    return createdGuest;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!firstName || !lastName) {
      return;
    }
    const newGuest = await createNewGuest();
    console.log(newGuest);
    const allGuests = [...guests, newGuest];
    console.log(allGuests);
    setGuests(allGuests);
    setFirstName('');
    setLastName('');
  }

  // Updating a guest (aka PUT /guests/:id)
  async function updateGuest(guestId, newState) {
    const response = await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: newState }),
    });
    const updatedGuest = await response.json();
    return updatedGuest;
  }

  // Toggling the attending status
  function handleToggleAttending(guestId) {
    const myGuests = [...guests];
    const guestIndex = myGuests.findIndex((obj) => obj.id === guestId);
    const state = myGuests[guestIndex].attending;
    const newState = !state;
    const updatedGuest = updateGuest(guestId, newState);
    myGuests[guestIndex].attending = updatedGuest.attending;
    setGuests(myGuests);
  }

  // Deleting a guest (aka DELETE /guests/:id)
  async function deleteGuest(guestId) {
    const response = await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    await console.log(deletedGuest);
    return deletedGuest;
  }

  // Removing guests from list
  async function handleDelete(guestId) {
    const allGuests = [...guests];
    const guestIndex = allGuests.findIndex((obj) => obj.id === guestId);
    allGuests.splice(guestIndex, 1);
    const test = await deleteGuest(guestId);
    console.log(test);
    setGuests(allGuests);
  }

  return (
    <div data-test-id="guest">
      {isLoading ? (
        <div data-test-id="guest">Loading...</div>
      ) : (
        <>
          <h1>Matcha Get-Together</h1>
          <h2>Guest List</h2>
          <form onSubmit={async (e) => await handleSubmit(e)}>
            <label>
              First name:
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                disabled={isLoading}
              />
            </label>
            <br />
            <label>
              Last name:
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                disabled={isLoading}
              />
            </label>
            <button disabled={isLoading} hidden>
              Create
            </button>
          </form>
          <div>
            <ul>
              {guests.map((guest) => (
                <li key={`guest-${guest.id}`}>
                  <div>
                    {guest.firstName} {guest.lastName}
                  </div>
                  <br />
                  <button
                    aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                    onClick={() => handleDelete(guest.id)}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                  <div>
                    <input
                      type="checkbox"
                      checked={guest.attending}
                      aria-label={`Attending ${guest.firstName} ${guest.lastName}`}
                      onChange={() => handleToggleAttending(guest.id)}
                    />
                    Attending
                  </div>
                </li>
              ))}
            </ul>
            <h2>Guest name:</h2>
            <ul>
              {fullNames.map((name) => (
                <li key={`guest-${name}`}>{name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
