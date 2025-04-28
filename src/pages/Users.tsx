import React, { useState, useEffect } from "react";
import { getUsers } from "@/services/api";
import Button from "@/components/Button";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import { User } from "@/types/User";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null); // Reset selected user for adding new one
    setIsModalOpen(true);
  };

  const handleSaveUser = (newUser: { name: string; email: string }) => {
    if (selectedUser) {
      // Edit existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...newUser, id: selectedUser.id } : user
        )
      );
    } else {
      // Add new user
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>
      <Button onClick={handleAddUser}>Add User</Button>

      <Table<User>
        headers={["Name", "Email"]}
        data={users}
        actions={[
          {
            label: "Edit", 
            color: "bg-emerald-400 text-white hover:bg-emerald-500",
            onAction: handleEditUser,
          },
          {
            label: "Delete",
            color: "bg-rose-600 text-white hover:bg-rose-700",
            onAction: handleDeleteUser,
          },
        ]}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        selectedItem={selectedUser}
        fields={[
          { name: "name", type: "text", placeholder: "Name" },
          { name: "email", type: "email", placeholder: "Email" },
        ]}
        title={selectedUser ? "Edit User" : "Add New User"}
      />
    </div>
  );
};

export default Users;
