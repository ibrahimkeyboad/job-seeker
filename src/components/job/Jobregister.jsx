import { useNavigate } from 'react-router-dom';
import { useJobContext } from '../../contexts/JobContext';

function JobRegister() {
  const { formState, onChangeEvent, onSubmitHandler } = useJobContext();

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      <form onSubmit={onSubmitHandler}>
        <input
          required
          name='name'
          value={formState.name}
          onChange={onChangeEvent}
          type='text'
          placeholder='Name'
        />

        <input
          name='email'
          required
          value={formState.email}
          onChange={onChangeEvent}
          type='email'
          placeholder='Email address'
        />

        <select name='skill' value={formState.skill} onChange={onChangeEvent}>
          <option value=''>Select your skill</option>
          <option value='driver'>Driver</option>
          <option value='developer'>Developer</option>
          <option value='singer'>Singer</option>
        </select>

        <button type='submit'>Submit</button>
      </form>
      {formState.error && <p className='error'>{formState.error}</p>}
    </div>
  );
}

export default JobRegister;
