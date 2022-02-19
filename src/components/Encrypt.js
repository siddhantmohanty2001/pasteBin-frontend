import React from 'react'

const Encrypt = ({message,setMessage}) => {
    const [secret,setSecret]= React.useState('');
    const  encryptData=async ()=> {
        console.log(message);
        try {
            const url = 'https://classify-web.herokuapp.com/api/encrypt';
            const jsonData = JSON.stringify({ 
                data: `${message}`, key: `${secret}`
            });
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: jsonData
            });
            const result = await response.json();
            console.log(result);
            setMessage(result.result);
            window.alert('message encrypted->Click submit')
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="MessageSub">
        <form onSubmit={(e)=>{e.preventDefault();}}>
        <h1>Encrypt</h1>
        <h3>secret key:</h3>
        <input type="password" value={secret} onChange={(e)=>{setSecret(e.target.value)}}></input>
        <input type="submit" value="encrypt" onClick={encryptData} ></input>
        </form>
    </div>
  )
}

export default Encrypt