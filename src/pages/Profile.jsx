import Header from '../components/Heder';
import Search from '../components/job/Search';
import { useJobContext } from '../contexts/JobContext';

function Profile() {
  const { users, onSearchUsers } = useJobContext();
  console.log(users);
  return (
    <>
      <Header>
        <Search />
        <button type='button' onClick={onSearchUsers}>
          Search
        </button>
      </Header>
      <main>
        <section>
          {users.length ? (
            users.map((user) => (
              <div key={user.id} className='card'>
                <UserItem {...user} />
              </div>
            ))
          ) : (
            <>No data yet!</>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;

// eslint-disable-next-line react/prop-types
function UserItem({ name, email, skill }) {
  return (
    <>
      <h3>{name}</h3>
      <address>{email}</address>
      <p>{skill}</p>
    </>
  );
}
