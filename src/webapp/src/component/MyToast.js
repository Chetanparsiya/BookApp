import React, {useEffect, useState} from "react";
import {Toast } from 'react-bootstrap'

export default function MyToast(props) {
  const toastCss = {
    position : 'fixed',
    top: '10px',
    right: '10px',
    zIndex: '1',
    boxShadow: '0 4px 8px rgba(0 0 0 0.2px), 0 6px 20px 0 rgba(0,0,0,0.19)'
  }
  
 
  return (
   
    <div style={props.status ? toastCss  : null}>
      <Toast className="border border-success bg-success text-white" show={props.status}>
        <Toast.Header className={`bg-${props.action.type} text-white`}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.action.type}</strong>
          
        </Toast.Header>
        <Toast.Body>{props.action.message}</Toast.Body>
      </Toast>
    </div>
    
  );
}
