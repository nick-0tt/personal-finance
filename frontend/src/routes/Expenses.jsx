import React, {useState, useEffect } from 'react';
import styles from '../App.module.css';
import Navbar from '../components/Navbar';
import FinanceContainer from '../containers/FinanceContainer';

function Expenses({data, setData}) {
    const {expensesData, oneTimeExpensesData} = data;
    const {setExpensesData, setOneTimeExpensesData} = setData;
    
    return (<>
            <Navbar/>
            <div className={styles.App}>
                <FinanceContainer monthlyData={expensesData} setMonthlyData={setExpensesData} oneTimeData={oneTimeExpensesData} setOneTimeData={setOneTimeExpensesData} url={"http://localhost:5000/api/financial-data"} type={"Expenses"}/>
            </div>
        </>
    )
}

export default Expenses;