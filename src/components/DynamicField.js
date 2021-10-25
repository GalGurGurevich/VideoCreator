import React from 'react'

export default function DynamicField({field, setField, i}) {
    
    function updateFieldValue(val, field) {
        const data = { value: val, key: field.key }
        setField(data);
    }

    function renderCorrectInput(field) {
        switch(field?.key) {
            case 'Email address':
                return (
                    <div className="dynamic-field-row d-flex flex-column w-100 mw-100 p-1">
                        <label>{field.key}:</label>
                        <input type='email' value={field.value} placeholder={field.description || `type ${field.key} here...`} required={true} onChange={e => updateFieldValue(e.target.value, field)}></input>
                    </div>
                )
            default:
                return (
                    <div className="dynamic-field-row d-flex flex-column w-100 mw-100 p-1">
                        <label>{field.key}:</label>
                        <input type='text' value={field.value} placeholder={field.description || `type ${field.key} here...`} required={true} onChange={e => updateFieldValue(e.target.value, field)}></input>
                    </div>
                )
        }
    }

    return (
        renderCorrectInput(field)
    )
}
