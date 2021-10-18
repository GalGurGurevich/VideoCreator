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

    function callToMakeVideo(e) {
        const formStories = Object.values(stories)
        e.preventDefault();
        initGenerateVideo(formStories)
    }

    return (
        <form className="form-container d-flex flex-column p-2" onSubmit={(e) => callToMakeVideo(e)}>
            <h3>Enter details below to generate video</h3>
            <div className="d-flex flex-column">
                {renderInputsByKeys(stories)}
            </div>
            <div className="d-flex justify-contnet-center pt-2">
                <button type="submit">Generate</button>
            </div>
        </form>
    )
}
