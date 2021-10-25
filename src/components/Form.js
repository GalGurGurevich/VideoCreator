import React from 'react'
import DynamicField from './DynamicField'
import './Form.css'

export default function Form({stories, setField, initGenerateVideo}) {

    function renderInputsByKeys(stories) {
        let formStructure = Object.values(stories);
        formStructure = [[formStructure[2], formStructure[3]], ...formStructure.slice(0, 2).map(x => [x]) , ...formStructure.slice(4).map(x => [x])];
        const inputs = formStructure.map(function(field, i) {
                return (
                    <div className="field-row d-flex justify-content-between">
                        {field.map(function(f, i) {
                            return <DynamicField field={f} setField={setField} key={i}></DynamicField>
                        })}
                    </div>
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
            <div className="input-box d-flex flex-column">
                {renderInputsByKeys(stories)}
            </div>
            <div className="d-flex justify-contnet-center p-1">
                <button type="submit">Generate</button>
            </div>
        </form>
    )
}
