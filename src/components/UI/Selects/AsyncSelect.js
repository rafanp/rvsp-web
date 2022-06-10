import { AsyncPaginate } from 'react-select-async-paginate';
import loadFamilies from './loadFamilies';

import loadOptions from './loadOptions';

const defaultAdditional = {
  page: 1,
};

const AsyncSelect = ({ options, onChange, defaultValue }) => {
  const selectStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const loadPageOptions = async (q, prevOptions, { page }) => {
    const { options, hasMore } = await loadFamilies({ page });

    return {
      options,
      hasMore,

      additional: {
        page: page + 1,
      },
    };
  };

  return (
    // <button onClick={() => loadFamilies({})}></button>
    <AsyncPaginate
      additional={defaultAdditional}
      value={defaultValue}
      loadOptions={loadPageOptions}
      onChange={onChange}
      styles={selectStyles}
      menuPortalTarget={document.body}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
    />
  );
};

export default AsyncSelect;
