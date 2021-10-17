import React from 'react';
import FormLandingPage from './pageComponents/FormLandingPage'
import PreviewVideoPage from './pageComponents/PreviewVideoPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';


function App({videoGeneratedStatus, videoURL}) {

  function renderRelevantPage() {
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
