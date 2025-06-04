import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = ({ onEmployeeAdded, editingEmployee }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const defaultFormData = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department_id: '',
        state_id: '',
        city_id: '',
        salary: '',
        active: true
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [departments, setDepartments] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {

        axios.get('/api/departments')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));


        axios.get('/api/states')
            .then(response => setStates(response.data))
            .catch(error => console.error('Error fetching states:', error));
    }, []);


    useEffect(() => {
        if (editingEmployee) {
            setIsEditing(true);
            setFormData({
                first_name: editingEmployee.first_name,
                last_name: editingEmployee.last_name,
                email: editingEmployee.email,
                phone: editingEmployee.phone,
                department_id: editingEmployee.department_id.toString(),
                state_id: editingEmployee.state_id.toString(),
                city_id: editingEmployee.city_id.toString(),
                salary: editingEmployee.salary.toString(),
                active: editingEmployee.active
            });
        } else {
            setIsEditing(false);
            setFormData(defaultFormData);
        }
    }, [editingEmployee]);


    useEffect(() => {
        if (formData.state_id) {
            axios.get(`/api/states/${formData.state_id}/cities`)
                .then(response => setCities(response.data))
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            setCities([]);
        }
    }, [formData.state_id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const resetForm = () => {
        setFormData(defaultFormData);
        setErrors({});
        setIsEditing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiCall = isEditing
            ? axios.put(`/api/employees/${editingEmployee.id}`, formData)
            : axios.post('/api/employees', formData);

        apiCall
            .then(response => {
                resetForm();
                setIsSubmitting(false);

                if (onEmployeeAdded) {
                    onEmployeeAdded(response.data);
                }
                navigate('/');
            })
            .catch(error => {
                setIsSubmitting(false);
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="card">
            <div className="card-header">
                {isEditing ? 'Edit Employee' : 'Register New Employee'}
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            {errors.first_name && <div className="invalid-feedback">{errors.first_name[0]}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            {errors.last_name && <div className="invalid-feedback">{errors.last_name[0]}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Department</label>
                            <select
                                className={`form-select ${errors.department_id ? 'is-invalid' : ''}`}
                                name="department_id"
                                value={formData.department_id}
                                onChange={handleChange}
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                            {errors.department_id && <div className="invalid-feedback">{errors.department_id[0]}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">State</label>
                            <select
                                className={`form-select ${errors.state_id ? 'is-invalid' : ''}`}
                                name="state_id"
                                value={formData.state_id}
                                onChange={handleChange}
                            >
                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                            {errors.state_id && <div className="invalid-feedback">{errors.state_id[0]}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">City</label>
                            <select
                                className={`form-select ${errors.city_id ? 'is-invalid' : ''}`}
                                name="city_id"
                                value={formData.city_id}
                                onChange={handleChange}
                                disabled={!formData.state_id}
                            >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                            {errors.city_id && <div className="invalid-feedback">{errors.city_id[0]}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Salary</label>
                            <input
                                type="number"
                                className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                            />
                            {errors.salary && <div className="invalid-feedback">{errors.salary[0]}</div>}
                        </div>
                        <div className="col-md-6">
                            <div className="form-check mt-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Active</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;



