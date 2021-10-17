import React from 'react'
import './Loader.css'

export default function Loader({loadingTxt}) {

    const txt = loadingTxt ? loadingTxt : "Loading, Please wait...";

    return (
        <div className="loader-container d-flex align-items-center text-center font-weight-bold">{txt}</div>
    )
}
