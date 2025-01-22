// src/components/Table.js
import React, { useState } from 'react';
import SingleSelectDropdown from './SingleSelectDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Table = () => {
    const [rows, setRows] = useState([{ label1: '', label2: [] }]);
    const [options1] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [options2, setOptions2] = useState(['Option A', 'Option B', 'Option C']);

    const handleAddRow = () => {
        setRows([...rows, { label1: '', label2: [] }]);
    };

    const handleOption1Change = (index, event) => {
        const newRows = [...rows];
        newRows[index].label1 = event.target.value;
        setRows(newRows);
    };

    const handleOption2Change = (index, event) => {
        const newRows = [...rows];
        newRows[index].label2 = event.target.value;
        setRows(newRows);
    };

    const handleAddNewOption2 = (newOption) => {
        setOptions2([...options2, newOption]);
    };

    const handleDeleteRow = (index) => {
        if (window.confirm('Are you sure you want to delete this row?')) {
            const newRows = rows.filter((_, i) => i !== index);
            setRows(newRows);
        }
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(rows);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setRows(items);
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="rows">
                    {(provided) => (
                        <table {...provided.droppableProps} ref={provided.innerRef}>
                            <thead>
                                <tr>
                                    <th>Label 1</th>
                                    <th>Label 2</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <Draggable key={index} draggableId={String(index)} index={index}>
                                        {(provided) => (
                                            <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <td>
                                                    <SingleSelectDropdown
                                                        options={options1.filter(option => !rows.some(r => r.label1 === option))}
                                                        selectedOption={row.label1}
                                                        onChange={(e) => handleOption1Change(index, e)}
                                                        data-tip="Select an option"
                                                    />
                                                </td>
                                                <td>
                                                    <MultiSelectDropdown
                                                        options={options2}
                                                        selectedOptions={row.label2}
                                                        onChange={(e) => handleOption2Change(index, e)}
                                                        onAddNew={handleAddNewOption2}
                                                        data-tip="Select options"
                                                    />
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDeleteRow(index)}>Delete</button>
                                                </td>
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        </table>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={handleAddRow}>Add new Row</button>
        </div>
    );
};

export default Table;
