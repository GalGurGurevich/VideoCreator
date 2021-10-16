import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchStoryBoardById, setField } from './VideoSlice'
import { connect } from 'react-redux';
import Loader from './shared/Loader'
import Form from './shared/Form'
import './FormLandingPage.css'

function FormLandingPage({status, stories, setField, fetchStoryBoardById}) {
  console.log("FormLandingPage", status, stories)

  useEffect(() => {
    fetchStoryBoardById()
  },[])


  function renderByStatus() {
    if(!status || status == "Loading") {
      return <Loader />
    }
    if(status == "Completed") {
      return (
        <Form stories={stories} setField={setField} />
      )
    }
    if(status == "Error") {
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
    stories: state.video.story
  }
}

const mapDispatchToProps = {
  fetchStoryBoardById,
  setField
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLandingPage)

