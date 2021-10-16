import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function DynamicField({field, setField}) {

    function updateFieldValue(val, field) {
        const data = { value: val, key: field.key }
        setField(data);
    }

    return (
        <>
            <label>{field.key}:</label>
            <input type='text' value={field.value} placeholder={field.description} required={true} onChange={e => updateFieldValue(e.target.value, field)}></input>
        </>
    )
}