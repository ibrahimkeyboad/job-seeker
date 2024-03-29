import { createContext, useContext, useReducer } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const JobContext = createContext();

const formData = {
  name: '',
  email: '',
  skill: '',
  id: null,
};

const initialState = {
  formState: formData,
  users: localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [],

  search: '',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'event':
      return {
        ...state,
        formState: { ...state.formState, [payload.name]: payload.value },
      };

    case 'user/add':
      return { ...state, users: [...state.users, payload] };
    case 'user/search':
      return { ...state, users: payload };

    case 'reset':
      return { ...state, formState: formData };

    case 'search':
      return { ...state, search: payload };

    default:
      break;
  }
}

// eslint-disable-next-line react/prop-types
function JobProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');

  const { formState, users, search } = state;

  function handlerEvent(event) {
    const { name, value } = event.target;

    dispatch({ type: 'event', payload: { name: name, value: value } });
  }

  function handlerSearch(e) {
    // setSearchParams({ query: e.target.value });

    dispatch({ type: 'search', payload: e.target.value });
  }

  function handlerSearchUser() {
    setSearchParams({ query: search });

    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];

    const filterUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log(filterUsers);

    dispatch({ type: 'user/search', payload: filterUsers });
  }

  function handlerSubmit(e) {
    e.preventDefault();

    const newUser = {
      ...formState,
      id: Date.now(),
    };

    console.log(newUser);

    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    dispatch({ type: 'user/add', payload: newUser });

    dispatch({ type: 'reset' });

    navigate('/');
  }

  const value = {
    formState,
    onChangeEvent: handlerEvent,
    onSubmitHandler: handlerSubmit,
    users,
    onSearchQuery: handlerSearch,
    onSearchUsers: handlerSearchUser,
    search,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

function useJobContext() {
  const context = useContext(JobContext);

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { JobProvider, useJobContext };
