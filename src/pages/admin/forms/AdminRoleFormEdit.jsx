import React, { useEffect, useState } from "react";

const AdminRoleFormEdit = ({
  role,
  editRoleInfo,
  handleEditRoleInfoChange,
}) => {
  return (
    <div>
      <label htmlFor="roleName">Role Name</label>
      <input
        type="text"
        name="name"
        id="roleName"
        value={editRoleInfo.name}
        onChange={handleEditRoleInfoChange}
        className="input-field"
      />
    </div>
  );
};

export default AdminRoleFormEdit;
