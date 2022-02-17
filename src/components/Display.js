import React from 'react'
import queryString from 'query-string' //to retrieve parameters 
import copy from "clipboard-copy";
import axios from 'axios'
import { useSearchParams } from "react-router-dom";
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
         
        const res=await fetch("https://pastebin-backend-2.herokuapp.com/get");
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
        <div>
            <h2>slug: {slug}</h2>
        </div>
        <div>
        <pre>
            <h2>

           {message} 
            </h2>
        </pre>
        </div>
        <div>
            <p>date: {date}</p>
        </div>
       <div>
           <p>Link: {link}</p>

       </div>
       <div>
           <button onClick={() => {copy(window.location);window.alert('Link Copied Successfully')}}>copy link to clipboard</button>
       </div>
    </div>
  )
}

export default Display