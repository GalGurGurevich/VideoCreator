import React from 'react'
import DynamicField from './DynamicField'

export default function Form({stories, setField, initGenerateVideo}) {

    function renderInputsByKeys(stories) {
        const inputs = Object.values(stories).map(function(field, i) {
            return (
                <React.Fragment key={i}>
                    <DynamicField field={field} setField={setField}></DynamicField>
                </React.Fragment>
            )
          })
        return inputs;
    }

    async function callToMakeVideo(e) {
        const formStories = Object.values(stories)
        e.preventDefault();
        await initGenerateVideo(formStories)
    }

    return (
        <form className="form-container d-flex flex-column p-2">
            <h3>Enter details below to generate video</h3>
            {renderInputsByKeys(stories)}
            <div className="d-flex justify-contnet-center pt-2">
                <button onClick={(e) => callToMakeVideo(e)}>Generate</button>
            </div>
        </form>
    )
}
