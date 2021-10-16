import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchStoryBoardById, setField, initGenerateVideo, setVideoGeneratedStatus } from './VideoSlice';
import { fetchVidamooVideoStatus } from './API/idomooAPI';
import { connect } from 'react-redux';
import Loader from './shared/Loader';
import Form from './shared/Form';
import PreviewVideo from './PreviewVideo';
import './FormLandingPage.css';

function FormLandingPage({
    status,
    stories,
    setField,
    fetchStoryBoardById,
    initGenerateVideo,
    videoCreatorResponseStatus,
    videoGeneratedStatusUrl,
    setVideoGeneratedStatus,
    videoGeneratedStatus,
    videoURL,
}) {
    useEffect(() => {
        fetchStoryBoardById();
    }, []);

    useEffect(() => {
        if (videoGeneratedStatusUrl && videoGeneratedStatus !== 'VIDEO_AVAILABLE') {
            async function fetch() {
                const result = await fetchVidamooVideoStatus(videoGeneratedStatusUrl);
                if (result?.status === 'RENDERING') {
                    setVideoGeneratedStatus('Pending');
                    setTimeout(() => {
                        fetch();
                    }, 3000);
                }
                if (result?.status === 'VIDEO_AVAILABLE') {
                    setVideoGeneratedStatus('VIDEO_AVAILABLE');
                }
            }
            fetch();
        }
    }, [videoGeneratedStatusUrl, videoGeneratedStatus]);

    function renderByAppStatus() {
        if (videoGeneratedStatus === 'Pending') {
            return <Loader loadingTxt={"The Video is on it's way!..."} />;
        }
        if (videoGeneratedStatus === 'VIDEO_AVAILABLE') {
            return <PreviewVideo videoURL={videoURL} />;
        }
        if (!status || status === 'Loading' || videoCreatorResponseStatus === 'Loading') {
            if (videoCreatorResponseStatus === 'Loading') return <Loader loadingTxt={'Sending Video Generate Req, Please Wait...'} />;
            return <Loader />;
        }
        if (status === 'Completed' || videoCreatorResponseStatus === 'Completed') {
            return <Form stories={stories} setField={setField} initGenerateVideo={initGenerateVideo} />;
        }
        if (status === 'Error' || videoCreatorResponseStatus === 'Error') {
            return <p>Server Error...</p>;
        }
    }

    return renderByAppStatus();
}

function mapStateToProps(state) {
    return {
        status: state.video.status,
        stories: state.video.story,
        videoCreatorResponseStatus: state.video.videoCreatorResponseStatus,
        videoGeneratedStatusUrl: state.video.videoGeneratedStatusUrl,
        videoGeneratedStatus: state.video.videoGeneratedStatus,
        videoURL: state.video.videoGeneratedUrl,
    };
}

const mapDispatchToProps = {
    fetchStoryBoardById,
    initGenerateVideo,
    setField,
    setVideoGeneratedStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLandingPage);
