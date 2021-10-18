import React from 'react'

export default function DynamicField({field, setField}) {

    function updateFieldValue(val, field) {
        const data = { value: val, key: field.key }
        setField(data);
    }

    function renderCorrectInput(field) {
        switch(field?.key) {
            case 'Email address':
                return (
                    <>
                        <label>{field.key}:</label>
                        <input type='email' value={field.value} placeholder={field.description || `type ${field.key} here...`} required={true} onChange={e => updateFieldValue(e.target.value, field)}></input>
                    </>
                )
            default:
                return (
                    <>
                        <label>{field.key}:</label>
                        <input type='text' value={field.value} placeholder={field.description || `type ${field.key} here...`} required={true} onChange={e => updateFieldValue(e.target.value, field)}></input>
                    </>
                )
        }
    }

    return (
        renderCorrectInput(field)
    )
}
