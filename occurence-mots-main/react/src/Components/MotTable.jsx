import {TableRow} from "./TableRow.jsx";

export function MotTable({listeMots}) {
    const rows = []

    for (let mot of listeMots) {
        rows.push(<TableRow mot={mot} key={mot.nom}/>)
    }

    return <table className="table table-hover text-center">
        <thead>
        <tr>
            <th><h4>Nom du mot</h4></th>
            <th><h4>Nombre d'occurrence</h4></th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}