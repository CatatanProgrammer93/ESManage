import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function EditRole() {
  const { id } = useParams(); // Extracting the 'id' parameter
  const navigate = useNavigate(); // Create an instance of useNavigate

  const [role, setRole] = useState([]);
  const [rolePrivileges, setRolePrivileges] = useState([]);
  const [privilege, setPrivilege] = useState([]);
  const [checkedPrivileges, setCheckedPrivileges] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchRolePrivilege = async () => {
    setIsLoading(true);
    try{
        const response = await axios.get(
            `https://localhost:7240/api/roleprivilege/roleid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Include the token from local storage
            },
          }
        );

        setRolePrivileges(response.data); // Update the state with the received data
        console.log(response.data);
    }
    catch (error){
        console.error(error);
    }
    finally{
        setIsLoading(false);
    }
  };


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7240/api/role/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );
        setRole(response.data); // Update the state with the received data
        console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPrivilege = async () => {
    setIsLoading(true);
    try{
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
    catch (error){
        console.error(error);
    }
    finally{
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPrivilege();
    fetchRolePrivilege();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://localhost:7240/api/role/${id}`,
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
            roleId: id,
            privilegeId: checkedPrivilege.privilegeId,
            createdOn: new Date().toISOString(),
            createdBy: "",
            deleted: false
          };
        
          const existingRolePrivilege = rolePrivileges.find(
            (rp) =>
              rp.roleId === rolePrivilegeData.roleId &&
              rp.privilegeId === rolePrivilegeData.privilegeId
          );
        
          const exists = !!existingRolePrivilege;
        
          if (checkedPrivilege.checked) {
            // If checked, create or update the role privilege
            if (exists) {
               
            } else {
              // If not exists, create a new role privilege
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
          } else {
            // If unchecked, "soft delete" the role privilege by updating the 'deleted' field
            if (exists) {
                const roleIdToDelete = existingRolePrivilege.id;
              const updatedRolePrivilege = { ...existingRolePrivilege, deleted: true };
              await axios.put(
                `https://localhost:7240/api/roleprivilege/${roleIdToDelete}`,
                updatedRolePrivilege,
                {
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                  },
                }
              );
            }
          }
      }
      
      
  

      // Redirect to the desired page after successfully updating
      navigate("/dashboard"); // Update this with the correct path
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
      roleId: id,
      privilegeId: item.id,
      checked: rolePrivileges.some((rp) => rp.privilegeId === item.id),
    }));

    setCheckedPrivileges(initialCheckedPrivileges);
  }, [privilege, id]);


  return (
    <AppLayout>
        <h2 className="page-title">Edit Role</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the ID"
                value={role.id}
                onChange={(e) => setRole({ ...role, id: e.target.value })}
                disabled
              />
            </div>
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
         {privilege.map((item) =>  (
            <div className="mb-3" style={{ flexBasis: '50%', boxSizing: 'border-box' }}>
                <input type = "checkbox" 
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
                    <Link to="/brand" className="btn btn-red">
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

export default EditRole;
