import Select from 'react-select';

const ReactSelect = ({ options, onChange, defaultValue }) => {
  const selectStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      styles={selectStyles}
      menuPortalTarget={document.body}
    />
  );
};

export default ReactSelect;
