import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const handleEmployeeAdded = () => {
        setRefreshTrigger(prev => prev + 1);
        setEditingEmployee(null);
    };

    const handleEditEmployee = (employee) => {
        setEditingEmployee(employee);
    };

    return (
        <BrowserRouter>
            <div className="container py-4">
                <header className="mb-4">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Employee Management</Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Employee List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add-employee">Add Employee</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={
                            <EmployeeList
                                onEditEmployee={handleEditEmployee}
                                refreshTrigger={refreshTrigger}
                            />
                        } />
                        <Route path="/add-employee" element={
                            <EmployeeForm
                                onEmployeeAdded={handleEmployeeAdded}
                                editingEmployee={editingEmployee}
                            />
                        } />
                        <Route path="/edit-employee/:id" element={
                            <EmployeeForm
                                onEmployeeAdded={handleEmployeeAdded}
                                editingEmployee={editingEmployee}
                            />
                        } />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(<App />);
}
