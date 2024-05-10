import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Stack } from 'react-bootstrap';
import ReactLogo from './assets/react.svg';
import { useState, useRef } from 'react';
import QRCode from 'qrcode'
import Alert from 'react-bootstrap/Alert';
import { motion } from "framer-motion"

function App() {
  const [userText, setUserText] = useState('');
  const canvasRef = useRef(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [downloadDisabled, setDownloadDisabled] = useState(true);


  function generateQRCode() {
    QRCode.toCanvas(canvasRef.current, userText, { color: {
      dark:"#222",
      light:"#FFF"
    }, width: 300, height: 50,   errorCorrectionLevel: 'H'
  },(error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success");
        setShowSuccessMsg(true);
        setDownloadDisabled(false);
      }
    })
  }

  function downloadQRCode() {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function handleUserTextChange(e) {
    setUserText(e.target.value)
  }

  return (
    <>
      <motion.div className='container pt-5' initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6 }}>
        <Alert show={showSuccessMsg} variant="info" onClose={() => setShowSuccessMsg(false)} dismissible>
          <Alert.Heading>Here's your QR Code</Alert.Heading>
          <p>
            This QR code contains the value: <span className='fw-bold'>{userText}</span>
          </p>
        </Alert>
        <div className='row mt-5 justify-content-center'>
          <div className='col-sm-6'>
            <div className="d-flex flex-column align-items-center">
              <motion.canvas ref={canvasRef} className='img-thumbnail mb-3' style={{ width: '300px', height: '300px' }}></motion.canvas>
              <input onChange={handleUserTextChange} type="text" placeholder='Any Text' className="form-control mb-3" style={{ width: '300px' }} />
              <motion.button whileHover={{scale: 1.02}} whileTap={{ scale: 0.9 }} onClick={generateQRCode} type="button" className="btn btn-primary mb-2" style={{ width: '300px' }}>Generate QR Code</motion.button>
              <Button onClick={downloadQRCode} disabled={downloadDisabled} variant="success" size="md" style={{ width: '300px' }}>Download</Button>
            </div>
          </div>
        </div>
    </motion.div>
    </>
  )
}

export default App
