import {canalSocket, config} from "./config.js";
import {useEffect, useState} from "react";
import {MotTable} from "./Components/MotTable.jsx";


const App = () => {
    const [response, setResponse] = useState([])

    useEffect(() => {

        const listener = (data) => {
            const mot = {}
            const [key] = Object.entries(JSON.parse(data))
            mot.nom = key[0]
            mot.nombre = Number(key[1])

            const filtre = response.filter((unObj) => mot.nom !== unObj.nom)
            setResponse([...filtre, mot].sort((a, b) => {
                return b.nombre - a.nombre
            }))
        }

        config.on(canalSocket, listener)

        return () => {
            config.off(canalSocket, null)
        }
    }, [response])

    return (
        <>
            <div className="container">
                <div className={"text-capitalize h1 my-3  text-center text-success"}>
                    Occurrence des mots
                </div>
                <div className={'main'}>
                    <MotTable listeMots={response}/>
                </div>
            </div>
        </>
    )
}

export default App;
