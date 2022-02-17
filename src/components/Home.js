import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
     //creating function to load ip address from the API
     const [ip,setIP]= React.useState('')
     const getIP = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      console.log(res.data);
      setIP(res.data.IPv4);
      console.log("IP=",ip);
    }

    const [messages,setMessages]=React.useState(["xyx","fgf","sgshgd"])
    const getData=async ()=>{
    const res=await fetch("https://pastebin-backend-2.herokuapp.com/get");
    console.log(res);
    const data=await res.json();
    console.log(data);
    setMessages(data);
    }
    React.useEffect(() => {
      getData();
    }, [])
    //delete tasks 
const deleteSnippet= async (id)=>{
  setMessages(messages.filter((item)=>
    item._id!==id
  ))
  console.log(id);
const res=await fetch('https://pastebin-backend-2.herokuapp.com/delete',{
  method: "DELETE",
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body:JSON.stringify({_id:id})
});
}
  return (
    <div>
        <h2>Available Links</h2>
        <div className="Messages">
            {messages.map((item)=>{
                return(
            <div className="Message">
              <div>
            <h2>{item.slug}</h2>
            </div>
            <div>
           opened
            </div>
            <div>
           <p>date:{item.date}</p>
            </div>
            <div>
              <p>link: {item.link}</p>
            </div>
            <div>
              <button onClick={()=>deleteSnippet(item._id)}>delete</button>
              <Link  to={`/edit?id=${item._id}`}>
                
              <button>edit</button>
                {/* <input type="submit" value="submit" onClick={handleSubmit}></input> */}
                </Link>
            </div>
            </div>)
            })
        }
        </div>
    </div>
  )
}

export default Home