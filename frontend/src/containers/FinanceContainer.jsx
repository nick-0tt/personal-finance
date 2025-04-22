import React, {useState} from "react";
import axios from "axios";
import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip);
import ListedAmount from "../components/ListedAmount";
import Interface from "../components/Interface";
import styles from "./FinanceContainer.module.css"
import GridPiece from "../components/GridPiece";



function FinanceContainer({monthlyData, oneTimeData, setMonthlyData, setOneTimeData, url, type}) {

    const [interfaceOpen, setInterfaceOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);

    const categories = function() {
        if (type === "Income") {
            return ["Salary", "Investment", "Other"];
        } else if (type === "Expenses") {
            return ["Housing", "Food", "Transportation", "Entertainment", "Shopping", "Personal Care", "Pets", "Childcare", "Other"];
        };
    }

    const addHandler = () => {
        setInterfaceOpen(true);
    }

    const closeHandler = (e) => {
        if (e.target.id === "interface-container") {
            setInterfaceOpen(false);
            setRowToEdit(null);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const source = e.target.source.value;
        const category = e.target.category.value;
        const amount = parseInt(e.target.amount.value);

        if (rowToEdit === null) {
            await axios.post(url, {source, type, category, amount});
            setMonthlyData((prev) => [...prev, {source, type, category, amount}]);
            setInterfaceOpen(false);
        } else {
            const existingItem = monthlyData[rowToEdit];
            const updatedItem = {...existingItem, source, type, category, amount};
            
            await axios.put(url, {id: monthlyData[rowToEdit]._id, newData: updatedItem});
            
            const updatedData = monthlyData.map((item, index) => {
                if (index === rowToEdit) {
                    return updatedItem;
                }
                return item;
            });
            
            setMonthlyData(updatedData);
            setRowToEdit(null);
            setInterfaceOpen(false);
        }
    }

    const onPencilClickHandler = (index) => {
        setRowToEdit(index);
        setInterfaceOpen(true);
    }

    const onDeleteHandler = async (index) => {
        await axios.delete(url, {data: {id: monthlyData[index]._id}});
        console.log("DELETE request sent");
        setMonthlyData(monthlyData.filter((_, i) => i !== index));
    }

    const pieData = {
        labels: categories().map((category) => category),
        datasets: [
            {
                label: type,
                data: categories().map((category) => {
                    return monthlyData.filter((item) => item.category === category).reduce((acc, curr) => acc + parseInt(curr.amount), 0);
                }),
                backgroundColor: [
                    "#d53e4f",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#ffffbf",
                    "#e6f598",
                    "#abdda4",
                    "#66c2a5",
                    "#3288bd",
                ],
                
                borderWidth: 1,
            }
        ]
    }

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const [editing, setEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleOneTimeSubmit = async (e) => {
        e.preventDefault();
        const source = e.target.source.value;
        const amount = parseInt(e.target.amount.value);

        if (editingIndex === null) {
            //await axios.post(url, {source, amount});
            setOneTimeData((prev) => [...prev, {source, amount}]);
        } else {
            console.log("PUT request sent");
            console.log({index: editingIndex, newData: {source, amount}})
            //await axios.put(url, {index: editingIndex, newData: {source, amount}});
            console.log("PUT request sent");
            const updatedData = oneTimeData.map((item, index) => {
                if (index === editingIndex) {
                    return {source, amount};
                }
                return item;
            });
            setOneTimeData(updatedData);
            setEditing(false);
            setEditingIndex(null);
        }
    }

    const addGridPieceHandler = () => {
        console.log("Add grid piece handler");
        setOneTimeData((prev) => [...prev, {source: "", amount: ""}]);
        console.log(oneTimeData);
        handleOneTimeEdit(oneTimeData.length);
    }

    const handleOneTimeEdit = (index) => {
        setEditingIndex(index);
    }

    const handleOneTimeDelete = async (index) => {
        //await axios.delete(url, {data: {index}});
        setOneTimeData(oneTimeData.filter((_, i) => i !== index));
    }

    return (
        <>
        <div className={styles.FinanceContainer}>
            <h2 className={styles.Header2}>{`Monthly ${type}`}</h2>
            <span className={styles.LineSpan}></span>
                <div className={styles.FinanceTableContainer}>
                    <table className={styles.FinanceTable}> 
                        <thead>
                            <tr>
                                <th>Source</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map(({source, amount, category}, index) => {
                                return <ListedAmount key={index} index={index} onDeleteHandler={()=> onDeleteHandler(index)} onEditHandler={() => onPencilClickHandler(index)} source={source} amount={amount} category={category}/>
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td>${monthlyData.reduce((acc, curr) => acc + parseInt(curr.amount), 0)}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <button className={styles.AddButton} onClick={addHandler}>Add</button>
                </div>
                <div className={styles.PieContainer}>
                    <Pie data={pieData} options={pieOptions}/>
                </div>
            
            
            <span className={styles.LineSpan}></span>

            <h2 className={styles.Header2}>{`One Time ${type}`}</h2>
            
            <div className={styles.OneTimeContainer}>
                <div className={styles.GridContainer}>
                    {oneTimeData.map(({source, amount}, index) => {
                        return <GridPiece defaultValue={editingIndex !== null && oneTimeData[editingIndex]} editingIndex={editingIndex} handleSubmit={handleOneTimeSubmit} handleEdit={() => handleOneTimeEdit(index)} handleDelete={() => handleOneTimeDelete(index)} index={index} key={index} source={source} amount={amount}/>
                    })}
                    <div className={styles.GridAdd}>
                        <div onClick={addGridPieceHandler}>+</div>
                    </div>
                </div>
            </div>

            
            
        </div>
        {interfaceOpen && <Interface defaultValue={rowToEdit !== null && monthlyData[rowToEdit]} onCloseClick={closeHandler} submitHandler={submitHandler} type={type} categories={categories}/>}
        
        </>
    )
}

export default FinanceContainer;