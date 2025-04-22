import React, {useState, useEffect} from "react";
import {Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Legend} from "chart.js";
import {Line} from "react-chartjs-2";
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Legend);
import styles from "./BudgettingContainer.module.css";

function BudgettingContainer({data}) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [checkingAmount, setCheckingAmount] = useState(0);
    const [savingsAmount, setSavingsAmount] = useState(0);
    const [timeSpan, setTimeSpan] = useState(6);
    const [percentToSavings, setPercentToSavings] = useState(10);


    const [incomeData, expensesData, oneTimeIncomeData, oneTimeExpensesData] = data;
    const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = expensesData.reduce((acc, item) => acc + item.amount, 0);
    const netMonthlyIncome = totalIncome - totalExpenses;


    const [checkingGraphData, setCheckingGraphData] = useState([]);
    const [savingsGraphData, setSavingsGraphData] = useState([]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        const numericValue = parseFloat(value);
        if (name === "checkingAmount") {
            setCheckingAmount(numericValue);
            console.log(checkingAmount);
        } else if (name === "savingsAmount") {
            setSavingsAmount(numericValue);
        } else if (name === "timeSpan") {
            setTimeSpan(numericValue);
        } else if (name === "percentToSavings") {
            setPercentToSavings(numericValue);
        }
    }


    //Graph
    useEffect(() => {
        const newCheckingGraphData = Array.from({ length: timeSpan }, (_, i) => {
            return checkingAmount + Math.round((netMonthlyIncome * ((100 - percentToSavings) / 100) * i));
        });

        const newSavingsGraphData = Array.from({ length: timeSpan }, (_, i) => {
            return savingsAmount + Math.round((netMonthlyIncome * (percentToSavings / 100) * i));
        });

        setCheckingGraphData(newCheckingGraphData);
        setSavingsGraphData(newSavingsGraphData);
        
    }, [checkingAmount, savingsAmount, timeSpan, percentToSavings, netMonthlyIncome]);


    const lineData = {
        labels: months.slice(0, timeSpan),
        datasets: [{
            label: 'Checking',
            data: checkingGraphData,
            borderColor: "#40e0d0",
            borderWidth: 5,
            pointBorderWidth: 0,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        },
        {
            label: 'Savings',
            data: savingsGraphData,
            borderColor: "#FF7F50",
            borderWidth: 5,
            pointBorderWidth: 0,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }]
    }

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: "white", // Legend text color
                    boxWidth: 20,
                    boxHeight: 10,
                    padding: 20,
                    font: {
                        size: 24,
                        weight: "bold",
                        family: "Arial",
                    },
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "white", // X-axis label color
                    font: {
                        size: 16,
                        weight: "bold",
                        family: "Arial",
                    }
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)" // X-axis grid line color
                }
            },
            y: {
                ticks: {
                    color: "white",
                    font: {
                        size: 16,
                        weight: "bold",
                        family: "Arial",
                    } // Y-axis label color
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)" // Y-axis grid line color
                }
            }
        }
    };

    return (<>
        <div className={styles.BudgettingContainer}>
            <h2 className={styles.Header2}>Budgetting</h2>
            <div className={styles.InputContainer}>
                <div>
                    <label htmlFor="checkingAmount">Checking Amount:</label>
                    <input min="0" type="number" id="checkingAmount" name="checkingAmount" value={checkingAmount} onChange={handleChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="savingsAmount">Savings Amount:</label>
                    <input min="0" type="number" id="savingsAmount" name="savingsAmount" value={savingsAmount} onChange={handleChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="timeSpan">Time Span (months):</label>
                    <input min="1" max="12" type="number" id="timeSpan" name="timeSpan" value={timeSpan} onChange={handleChange} autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="percentToSavings">Percent to Savings:</label>
                    <input min="0" max="100" type="number" id="percentToSavings" name="percentToSavings" value={percentToSavings} onChange={handleChange} autoComplete="off"/>
                </div>
            </div>
            <div className={styles.GraphContainer}>
                <Line data={lineData} options={lineOptions}/>
            </div>
        </div>
    </>)
}

export default BudgettingContainer;