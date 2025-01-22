// src/components/SingleSelectDropdown.js
import React from 'react';
import Select from 'react-select';

const SingleSelectDropdown = ({ options, selectedOption, onChange }) => {
    const selectOptions = options.map(option => ({ value: option, label: option }));
    const handleChange = selected => onChange({ target: { value: selected.value } });

    return (
        <Select
            options={selectOptions}
            value={selectOptions.find(option => option.value === selectedOption)}
            onChange={handleChange}
            placeholder="Select an option"
        />
    );
};

export default SingleSelectDropdown;
