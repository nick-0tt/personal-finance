import React from "react";
import EditPencil from "./EditPencil";
import TrashCan from "./TrashCan";

function ListedAmount({source, category, amount, onEditHandler, onDeleteHandler}) {
    return (
        <tr>
            <td>{source}</td>
            <td>{category}</td>
            <td>${amount}</td>
            <td>
                <div style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
                    <EditPencil height="100%" width="15%" onClickHandler={onEditHandler}/>
                    <TrashCan height="100%" width="15%" onClickHandler={onDeleteHandler}/>
                </div>
            </td>
        </tr>
    )    
}

export default ListedAmount;