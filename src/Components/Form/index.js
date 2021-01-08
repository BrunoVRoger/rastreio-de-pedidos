import React, {useState} from 'react';
import './style.css';
import {FaSearch} from 'react-icons/fa';
import { render } from '@testing-library/react';

const Form = () => {
const [end, setEnd] = useState([]);
const [search, setSearch] = useState([]);
const [error, setError] = useState(false);
const [strack, setTrack] = useState(true);
const [hasit, setHasLoaded] = useState(false);
const [showtd, setTable] = useState(false)

    const onChangeHandler = event => {
        setSearch(event.target.value)
        console.log(event.target.value)
    }

    console.log(search)

    const handlerSubmit = async event => {
        event.preventDefault();
            /* Puxa a API do codigo de rastreio */
            fetch(`https://api.linketrack.com/track/json?user=matheus.g.moreli@gmail.com&token=39fed9f9a76882a1a1cba109fd62dfaacdf426066b6b9166cad6f0ad00c9f52c&codigo=${search}`)

            /* Passa os resultados para JSON */
            .then(trackResult => trackResult.json())
            
            /* Joga os resultados para o setData*/
            .then(data => {

                /* Define que o valor final vem de Data e que não houve erros. */
                setEnd(data)
                setHasLoaded(true)
                
                setError(false)
                setTrack(false)

                setTable(true)

                console.log(data)

            }).catch(err => {
                setError(true)
                console.log('Erro!') 
            })
    }

    console.log(end)
    
        return (
            <div>
                <form className="search_bar">

                    <input 
                        type="text" 
                        id="pesquisa" 
                        placeholder="código de rastreio"
                        value = {search}
                        onChange = {onChangeHandler}
                        styles="text-transform:uppercase" 
                        >   
                    </input>

                    <button 
                        type="submit" 
                        onClick={handlerSubmit}
                    > 
                    <FaSearch size="20"></FaSearch>
                    
                    </button>

                </form>

                <div className="div-span">
                    <span className={error === false ? 'dontshow' : 'show'}>
                    Código de rastreio inválido. 
                    </span>
                </div>

                {/* Renderizando dados no Front-End. */}
                <br />
                {/* -- */}
                <div>
                    <span className = {hasit === true ? 'show_info' : 'dontshow_info'}>
                       <h4> Código de rastreio: </h4> 
                       {end.codigo}
                    </span> 
                </div>
                {/* -- */}
                <br />
                {/* -- */}
                <div>

                    <span className = {hasit === true ? 'show_info' : 'dontshow_info'}>
                        <h4> Status atual do pedido: </h4>
                        {hasit === true ? end.eventos[0].status : error}<br />
                    </span> 

                    <br />  

                    <span className = {hasit === true ? 'show_info' : 'dontshow_info'}>
                         <h4>
                            Histórico: 
                         </h4>
                    </span>
                    <br />

                    <table className="table">
                        
                        <thead>
                        <tr bgcolor="black">
                                <th>Data</th>
                                <th>Local</th>
                                <th>Hora</th>
                                <th>Status</th>
                                <th>Origem e Destino</th>
                                
                            </tr>    
                            </thead>

                    {hasit === true ? end.eventos.map(item => { 
                        {console.log(hasit)}
                            
                        return (

                            <tbody>
                            <tr className="info">
                                <td>{item.data}</td>
                                <td>{item.local}</td>
                                <td>{item.hora}</td>
                                <td>{item.status}</td>
                                <td>{item.subStatus[0]} <br /> {item.subStatus[1]}</td>
                            </tr>
                            </tbody>

                        )

                        }) : error }

                        </table>

                </div>
                
            </div>
    )
    }

   
export default Form;

{/* <table>
                            <tr>
                                <br /> 
                                <td>
                                {item.data} <br />  {item.hora} <br />  {item.local}
                                <br /> 
                                {item.status} <br /> <span> {item.subStatus} </span> <br /> 
                                <br /> 
                                </td>
                            </tr>
                        </table> */}