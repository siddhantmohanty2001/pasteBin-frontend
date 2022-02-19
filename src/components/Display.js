import React from 'react'
import queryString from 'query-string' //to retrieve parameters 
import copy from "clipboard-copy";
import axios from 'axios'
import { useSearchParams } from "react-router-dom";
import Decrypt from './Decrypt';
const Display = () => {
    const [message,setMessage]=React.useState("Link has expired");
    const [link,setLink]=React.useState('');
    const [date,setDate]= React.useState('');
    const [slug,setSlug]=React.useState('');
    const [ip, setIP] = React.useState('');
    const [value,setValue]=React.useState('');
  

    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("slug")
    const getData=async ()=>{
        let link=window.location.search;
        console.log(link);
        const path=queryString.parse(link);
         console.log(path.slug);
         setSlug(path.slug);
         //get IP
         const IP = await axios.get('https://geolocation-db.com/json/')
    console.log(IP.data);
    setIP(IP.data.IPv4);
    console.log(ip);

    //Post logs
    const resLogs=await fetch("https://pastebin-backend-3.herokuapp.com/postLogs", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify({slug:slug,date:new Date(),ip:ip})
            }
        )
        console.log(resLogs);

    //Get Snippets
        const res=await fetch("https://pastebin-backend-3.herokuapp.com/get");
        console.log(res);
        const data=await res.json();
        console.log(data);
        let found = await data.find(element => element.slug===path.slug);
        console.log(found);
        
        setValue(1);
        if(found){
          setMessage(found.snippet);
          setDate(found.date);
          setLink(found.link);
          setSlug(found.slug);
        }
        }
        React.useEffect(() => {
          getData();
          
        }, [value])
  return (
    <div className="Message">
      <div className="MessageSub">
        <div>
            <h2>slug: {slug}</h2>
        </div>
        <div className="MessageSnippet">
        <pre>
            <h2>

           {message} 
            </h2>
        </pre>
        </div>
        <div>
            <p><b>date of creation:</b> {date}</p>
        </div>
       <div>
           <p><b>Link:</b> {link}</p>

       </div>
       <div>
           <button onClick={() => {copy(window.location);window.alert('Link Copied Successfully')}}>copy link to clipboard</button>
       </div>
    </div>
    <Decrypt message={message} setMessage={setMessage}/>
    </div>
    
  )
}

export default Display