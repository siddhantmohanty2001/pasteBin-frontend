import React from 'react'
import queryString from 'query-string' //to retrieve parameters 

const Logs = () => {
    const [logs,setLogs] =React.useState([{slug:'xyz',ip:'127',date:'zxz'},{slug:'xyz',ip:'127',date:'ZXZ'}])
    const [value,setValue] =React.useState('')
    const getData=async ()=>{
        let link=window.location.search;
        console.log(link);
        const path=queryString.parse(link);
         console.log(path.slug);
        const res=await fetch("https://pastebin-backend-3.herokuapp.com/getLogs");
        console.log(res);
        const data=await res.json();
        console.log(data);
        setLogs(data);
        let found = await data.filter(element => element.slug===path.slug);
        console.log(found);
        
        setValue(1);
        if(found){
          setLogs(found);
        }
    }
    React.useEffect(()=>{
        getData();
    },[value])
  return (
    <div>
        <h1>Logs</h1>
        <div className="Messages">
            {logs.map((item)=>{
                return(
            <div className="MessageSub">
              <div>
            <h2>{item.slug}</h2>
            <h2>{item.ip}</h2>
            <h2>{item.date}</h2>
            </div>
            
            </div>)
            })
        }
        </div>
    </div>
  )
}
export default Logs