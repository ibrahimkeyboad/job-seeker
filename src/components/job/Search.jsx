import { useJobContext } from '../../contexts/JobContext';

function Search() {
  const { onSearchQuery, search } = useJobContext();

  return (
    <search>
      <input
        name='query'
        value={search}
        onChange={onSearchQuery}
        type='search'
        placeholder='Search...'
      />
    </search>
  );
}

export default Search;
