import React from 'react'
import './Loader.css'
import AnimatedLoader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader({loadingTxt}) {

    const txt = loadingTxt ? loadingTxt : "Loading, Please wait...";

    return (
        <div className="loader-container justify-contnet-center d-flex flex-column align-items-center text-center font-weight-bold">
            <AnimatedLoader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
            />
        {txt}
        </div>
    )
}
