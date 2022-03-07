import React, { useState } from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

function VoiceRecorder() {
    const [recordState, setRecordState] = useState(null)



    const start = () => {
        setRecordState({
            setRecordState: RecordState.START
        })
    }

    const stop = () => {
        setRecordState({
            recordState: RecordState.STOP
        })
    }

    //audioData contains blob and blobUrl
    const onStop = (audioData) => {
        console.log('audioData', audioData)
    }

    

        return (
            <div>
                <AudioReactRecorder state={recordState} onStop={onStop} />
                <button onClick={start}>Start</button>
                <button onClick={stop}>Stop</button>
            </div>
        )
    
}

export default VoiceRecorder