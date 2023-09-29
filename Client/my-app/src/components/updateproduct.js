import React, { useState } from 'react'
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import '../add.css';
import './update.css'


export default function Updateproduct() {
    const [input, setInput] = useState({
        productName:"",
        price:"",
        oldPrice:"",
        category:"",
        description:""
      });
    
    const [check, setCheck] = useState()
    
    const handlefnc = (e)=>{
        if (e.target.value==='active'||e.target.value==='Notactive') {
            setCheck(e.target.value)
        }else{
            setInput((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
          }))
        }
        
    }
    const handlecancel =()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('update');
        window.location.reload();
    }
    const handlesubmit = (e)=>{
        e.preventDefault()
        const id = localStorage.getItem("id")
        const Base_Url = "http://localhost:3000/"
        axios.post(Base_Url+'update/'+id,{
            productName:input.productName,
            price:input.price,
            oldPrice:input.oldPrice ,
            category:input.category,
            active:check,
            description:input.description
        })
        .then((data)=>{console.log(data)})
        .catch((data)=>{console.log(data)})
        .then(()=>{
            setInput({
                productName:"",
                price:"",
                oldPrice:"",
                category:"",
                description:""
              })
            setCheck("")
            localStorage.removeItem('id');
            localStorage.removeItem('update');
        })
    }
  return (
    <div className="container">
        <h1 className='title'> Modify Product </h1>
        <ClearIcon sx={{position:"absolute" ,top:"5%", right:"10%"}} onClick={handlecancel}/>
        <div className='form'>
            <form className='formCon' onSubmit={handlesubmit}>
                <label className='labl'>Product Name</label>
                <input className='int' type="text" name="productName" value={input.productName} onChange={handlefnc} required></input><br/><br/>
                <label className='labl'>Price</label>
                <input className='int' type="number" name="price" value={input.price} onChange={handlefnc} required></input><br/><br/>
                <label className='labl'>Old Price</label>
                <input className='int' type="number" name="oldPrice" value={input.oldPrice} onChange={handlefnc} required></input><br/><br/>
                <label className='labl'>Category</label>
                <select id="category"  className='int' name="category" value={input.category} onChange={handlefnc} required>
                    <option value="Non" >select</option>
                    <option value="vegetables" >vegetables</option>
                    <option value="Fruit and nuts" >Fruit and nuts</option>
                    <option value="dairy and cream" >dairy and cream</option>
                    <option value="packed food" >packed food</option>
                </select><br/><br/>
                <input className='int' type="checkbox" name="active" value="active" checked={check==="active"} onChange={handlefnc}></input>
                <label className='labl2'name="active">Active</label><br/><br/>
                <input className='int' type="checkbox" name="Notactive" value="Notactive" checked={check==="Notactive"} onChange={handlefnc}></input>
                <label className='labl2' name="Notactive">Not active</label><br/><br/>
                <label className='labl'>Description</label>
                <textarea className='int' id="description" name="description" value={input.description} onChange={handlefnc}  ></textarea><br/><br/>
                <input className='submit' type="submit"/>
            </form>
        </div>
   </div>
  )
}

