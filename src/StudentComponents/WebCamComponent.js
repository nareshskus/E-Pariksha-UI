import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { Button, Popover, Whisper } from 'rsuite';

export const WebCamComponent = () => {
    const webcamRef = useRef(null);
    
  return (
    <div style={{marginRight:'20px'}}>
        <Whisper placement='bottom' trigger={'click'}
        speaker={<Popover arrow={false} style={{textAlign:'center'}}>
            <Alert key={'danger'} variant='danger'>This Exam is AI Proctored.<br/>Please don't turn off camera or switch tabs.</Alert>
            <Webcam style={{width:'220px', height:'150px'}} autoFocus={true} imageSmoothing={true} mirrored={true}/>
        </Popover>}>
            <Button color='red' appearance='primary' size='sm'>Camera</Button>
        </Whisper>
    </div>
  )
}
