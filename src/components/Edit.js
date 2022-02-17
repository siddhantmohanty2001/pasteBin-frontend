import React from 'react'
import queryString from 'query-string' //to retrieve parameters 
const Edit = () => {
    const [id,setId]= React.useState('')
    React.useEffect(()=>{
        let link=window.location.search;
        console.log(link);
        const path=queryString.parse(link);
         console.log(path.id);
         setId(path.id);
    },[])
    
    const [newExpiry,setNewExpiry]= React.useState(new Date());
    //editExpiry
    
    const editExpiry=async () => {
        /* setTasks(tasks.map((task)=>task._id===id?{...task,remainder:!task.remainder}:task))*/
        const res=await fetch('https://pastebin-backend-2.herokuapp.com/put',{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body:JSON.stringify({_id:id,expiryDate:newExpiry})
        })
        const data=await res.json();
        console.log(data);
        // setChange(!change);
        }
  return (
    <div>
        <h2>Enter new expiryDate:</h2>
        <form onSubmit={(e) =>{e.preventDefault()}}>
            <input type="text" value={newExpiry} onChange={(e)=>{setNewExpiry(e.target.value)}}></input>
            <input type="submit" value="submit" onClick={editExpiry}></input>
        </form>
    </div>
  )
}

export default Edit