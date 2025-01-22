// src/components/MultiSelectDropdown.js
import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelectDropdown = ({ options, selectedOptions, onChange, onAddNew }) => {
    const [newOption, setNewOption] = useState('');
    const selectOptions = options.map(option => ({ value: option, label: option }));
    const handleAddNew = () => {
        if (newOption) {
            onAddNew(newOption);
            setNewOption('');
        }
    };
    const handleChange = selected => onChange({ target: { value: selected.map(opt => opt.value) } });

    return (
        <div>
            <Select
                isMulti
                options={selectOptions}
                value={selectOptions.filter(option => selectedOptions.includes(option.value))}
                onChange={handleChange}
                placeholder="Select options"
            />
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add new item"
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '80%', marginRight: '5px' }}
                />
                <button onClick={handleAddNew} style={{ padding: '8px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>Add</button>
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
