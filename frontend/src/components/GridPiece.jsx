import React, {useState, useEffect} from "react";
import styles from "./GridPiece.module.css";
import EditPencil from "./EditPencil";
import TrashCan from "./TrashCan";


function GridPiece({source, amount, index, editingIndex, handleSubmit, handleDelete, handleEdit, defaultValue }) {
    const [formState, setFormState] = useState(
        {
            source: "",
            amount: ""
        }
    );

    useEffect(() => {
        if (defaultValue) {
            setFormState(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    return (<>
        <div className={styles.GridPiece}>
            {editingIndex === index ? (
                <form onSubmit={handleSubmit} className={styles.GridPieceForm}>
                    <div>
                    <label htmlFor="source">Source</label>
                    <input required onChange={handleChange} value={formState.source} type="text" id="source" name="source"></input>
                    </div>

                    <div>
                    <label htmlFor="amount">Amount</label>
                    <input onChange={handleChange} value={formState.amount} required type="number" id="amount" name="amount"></input>
                    </div>

                    <div className={styles.GridPieceFormControls}>
                        <button type="submit">Submit</button> 
                        <TrashCan height="100%" width="15%" onClickHandler={handleDelete}/>
                    </div>
                </form>) : (<>
                <div className={styles.GridTextContainer}>
                    <div className={styles.GridInset}>
                        <h2>{source}</h2>
                        <p>${amount}</p>
                        <div className={styles.GridPieceControls}>
                            <EditPencil height="100%" width="15%" onClickHandler={handleEdit}/>
                            <TrashCan height="100%" width="15%" onClickHandler={handleDelete}/>
                        </div>
                    </div>
                </div>
            </>)}
        </div>
        </>) 
            
        
}

export default GridPiece;