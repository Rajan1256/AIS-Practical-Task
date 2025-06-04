import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = ({ onEditEmployee, refreshTrigger }) => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const [filters, setFilters] = useState({
        department_id: '',
        state_id: '',
        city_id: '',
        active: ''
    });

    useEffect(() => {
        Promise.all([
            axios.get('/api/departments'),
            axios.get('/api/states'),
            axios.get('/api/cities')
        ])
        .then(([deptResponse, stateResponse, cityResponse]) => {
            setDepartments(deptResponse.data);
            setStates(stateResponse.data);
            setCities(cityResponse.data);
        })
        .catch(error => console.error(error));
        fetchEmployees();
    }, [refreshTrigger]);

    useEffect(() => {
        fetchEmployees();
    }, [filters, pagination.current_page]);

    const fetchEmployees = () => {
        setLoading(true);


        const params = { page: pagination.current_page };

        if (filters.department_id) params.department_id = filters.department_id;
        if (filters.state_id) params.state_id = filters.state_id;
        if (filters.city_id) params.city_id = filters.city_id;
        if (filters.active !== '') params.active = filters.active;

        axios.get('/api/employees', { params })
            .then(response => {
                setEmployees(response.data.data);
                setPagination({
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    per_page: response.data.per_page,
                    total: response.data.total
                });
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'state_id' && filters.city_id && value !== filters.state_id) {
            setFilters({
                ...filters,
                [name]: value,
                city_id: ''
            });
        } else {
            setFilters({
                ...filters,
                [name]: value
            });
        }

        setPagination({
            ...pagination,
            current_page: 1
        });
    };

    const handlePageChange = (page) => {
        setPagination({
            ...pagination,
            current_page: page
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axios.delete(`/api/employees/${id}`)
                .then(() => {
                    fetchEmployees();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleEdit = (employee) => {
        onEditEmployee(employee);
        navigate(`/edit-employee/${employee.id}`);
    };

    const filteredCities = filters.state_id
        ? cities.filter(city => city.state_id === parseInt(filters.state_id))
        : cities;

    return (
        <div className="card">
            <div className="card-header">Employee List</div>
            <div className="card-body">
                <div className="row mb-4">
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            name="department_id"
                            value={filters.department_id}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            name="state_id"
                            value={filters.state_id}
                            onChange={handleFilterChange}
                        >
                            <option value="">All States</option>
                            {states.map(state => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            name="city_id"
                            value={filters.city_id}
                            onChange={handleFilterChange}
                            disabled={!filters.state_id}
                        >
                            <option value="">All Cities</option>
                            {filteredCities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            name="active"
                            value={filters.active}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                </div>


                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Department</th>
                                        <th>Location</th>
                                        <th>Salary</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.length > 0 ? (
                                        employees.map(employee => (
                                            <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>{employee.first_name} {employee.last_name}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.phone}</td>
                                                <td>{employee.department?.name}</td>
                                                <td>{employee.city?.name}, {employee.state?.name}</td>
                                                <td>{employee.salary}</td>
                                                <td>
                                                    <span className={`badge ${employee.active ? 'bg-success' : 'bg-danger'}`}>
                                                        {employee.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary me-1"
                                                        onClick={() => handleEdit(employee)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(employee.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">No employees found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>


                        {pagination.last_page > 1 && (
                            <nav>
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(pagination.current_page - 1)}
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {[...Array(pagination.last_page).keys()].map(page => (
                                        <li
                                            key={page + 1}
                                            className={`page-item ${pagination.current_page === page + 1 ? 'active' : ''}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(page + 1)}
                                            >
                                                {page + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(pagination.current_page + 1)}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;

if (document.getElementById('employee-list')) {
    const root = ReactDOM.createRoot(document.getElementById('employee-list'));
    root.render(<EmployeeList />);
}

