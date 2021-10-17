import React from 'react';
import FormLandingPage from './pageComponents/FormLandingPage'
import PreviewVideoPage from './pageComponents/PreviewVideoPage'
import Loader from './components/Loader'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

function App({videoGeneratedStatus, videoURL}) {

  function renderRelevantPage() {
    if (videoGeneratedStatus === 'Pending') {
      return <Loader loadingTxt={"The Video is on it's way!..."} />;
    }
    if(videoGeneratedStatus === 'VIDEO_AVAILABLE') {
      return <PreviewVideoPage videoURL={videoURL} /> 
    }
    return <FormLandingPage />
  }

  return (
    renderRelevantPage()
  );
}

function mapStateToProps(state) {
  return {
      videoGeneratedStatus: state.video.videoGeneratedStatus,
      videoURL: state.video.videoGeneratedUrl
  };
}

export default connect(mapStateToProps, null)(App);
