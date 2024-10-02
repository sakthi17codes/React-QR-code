import './App.css';
import {useState} from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const[img,setImg]=useState("")
  const [qrData, setqrData] = useState("");
  const [qrSize, setqrSize] = useState("");
  
  async function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data="${encodeURIComponent(qrData)}`;
      setImg(url);
    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }
  function downloadQR(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob) => {
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
    
  return (
    <div className="App">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
            {img && <img src={img} className="qr-code"/>}
      <div>
      <label htmlFor="dat" className="input" >
        Data for Qr code:
      </label>
      <input type="text" id="dat" value={qrData} onChange={(e)=>setqrData(e.target.value)} placeholder="Enter the lik of the website"></input>
      <label htmlFor="size" className="input">
       Image Size:
      </label>
      <input type="text" id="size" value={qrSize} onChange={(e)=>setqrSize(e.target.value)} placeholder="enter image size (eg.150)"></input>
      <button className="generate-button" disabled={loading} onClick={generateQR} >Generate Qr code</button>
      <button className="download-button" onClick={()=>downloadQR("dwnl")}>Download Qr Code</button>
      </div>
    </div>
  );
}

export default App;
