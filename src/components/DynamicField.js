import React from 'react'

export default function DynamicField({field, setField}) {

    function updateFieldValue(val, field) {
        const data = { value: val, key: field.key }
        setField(data);
    }

    return (
        <>
            <label>{field.key}:</label>
            <input type='text' value={field.value} placeholder={field.description || `type ${field.key} here in english...`} required={true} onChange={e => updateFieldValue(e.target.value, field)}></input>
        </>
    )
}
