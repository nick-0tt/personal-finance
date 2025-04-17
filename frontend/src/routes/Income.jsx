import React, {useState, useEffect } from 'react';
import styles from '../App.module.css';
import Navbar from '../components/Navbar';
import FinanceContainer from '../containers/FinanceContainer';

function Income({data, setData}) {
    const {incomeData, oneTimeIncomeData} = data;
    const {setIncomeData, setOneTimeIncomeData} = setData;
    
    return (<>
            <Navbar/>
            <div className={styles.App}>
                <FinanceContainer monthlyData={incomeData} setMonthlyData={setIncomeData} oneTimeData={oneTimeIncomeData} setOneTimeData={setOneTimeIncomeData} url="http://localhost:5000/api/income" type={"Income"}/>
            </div>
        </>
    )
}

export default Income;