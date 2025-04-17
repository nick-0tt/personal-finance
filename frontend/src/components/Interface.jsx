import React, {useState} from "react";
import styles from "./Interface.module.css"


function Interface({submitHandler, onCloseClick, categories, defaultValue}) {
    const [formState, setFormState] = useState(
        defaultValue || {
        source: "",
        category: "",
        amount: ""
    });

    const handleChange = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    return (
        <div id="interface-container" className={styles.interfaceContainer} onClick={onCloseClick}>
            <div id="interface" className={styles.interface}>
                <form onSubmit={submitHandler} autoComplete="off">
                    <label htmlFor="source">Source</label>
                    <input required onChange={handleChange} value={formState.source} type="text" id="source" name="source" autocomplete="off"></input>

                    <label htmlFor="category">Category</label>
                    <select onChange={handleChange} value={formState.category} required id="category" name="category">
                        {categories().map((category) => {
                            return <option key={category} value={category}>{category}</option>
                        })}
                    </select>

                    <label htmlFor="amount">Amount</label>
                    <input onChange={handleChange} value={formState.amount} required type="number" id="amount" name="amount" autocomplete="off"></input>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Interface;