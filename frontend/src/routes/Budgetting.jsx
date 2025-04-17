import React from 'react';
import styles from '../App.module.css';
import Navbar from '../components/Navbar';
import BudgettingContainer from '../containers/BudgettingContainer';

function Budgetting({data}) {
    const [incomeData, expensesData] = data;
    const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = expensesData.reduce((acc, item) => acc + item.amount, 0);
    const budget = totalIncome - totalExpenses;

    return (<>
        <Navbar/>
        <div className={styles.App}>
            <BudgettingContainer data={data}/>
        </div>
        </>
    );
}

export default Budgetting;