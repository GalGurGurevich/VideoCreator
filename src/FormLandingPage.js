import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchStoryBoardById, setField, initGenerateVideo, setVideoGeneratedStatus } from './VideoSlice'
import { fetchVideoStatus } from './API/idomooAPI'
import { connect } from 'react-redux';
import Loader from './shared/Loader'
import Form from './shared/Form'
import PreviewVideo from './PreviewVideo'
import './FormLandingPage.css'

function FormLandingPage({status, stories, setField, fetchStoryBoardById, initGenerateVideo, generateVideoStatus, checkVideoStatusUrl, setVideoGeneratedStatus, videoGeneratedStatus}) {

  useEffect(() => {
    fetchStoryBoardById()
  },[])

  useEffect(() => {
    if(checkVideoStatusUrl && videoGeneratedStatus != "VIDEO_AVAILABLE") {
      async function fetch() {
        const result = await fetchVideoStatus(checkVideoStatusUrl);
        if(result?.status == "RENDERING") {
          setVideoGeneratedStatus("Pending");
          setTimeout(() => { fetch() }, 3000);
        }
        if(result?.status == "VIDEO_AVAILABLE") {
          setVideoGeneratedStatus("VIDEO_AVAILABLE");
        }
      }
      fetch()
    }
  },[checkVideoStatusUrl, videoGeneratedStatus])

  function renderByStatus() {
    if(videoGeneratedStatus === 'VIDEO_AVAILABLE')  {
      return <PreviewVideo /> 
    }
    if(!status || status == "Loading" || generateVideoStatus == "Loading") {
      if(generateVideoStatus == "Loading") return <Loader loadingTxt={"Generating Video, Please Wait..."}/>
      return <Loader />
    }
    if(status == "Completed" || generateVideoStatus == "Completed") {
      return (
        <Form stories={stories} setField={setField} initGenerateVideo={initGenerateVideo}/>
      )
    }
    if(status == "Error" || generateVideoStatus == "Error") {
      return <p>Server Error...</p>
    }
  }


  return (
      renderByStatus()
  )
}


function mapStateToProps(state) {
  return { 
    status: state.video.status,
    stories: state.video.story,
    generateVideoStatus: state.video.generateVideoStatus,
    checkVideoStatusUrl: state.video.checkVideoStatusUrl,
    videoGeneratedStatus: state.video.videoGeneratedStatus
  }
}

const mapDispatchToProps = {
  fetchStoryBoardById,
  initGenerateVideo,
  setField,
  setVideoGeneratedStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLandingPage)

