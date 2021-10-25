import React from 'react'
import DynamicField from './DynamicField'
import './Form.css'

export default function Form({stories, setField, initGenerateVideo}) {

    function renderInputsByKeys(stories) {
        let formStructure = Object.values(stories);
        formStructure = [[formStructure[0], formStructure[1]], ...formStructure.slice(2).map(x => [x])];
        const inputs = formStructure.map(function(field, i) {
            if(field.length > 1) {
                return (
                    <div className="dual-field d-flex justify-content-between">
                        {field.map(function(f, i) {
                            return <DynamicField field={f} setField={setField} key={i}></DynamicField>
                        })}
                    </div>
                )
            }
            return (
                <DynamicField field={field[0]} setField={setField} key={i}></DynamicField>
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
