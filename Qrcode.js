import React, { useState } from 'react'
import qr from './assest/qr.png'
const Qrcode = () => {
    const [qrimg,setQrimg]=useState("");
    const [qrdata,setQrdata]=useState("")
    const [qrsize,setQrsize]=useState(200);
    const [loading,setLoading]=useState(false);
    async function data(){ 
        setLoading(true);
        console.log("loading");
        try{
            let url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata )}`;
            setQrimg(url);
        }
        catch(error)
        {
            console.error("ERROR OCUURED WHILE GENARATION",error)
        }
        finally{
            setLoading(false);
            console.log("loading completed ");
        }

    }
    const down=()=>
    {
        fetch(qrimg).then((k)=>k.blob()).then((blob)=>{ 
            const link=document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        })
    }
  return (
    <div className="tot-box">
        <h3>QR-GENERATOR</h3>
       {loading && <p>Loading...</p>} 
            {qrimg && <img src={qrimg} alt="no-img" />}
        <div className="user-url">
            <label htmlFor="user-url-data">Data to generate Qr code</label>
            <input type="text"className='user-url-data' onChange={(e)=>{setQrdata(e.target.value)}}  value={qrdata} placeholder='ex: www.google.com'/>
        </div>
        {/* <div className="user-size">
            <label htmlFor="user-size-data">Img size (e.g 200,.)</label>
            <input type="text"className='user-size-data' onChange={(e)=>{setQrsize(e.target.value)}} value={qrsize} placeholder=""/>
        </div> */}
        <div className="butt">
            <button className="generate" onClick={data} disabled={loading}>Generate</button>
            <button className="download" onClick={down}>Download</button>
        </div>

    </div>
  )
}

export default Qrcode