import React from "react";
import {FiFilePlus, FiLogOut} from "react-icons/fi"
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"

export default function Head({title}){
    const history = useHistory();
    const logoff = ()=>{
        // history.push("/");
        window.location.href="/";
    }
    function confirmarSaida(){
        confirmAlert({
            title: 'Confirmar Saída',
            message:`Deseja realmente sair do Site?`,
            buttons: [
                {
                    label:'Sim',
                    onClick:() => logoff()
                },
                {
                    label:'Não',
                    // onClick:() => alert('Click No')
                }
            ]
        })
    }
    return(
        <div className="head">
            <div className="tilte">
                <h1>{title}</h1>
            </div>
            <div className="logoff">
                <FiLogOut 
                size={24} 
                color="#5d5c49"
                cursor="pointer"
                onClick={confirmarSaida}
                />
            </div>
        </div>
    )
}