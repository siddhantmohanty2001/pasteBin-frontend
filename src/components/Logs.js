import React from 'react'
import queryString from 'query-string' //to retrieve parameters 

const Logs = () => {
    const [logs,setLogs] =React.useState([{slug:'xyz',ip:'127',date:'zxz'},{slug:'xyz',ip:'127',date:'ZXZ'}])
    const [value,setValue] =React.useState('')
    const [slug,setSlug]= React.useState('')
    const getData=async ()=>{
        let link=window.location.search;
        console.log(link);
        const path=queryString.parse(link);
         console.log(path.slug);
         setSlug(path.slug)
        const res=await fetch("https://pastebin-backend-3.herokuapp.com/getLogs");
        console.log(res);
        const data=await res.json();
        console.log(data);
        setLogs(data);
        let found = await data.filter(element => element.slug===path.slug);
        console.log(found);
        
        setValue(1);
        if(found){
            //Sorted in descending order of date
            found.sort((a, b) => {
                
                return new Date(b.date) - new Date(a.date);
            });
            console.log(found);
          setLogs(found);
        }
    }
    React.useEffect(()=>{
        getData();
    },[value])
  return (
    <div>
        <div className="AppHeader">
        <h2>Logs of link access with slug={slug}</h2>
        </div>
        <div className="Messages">
            {logs.map((item)=>{
                return(
            <div className="MessageSub">
              <div className="LogCard">
            
            <p><b>ip:</b>{item.ip}</p>
            <p><b>date:</b>{item.date}</p>
            </div>
            
            </div>)
            })
        }
        </div>
    </div>
  )
}
export default Logs