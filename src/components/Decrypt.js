import React from 'react'

const Decrypt = ({message,setMessage}) => {
    const [secret,setSecret]= React.useState('');
        const  decryptData=async ()=> {
            console.log(message);
            try {
                const url = 'https://classify-web.herokuapp.com/api/decrypt';
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
                window.alert('decrypt successful');
            } catch (error) {
                console.error(error);
            }
        }
  return (
    <div className="MessageSub">
    <form onSubmit={(e)=>{e.preventDefault();}}>
    <h1>Decrypt</h1>
    <h3>secret key:</h3>
    <input type="password" value={secret} onChange={(e)=>{setSecret(e.target.value)}}></input>
    <input type="submit" value="decrypt" onClick={decryptData}></input>
    </form>
</div>
  )
}

export default Decrypt