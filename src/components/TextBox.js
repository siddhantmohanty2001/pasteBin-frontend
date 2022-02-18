import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import * as randomstring from "randomstring";
import { Link } from 'react-router-dom';

const TextBox = () => {
    const [message,setMessage] = React.useState('');
    const [slug,setSlug] = React.useState( (Math.random() + 1).toString(36).substring(7));
    const [link,setLink] = React.useState(`https://unruffled-ptolemy-6018ac.netlify.app/display?slug=${slug}`)
    const [expiryDate,setExpiryDate] = React.useState(new Date(Date.now() + ( 3600 * 1000 * 24)))
//     let d = new Date();
//   d.setDate(d.getDate()+ 1);
//   setExpiryDate(d);
    const handleSubmit=async ()=>{
        // let slug = randomstring.generate({
        //     length: 6,
        //     charset: "alphabetic",
        //   });
        //   console.log(slug);
//         let r = (Math.random() + 1).toString(36).substring(7);
// console.log("random", r);
        
//         console.log(r);
//        setSlug(r);
          console.log(message);
        const res=await fetch("https://pastebin-backend-3.herokuapp.com/post", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify({snippet:message,slug:slug,date:new Date(),expiryDate:expiryDate,link:link})
            }
        )
        console.log(res);
    }
    return (
        <div className="TextBox">
            <form onSubmit={(e)=>{e.preventDefault()}}>
            
            <div className="TextArea" placeholder="type your text" value={message} onChange={(e)=>{setMessage(e.target.value)}}>
            {/* <input type="textarea" placeholder="type your text" value={message} onChange={(e)=>{setMessage(e.target.value)}}></input> */}
            <TextareaAutosize minRows={20} placeholder="type your text" style={{backgroundColor: '#ADD8E6',width:'50rem'}}/>
            </div>
            <Link onClick={e => (!message ) ? e.preventDefault() : null} to={`/display?slug=${slug}`}>
                
                <input type="submit" value="submit" onClick={handleSubmit}></input>
                </Link>
            {/* <input type="submit" value="submit" onClick={handleSubmit}></input> */}
            </form>
           
        </div>
    )
}

export default TextBox
