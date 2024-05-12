import React from 'react'
import Header from '../TopHeader/Header'
import inprog from "../../images/inprog.jpg"
export default function Pawsonality() {
  return (
    <>
    <Header />
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:"50px"}}>
     <h2>Pawsonality Development is in progress!! Stay Tuned.</h2>
     <img src={inprog}/>
    </div>
    </>
  )
}
