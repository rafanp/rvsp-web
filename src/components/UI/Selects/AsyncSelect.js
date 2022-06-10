import { AsyncPaginate } from 'react-select-async-paginate';
import loadFamilies from './loadFamilies';

const defaultAdditional = {
  page: 1,
};

const AsyncSelect = ({ options, onChange, defaultValue, method }) => {
  const selectStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const loadPageOptions = async (keyword, prevOptions, { page, search }) => {
    const { options, hasMore } = await method({
      page,
      // todo - Search not implemented in the method
      //search: keyword
    });

    return {
      options,
      hasMore,

      additional: {
        page: page + 1,
      },
    };
  };

  return (
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
