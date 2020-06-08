import React from "react";

function EmployeeInfo(props){
    return(
        <tr>
            <td>{props.lastName}</td>
            <td>{props.firstName}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <th scope ="row"><img alt={props.lastName} src={props.picture} /> </th>
        </tr>
    );
}

export default EmployeeInfo;