// import React,{useState,useEffect} from "react";
// import Menu from "../../componentes/Menu";
// import Head from "../../componentes/Head"
// import { useParams } from "react-router-dom";
// import api from "../../server/api";

// export default function Editarlotacao(){
    
//     const{idlotacao} = useParams();
//     const[empresa,setEmpresa] = useState('');
//     const[patrimonio,setPatrimonio] = useState('');
//     const[setor,setSetor] = useState('');
//     const[responsavel,setResponsavel] = useState('');
//     const[msg,setMsg] = useState('');
//     const dados={
//         id:idlotacao,
//         empresa,
//         patrimonio,
//         setor,
//         responsavel
//     }
//     useEffect(()=>{
//         mostrarDados();
//     },[idlotacao])
//     function mostrarDados(){     
//             // let listaUser = JSON.parse(localStorage.getItem("cd-empresas"));
//             // listaUser.
//             //     filter(value => value.id == idlotacao).
//             //     map(value => {
//             //         setNome(value.nome);                
//             //     });
//         api.get(`/lotacao/${idlotacao}`)
//             .then(res=>{
//             if(res.status==200){
//                 setEmpresa(res.data.lotacao[0].empresa);
//                 setPatrimonio(res.data.lotacao[0].patrimonio);
//                 setSetor(res.data.lotacao[0].setor);
//                 setResponsavel(res.data.lotacao[0].responsavel);
//             }else{
//                 console.log("houve um erro de aquisição")
//             }
//         })
//         .catch(function(error){
//             console.log(error);
//         });
//         }
//     function limparLocalstore(){
//             localStorage.removeItem("cd-lotacao");
//                 alert("Local Store deletado!") 
//         }
// function salvardados(e){
//     e.preventDefault();
//                 let index=0
//                 if(nome.length<=3)
//                 {
//                     setMsg("Campo nome precisa ter mais de 3 letras");
//                     index++;
//                 }
//                 if(index===0){
//                     console.log(dados);
//                     api.patch('lotacao',
//                     dados,

//                         {headers: { 'Content-Type': 'application/json' }

//                     }).then(function (response){
//                         console.log(response.data);

//                         alert("Cadastro Salvo com sucesso!");
//                         window.location.href="/listlotacao"
//                     });
//                     // localStorage.setItem("cd-usuarios", JSON.stringify(listaUser));
//                     // alert("Dados salvos com sucesso!");
//                     // window.location.href="/listausuarios"; 
//                     }         
//                 }
//     return(
//         <div className="dashboard-container">   
//             <Menu/>   
//             <div className="principal">
//               <Head title="Editar Empresa"/>
//                 <section className="form-cadastro">
//                     <form onSubmit={salvardados}>
//                         <label>Nome</label>
//                         <input placeholder="Nome"
//                             value={nome}
//                             onChange={e=>setNome(e.target.value)}
//                         />                           
//                         <label>Responsável</label>
//                         <input placeholder="Nome"
//                             value={responsavel}
//                             onChange={e=>setResponsavel(e.target.value)}
//                         />                           
//                         <label>Contato</label>
//                         <input placeholder="Nome"
//                             value={contato}
//                             onChange={e=>setContato(e.target.value)}
//                         />                           
//                             <p>{msg}</p>
//                         <button className="button_save" type="submit">Salvar</button>
//                         <button onClick={limparLocalstore} className="" type="button">Limpar</button>
//                     </form>              
//                 </section>
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
// import {  FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
// import ListaEmpresa from "../ListaEmpresa";
import api from "../../server/api";


