import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function CreateRole() { // Extracting the 'id' parameter
    const navigate = useNavigate(); // Create an instance of useNavigate

    const [role, setRole] = useState([]);
    const [privilege, setPrivilege] = useState([]);
    const [checkedPrivileges, setCheckedPrivileges] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Function to get the token from local storage
    const getToken = () => {
        return localStorage.getItem("token");
    };
    const decodedToken = jwtDecode(getToken());

    const fetchPrivilege = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://localhost:7240/api/privilege`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
                    },
                }
            );
            setPrivilege(response.data); // Update the state with the received data
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrivilege();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                `https://localhost:7240/api/role`,
                role,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
                    },
                }
            );
            console.log(response.data);

            for (const checkedPrivilege of checkedPrivileges) {
                const rolePrivilegeData = {
                    roleId: response.data.id,
                    privilegeId: checkedPrivilege.privilegeId,
                    createdOn: new Date().toISOString(),
                    createdBy: "",
                    deleted: false
                };
                console.log(checkedPrivilege);

                if (checkedPrivilege.checked) {
                    // If checked, create or update the role privilege
                    console.log(rolePrivilegeData);
                    await axios.post(
                        'https://localhost:7240/api/roleprivilege',
                        rolePrivilegeData,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    );
                }
            }

            // Redirect to the desired page after successfully updating
            navigate("/role"); // Update this with the correct path
        } catch (error) {
            console.error(error);
            setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Map privileges array to create an array of objects with roleId and privilegeId
        const initialCheckedPrivileges = privilege.map((item) => ({
            privilegeId: item.id,
            checked: false,
        }));

        setCheckedPrivileges(initialCheckedPrivileges);
    }, [privilege]);

    useEffect(() => {
        if (!decodedToken["Create Role"]) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <AppLayout>
            <h2 className="page-title">Create Role</h2>
            <div className="card mt-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the brand name"
                                value={role.roleName}
                                onChange={(e) => setRole({ ...role, roleName: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Privilige</label>
                        </div>


                        <div className="checkbox-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {privilege.map((item) => (
                                <div key={item.id} className="mb-3" style={{ flexBasis: '50%', boxSizing: 'border-box' }}>
                                    <input type="checkbox"
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setCheckedPrivileges((prevCheckedPrivileges) =>
                                                prevCheckedPrivileges.map((cp) =>
                                                    cp.privilegeId === item.id ? { ...cp, checked: isChecked } : cp
                                                )
                                            );
                                        }}
                                        checked={checkedPrivileges.some((cp) => cp.privilegeId === item.id && cp.checked)} />
                                    <span> {item.privilegeName} </span>
                                </div>
                            ))}
                        </div>




                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div className="mb-3">
                                <input type="submit" value="Save" className="btn btn-green" />
                            </div>
                            <div className="mb-3">
                                <Link to="/role" className="btn btn-red">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

export default CreateRole;
