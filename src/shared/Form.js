import React from 'react'
import DynamicField from './DynamicField'

export default function Form({stories, setField}) {
    console.log("Form: ", stories)
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

    function callToMakeVideo() {

    }

    return (
        <form className="form-container d-flex flex-column p-2">
            {renderInputsByKeys(stories)}
            <div className="d-flex justify-contnet-center m-20">
                <button onClick={() => callToMakeVideo()}>Generate</button>
            </div>
        </form>
    )
}
