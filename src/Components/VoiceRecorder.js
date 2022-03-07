import React, { useState } from 'react'

import { useReactMediaRecorder } from "react-media-recorder";

function VoiceRecorder() {

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ audio: true });

    console.log('mediaBlobUrl', mediaBlobUrl)




    return (
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <audio src={mediaBlobUrl} controls />
        </div>
    )

}

export default VoiceRecorder