export default function EditarLotacao() {
    const  {idlotacao}  =  useParams();
    const [idusu, setIusu] = useState("");
    const [idemp, setIemp] = useState("");
    const [idpat, setPat] = useState("");
    const [idset, setSet] = useState("");
    const [lotacao, setLotacao] = useState()
    const [empresa, setEmpresa] = useState([]);
    const [patrimonio, setPatrimonio] = useState([]);
    const [setor, setSetor] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const dados = {
        id: idlotacao,
        idusu,
        idemp,
        idpat,
        idset,
        lotacao
    }
    const [msg, setMsg] = useState('');
  
   

function dataFormatada(d){
    let data = new Date(d),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    
   return(anoF+"-"+mesF+"-"+diaF)
   //console.log(anoF+"/"+mesF+"/"+diaF);
}
    useEffect(() => {
        mostrarDados();
    }, [])

    function mostrarDados() {

        api.get(`/usuario`)
            .then(res => {
                if (res.status == 200) {
                    setUsuario(res.data.usuario);
                    console.log("Status" + res.status);
                    console.log(res.data.mensagem);
                } else {
                    console.log("Houve um erro na requisição")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
            
        api.get(`/empresa`)
            .then(res => {
                if (res.status == 200) {
                    setEmpresa(res.data.empresa);
                    console.log("Status" + res.status);
                    console.log(res.data.mensagem);
                } else {
                    console.log("Houve um erro na requisição")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
            
        api.get(`/setor`)
            .then(res => {
                if (res.status == 200) {
                    setSetor(res.data.setor);
                    console.log("Status" + res.status);
                    console.log(res.data.mensagem);
                } else {
                    console.log("Houve um erro na requisição")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
       
            
        api.get(`/patrimonio`)
            .then(res => {
                if (res.status == 200) {
                    setPatrimonio(res.data.patrimonio);
                    console.log("Status" + res.status);
                    console.log(res.data.mensagem);
                } else {
                    console.log("Houve um erro na requisição")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
           

            api.get(`/lotacao/${idlotacao}`)
            .then(res => {
                
                setIusu(res.data.lotacao[0].idusu);
                setIemp(res.data.lotacao[0].idemp);
                setPat(res.data.lotacao[0].idpat);
                setSet(res.data.lotacao[0].idset);
                setLotacao(dataFormatada(res.data.lotacao[0].lotacao));
                if(res.status==200){
                }else{
                    console.log("Houve um erro na requisição")
                }
            })
            .catch(function(error){
                console.log(error);
            });

         console.log(dados);
    }


    async function salvardados(e) {
        e.preventDefault();

        let index = 0;
        // alert("Louvado seja Deus. Aleluia!");

        if (idusu === 0) {
            setMsg("Campo usuário está vazio");
            index++;
        } else if (idemp === 0) {
            setMsg("Campo empresa está vazio");
            index++;
        } else if (idset === 0) {
            setMsg("Campo setor está vazio");
            index++;
        } else if (idpat === 0) {
            setMsg("Campo patrimônio está vazio");
            index++;
        }

        if (index === 0) {

            api.patch("lotacao",
                dados,

                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(function (response) {
                console.log(response.data);

                alert("Edição salva com sucesso!!");
                window.location.href = '/listalotacao';
            });
        }
    }


    return (
        <div className="dashboard-container">

            <Menu />

            <div className="principal">
                <Head title="Editar Lotação" />
                <section className="form-cadastro">
                    <form onSubmit={salvardados}>
                    <label>Empresa</label>
                        <select value={idemp} onChange={e => setIemp(e.target.value)}>

                            {empresa.map((emp) => {
                                return (
                                    <option value={emp.id}>{emp.nome}</option>
                                )
                            })
                            }
                        </select>

                        <label>Patrimônio</label>
                        <select value={idpat} onChange={e => setPat(e.target.value)}>

                            {patrimonio.map((pat) => {
                                return (
                                    <option value={pat.id}>{pat.nome}</option>
                                )
                            })}

                        </select>

                        <label>Setor</label>
                        <select value={idset} onChange={e => setSet(e.target.value)}>
                       
                            {setor.map((set) => {
                                return (

                                    <option value={set.id}>{set.nome}</option>
                                )
                            })}

                        </select>

                        <label>Usuario</label>
                        <select value={idusu} onChange={e => setIusu(e.target.value)}>
                        
                            {usuario.map((usu) => {
                                return (
                                    <option value={usu.id}>{usu.nome}</option>
                                )
                            })}

                        </select>
                        <label>Lotação </label>
                        <input type="date"
                            value={dataFormatada(lotacao)}
                            onChange={e => setLotacao(e.target.value)} />

                        <p>{msg}</p>
                        <button className="button_save" type="submit">
                            Salvar
                        </button>
                    </form>
                </section>      

            </div>
        </div>

    )
}