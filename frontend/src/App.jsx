import {useState, useEffect } from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router";
import ProtectedRoute from './Protection';
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

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchAPI = async () => {
    try {
      const financialDataResponse = await axios.get("http://localhost:5000/api/financial-data");
      setIncomeData(financialDataResponse.data.filter(item => item.type === "Income"));
      setExpensesData(financialDataResponse.data.filter(item => item.type === "Expenses"));
    } catch(error) {
      console.error("Error fetching data from API", error);
    } 
  }

  useEffect(() => {
    console.log("Checking authentication status...");
    checkAuthStatus();
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/status");
      setUser(response.data.user);
      setIsAuthenticated(response.data.isAuthenticated);
      console.log("User authenticated:", response.data.isAuthenticated);
      if (response.data.isAuthenticated && window.location.pathname === "/login" || window.location.pathname === "/register") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking authentication status", error);
    } finally {
      console.log("Authentication check complete");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
          console.log("User is not authenticated, redirecting to login...");
          navigate("/login");
        }
      } else {
        console.log("User is authenticated, fetching data...");
        fetchAPI();
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <div className={styles.App}>Loading...</div>
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login fetch={fetchAPI} setUser={setUser} setAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={<Register authenticated={isAuthenticated} setAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Income
                data={{ incomeData, oneTimeIncomeData }}
                setData={{ setIncomeData, setOneTimeIncomeData }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Expenses
                data={{ expensesData, oneTimeExpensesData }}
                setData={{ setExpensesData, setOneTimeExpensesData }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgetting"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Budgetting data={[incomeData, expensesData, oneTimeIncomeData, oneTimeExpensesData]} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </>
    )
}

export default App
