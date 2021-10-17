import React, { useEffect } from 'react'

export default function PreviewVideo({videoURL}) {
    
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
            <div id="idm_player" class="idm-player" ></div>
        </div>
    )
}
