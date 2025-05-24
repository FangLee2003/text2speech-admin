import React, { useState, useEffect } from "react";
import { getUsers, createUser } from "@/services/api"; // API gọi với page, size
import Button from "@/components/Button";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import { User } from "@/types/User";

const PAGE_SIZE = 10;

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async (pageNumber = 0) => {
    try {
      const response = await getUsers(pageNumber, PAGE_SIZE);
      if (response?.code === 200 && response.data) {
        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
        setPage(response.data.pageable.pageNumber);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // const handleDelete = async (user: User) => {
  //   // TODO: Viết API xóa user, gọi API xong fetch lại danh sách
  // };

  const handleSave = async (form: Partial<User>) => {
    try {
      if (selectedUser) {
        // TODO: updateUser API
      } else {
        const response = await createUser({
          email: form.email || "",
          username: form.username || "",
          password: form.password || "",
          confirmPassword: form.confirmPassword || "",
        });

        // Nếu API trả về đối tượng user (không có trường code), coi như thành công
        if (!response || !response.username) {
          alert(`Lỗi: Dữ liệu trả về không hợp lệ.`);
          return;
        }
      }
      setIsModalOpen(false);
      await fetchUsers(page);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Lỗi không xác định";
      alert(`Lỗi: ${msg}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách users</h2>
      <Button onClick={handleAdd}>Thêm user</Button>

      <Table<User>
        headers={["Username", "Email", "Credit", "Status"]}
        data={users}
        renderRow={(user) => [user.username, user.email, user.credit, user.status]}
        actions={[
          {
            label: "Sửa",
            color: "bg-emerald-500 text-white hover:bg-emerald-600",
            onAction: handleEdit,
          },
          // {
          //   label: "Xóa",
          //   color: "bg-rose-600 text-white hover:bg-rose-700",
          //   onAction: handleDelete,
          // },
        ]}
      />

      {/* Phân trang đơn giản */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <FormModal<Partial<User>>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        selectedItem={selectedUser}
        title={selectedUser ? "Chỉnh sửa user" : "Thêm user"}
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "username", type: "text", placeholder: "Tên" },
          { name: "password", type: "password", placeholder: "Mật khẩu" },
          { name: "confirmPassword", type: "password", placeholder: "Xác nhận mật khẩu" },
        ]}
      />
    </div>
  );
};

export default Users;
