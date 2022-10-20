import React             from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logon             from "./pages/Logon";
import Dashboard         from "./pages/Logon/Dashboard";
import Cadatrousuario    from "./pages/cadastroUsuario";
import Cadatroempresa    from "./pages/cadastroEmpresa";
import Cadatropatrimonio from "./pages/cadastroPatrimonio";
import cadastrosetor     from "./pages/cadastroSetor";
import Editarusuario     from "./pages/Editarusuario";
import Editarempresa     from "./pages/Editarempresa";
import Editarpatrimonio  from "./pages/Editarpatrimonio";
import Editarsetor       from "./pages/Editarsetor";
import EditarLotacao from "./pages/Editarlotacao";
import Listausuarios     from "./pages/Listausuarios";
import Listaempresas     from "./pages/Listaempresas";
import Listapatrimonios  from "./pages/Listapatrimonios";
import Listasetor        from "./pages/Listasetor";
import Cadatrolotacao    from "./pages/cadastroLotacao";
import Listalotacao      from "./pages/Listalotacao"

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path = {"/"} exact component={Logon}/>
                <Route path = {"/dashboard"}                       component = {Dashboard}/>
                <Route path = {"/listausuarios"}                   component = {Listausuarios}/> 
                <Route path = {"/cadastrousuario"}                 component = {Cadatrousuario}/> 
                <Route path = {"/editarusuario/:idusuarios"}       component = {Editarusuario}/> 
                <Route path = {"/cadastroempresa"}                 component = {Cadatroempresa}/> 
                <Route path = {"/listaempresas"}                   component = {Listaempresas}/> 
                <Route path = {"/editarempresa/:idempresas"}       component = {Editarempresa}/> 
                <Route path = {"/cadastropatrimonio"}              component = {Cadatropatrimonio}/> 
                <Route path = {"/editarpatrimonio/:id"}            component = {Editarpatrimonio}/> 
                <Route path = {"/listapatrimonios"}                component = {Listapatrimonios}/> 
                <Route path = {"/listapatrimonios"}                component = {Listapatrimonios}/> 
                <Route path = {"/listasetor"}                      component = {Listasetor}/> 
                <Route path = {"/cadastroSetor"}                   component = {cadastrosetor}/> 
                <Route path = {"/editarsetor/:idsetor"}            component = {Editarsetor}/> 
                <Route path = {"/cadastrolotacao"}                 component = {Cadatrolotacao}/> 
                <Route path = {"/listalotacao"}                    component = {Listalotacao}/> 
                <Route path = {"/editarlotacao/:idlotacao"}        component = {EditarLotacao}/> 
                



            </Switch>
        </BrowserRouter>
    )
}