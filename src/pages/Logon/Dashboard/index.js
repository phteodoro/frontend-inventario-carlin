import React from "react";
import './styles.css';
// import { FiUser, FiTruck }from 'react-icons/fi'
// import { AiFillCar } from "react-icons/ai";
// import { FcConferenceCall,FcSalesPerformance } from "react-icons/fc";
// import { BiCoinStack, BiHomeCircle } from "react-icons/bi";
import Menu from "../../../componentes/Menu";

export default function Dashboard(){
    return(
        <div className="dashboard-container">
                {/* <p>Estou no Dashboard</p> */}          
            <Menu/>   
            <div className="principal">
                <p>Principal</p>
            </div>
        </div>
    )
}