import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { resetState } from '../redux/VideoSlice';


function PreviewVideo({videoURL, resetState}) {
    
    const player_options = {
        interactive: true,
        size: "hd",
        autoplay: true,
        src: videoURL,
        extension: "mp4"
    };
    
    useEffect(() => {
        window.idmPlayerCreate(player_options, "idm_player");
    },[videoURL, player_options])
    
    return (
        <div>
            <button onClick={() => resetState()}>Go Back</button>
            <div id="idm_player" class="idm-player" ></div>
        </div>
    )
}

const mapDispatchToProps = {
    resetState
};

export default connect(null, mapDispatchToProps)(PreviewVideo);
