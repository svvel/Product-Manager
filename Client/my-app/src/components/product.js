import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Updateproduct from './updateproduct';


function Cell({productName,price,oldPrice,category,active,description,id}) {


    const handleUpdate = ()=>{
        localStorage.setItem("id",id)
        localStorage.setItem("update", "true")
        window.location.reload();
    }
    const handleDelete = ()=>{     
        const Base_Url = "http://localhost:3000/"
        var result = window.confirm("Do you want to continue?");
            if (result) {
                axios.post(Base_Url+`delete/${id}`)   
                .then((data)=>{console.log('deleted success')})
                .catch((err)=>{console.log(err)})
                .then(()=>{
                    window.location.reload();
                })
            } else {
            alert("You chose 'No'");
            }       
    }
  return (
    <React.Fragment>
        <TableRow key={productName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                <TableCell >{productName}</TableCell>
                <TableCell >{price}</TableCell>
                <TableCell >{oldPrice}</TableCell>
                <TableCell >{category}</TableCell>
                <TableCell >{active}</TableCell>
                <TableCell >{description}</TableCell>
                <TableCell ><AutoFixHighIcon sx={"color:blue"} onClick={handleUpdate}/></TableCell>
                <TableCell ><DeleteForeverIcon sx={"color:red"} onClick={handleDelete} /></TableCell>

        </TableRow>
    </React.Fragment>
  )
}


export default function Product() {
  const [row, setRow]= React.useState([])
  const [active, setActive]= React.useState("")
  
  const Base_Url = "http://localhost:3000/"
  React.useEffect(()=>{
     axios.get(Base_Url)   
    .then((data)=>{setRow(data.data)})
    .catch((err)=>{console.log(err)})
    .then(()=>{
        const value = localStorage.getItem("update")
        console.log(value)
        setActive(value)
    })
  },[])

  return (
 <React.Fragment>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>

          <TableRow>
            <TableCell> Product Nmae</TableCell>
            <TableCell> price</TableCell>
            <TableCell> oldPrice</TableCell>
            <TableCell> category</TableCell>
            <TableCell> active</TableCell>
            <TableCell> description</TableCell>
            <TableCell> Modify</TableCell>
            <TableCell> Delete</TableCell>
          </TableRow>

        </TableHead>
        <TableBody>

          {row.map((row) => (
            <Cell key={row._id} productName={row.productName} price={row.price} oldPrice={row.oldPrice} category={row.category}
            active={row.active} description={row.description} id={row._id}/>
        ))}

        </TableBody>
      </Table>
    </TableContainer>
    {active==="true" && <Updateproduct/>}
 </React.Fragment>
  );
}
