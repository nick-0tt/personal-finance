import {useState, useEffect } from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router";
import styles from "./App.module.css"
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Income from './routes/Income';
import Expenses from './routes/Expenses';
import Budgetting from './routes/Budgetting';
import Register from './routes/Register';

axios.defaults.withCredentials = true;

function App() {
  const [incomeData, setIncomeData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [oneTimeIncomeData, setOneTimeIncomeData] = useState([]);
  const [oneTimeExpensesData, setOneTimeExpensesData] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/status");
      setUser(response.data.user);
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error("Error checking authentication status", error);
    } finally {
      
      setLoading(false);
    }
  }

  const fetchAPI = async () => {
    try {
      const incomeResponse = await axios.get("http://localhost:5000/api/income");
      const expensesResponse = await axios.get("http://localhost:5000/api/expenses");
      setIncomeData(incomeResponse.data);
      setExpensesData(expensesResponse.data);
      //setOneTimeIncomeData(incomeResponse.data.oneTimeIncomeData);
      //setOneTimeExpensesData(expensesResponse.data.oneTimeExpensesData);
    } catch(error) {
      console.error("Error fetching data from API", error);
    }
  }

  useEffect(() => {
      console.log("Checking authentication status...");
      checkAuthStatus();
  }, [])

  useEffect(() => {
    if (isAuthenticated === false && !user && loading === false) {
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        console.log("User is not authenticated, redirecting to login...");
        navigate("/login");
      }
    } else if (isAuthenticated && user && loading === false) {
      console.log("User is authenticated");
      console.log("Fetching data from API...");
      fetchAPI();
    } else {
      console.log("User is not authenticated");
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div className={styles.App}>Loading...</div>
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Login authenticated={isAuthenticated} setUser={setUser} setAuthenticated={setIsAuthenticated}/>}/>
      <Route path="/login" element={<Login authenticated={isAuthenticated} setUser={setUser} setAuthenticated={setIsAuthenticated}/>} />
      <Route path="/register" element={<Register authenticated={isAuthenticated} setAuthenticated={setIsAuthenticated}/>} />
      <Route path="/income" element={<Income data={{incomeData, oneTimeIncomeData}} setData={{setIncomeData, setOneTimeIncomeData}}/>} />
      <Route path="/expenses" element={<Expenses data={{expensesData, oneTimeExpensesData}} setData={{setExpensesData, setOneTimeExpensesData}}/>} />
      <Route path="/budgetting" element={<Budgetting data={[incomeData, expensesData, oneTimeIncomeData, oneTimeExpensesData]}/>} />
      <Route path="/dashboard" element={<Dashboard user={user}/>} />
    </Routes>
      
    </>
    )
}

export default App
