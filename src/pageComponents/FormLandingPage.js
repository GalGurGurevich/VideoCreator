import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchStoryBoardById, setField, initGenerateVideo, setVideoGeneratedStatus } from '../redux/VideoSlice';
import { fetchVidamooVideoStatus } from '../API/idomooAPI';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Form from '../components/Form';
import Error from '../components/Error'
import './FormLandingPage.css';

function FormLandingPage({
    storyBoardFetchStatus,
    stories,
    setField,
    fetchStoryBoardById,
    initGenerateVideo,
    videoCreatorResponseStatus,
    videoGeneratedStatusUrl,
    setVideoGeneratedStatus,
    videoGeneratedStatus,
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
                else if (result?.status === 'VIDEO_AVAILABLE') {
                    setVideoGeneratedStatus('VIDEO_AVAILABLE');
                }
                else {
                    setVideoGeneratedStatus('Error');
                }
            }
            fetch();
        }
    }, [videoGeneratedStatusUrl, videoGeneratedStatus, setVideoGeneratedStatus]);

    function renderByAppStatus() {
        if (!storyBoardFetchStatus || storyBoardFetchStatus === 'Loading' || videoCreatorResponseStatus === 'Loading') {
            return (videoCreatorResponseStatus === 'Loading') ? <Loader loadingTxt={'Sending Video Generate Req, Please Wait...'} /> : <Loader />;
        }
        if (storyBoardFetchStatus === 'Error' || videoCreatorResponseStatus === 'Error') {
            return <Error />
        }
        if (storyBoardFetchStatus === 'Completed' || videoCreatorResponseStatus === 'Completed') {
            return <Form stories={stories} setField={setField} initGenerateVideo={initGenerateVideo} />;
        }
    }

    return renderByAppStatus();
}

function mapStateToProps(state) {
    return {
        storyBoardFetchStatus: state.video.storyBoardFetchStatus,
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
