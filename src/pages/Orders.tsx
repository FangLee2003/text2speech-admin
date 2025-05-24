import React, { useState, useEffect } from "react";
import { getOrders, confirmOrder } from "@/services/api";
import Table from "@/components/Table";
import { Order } from "@/types/Order";

const STATUSES = [
  "REQUEST_PAYMENT",
  "PAID",
  "CANCELED",
  "EXPIRED",
  // thêm các trạng thái khác nếu có
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>(""); // filter all if empty
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(); // nếu có phân trang thì truyền page, size
      if (response?.code === 200 && response.data?.content) {
        setOrders(response.data.content);
        // giả sử API có totalPages
        setTotalPages(response.data.totalPages || 1);
        setPage(response.data.pageable.pageNumber || 0);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!statusFilter) {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const handleConfirm = async (order: Order) => {
    try {
      const response = await confirmOrder(order.id);

      if (response.code !== 200) {
        alert(`Lỗi: ${response.message || "Không thể xác nhận đơn hàng."}`);
        return;
      }
      await fetchOrders();
    } catch (error) {
      alert("Lỗi khi xác nhận đơn hàng. Vui lòng thử lại sau.");
      console.error("Lỗi xác nhận đơn hàng:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      // Nếu API hỗ trợ phân trang, gọi fetchOrders(newPage) ở đây
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách Orders</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Lọc theo trạng thái:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">-- Tất cả --</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <Table<Order>
        headers={[
          "Order ID",
          "Code Payment",
          "User",
          "Plan",
          "Price",
          "Discount",
          "Final Price",
          "Status",
          "Created Date",
          "Expired Date"
        ]}
        data={filteredOrders}
        renderRow={(order) => [
          order.id,
          order.codePayment,
          order.user.username,
          order.plan.name,
          order.price.toLocaleString() + " đ",
          order.discount.toLocaleString() + " đ",
          order.finalPrice.toLocaleString() + " đ",
          order.status,
          order.createdDate,
          order.expiredDate,
        ]}
        actions={[
          {
            label: "Confirm",
            color: "bg-green-500 text-white hover:bg-green-600",
            onAction: handleConfirm,
            visible: (order: Order) => order.status === "REQUEST_PAYMENT",
          },
        ]}
      />

      {/* Phân trang */}
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
    </div>
  );
};

export default Orders;
