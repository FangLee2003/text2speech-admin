import React, { useEffect, useState } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  // deletePlan
}
  from "../services/api";
import Button from "../components/Button";
import FormModal from "../components/FormModal";
import Table from "../components/Table";
import { Plan } from "../types/Plan";

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách kế hoạch:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAdd = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleSave = async (form: Partial<Plan>) => {
    try {
      if (selectedPlan) {
        const updated = { ...selectedPlan, ...form };
        await updatePlan(updated);
        setPlans((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      } else {
        const newPlan: Omit<Plan, "id" | "createdDate" | "updatedDate"> = {
          name: form.name || "",
          credit: form.credit || 0,
          hour: form.hour || "0",
          price: form.price || 0,
          status: form.status || "ACTIVE",
        };
        const created = await createPlan(newPlan);
        setPlans((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Lỗi khi lưu kế hoạch:", err);
    }
  };

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // const handleDelete = async (plan: Plan) => {
  //   try {
  //     await deletePlan(plan.id);
  //     setPlans((prev) => prev.filter((p) => p.id !== plan.id));
  //   } catch (err) {
  //     console.error("Lỗi khi xóa kế hoạch:", err);
  //   }
  // };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách kế hoạch</h2>
      <Button onClick={handleAdd}>Thêm kế hoạch</Button>

      <Table<Plan>
        headers={["Tên", "Credit", "Giờ", "Giá", "Trạng thái"]}
        data={plans}
        renderRow={(plan) => [
          plan.name,
          plan.credit,
          plan.hour,
          plan.price.toLocaleString("vi-VN") + " đ",
          plan.status,
        ]}
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

      <FormModal<Partial<Plan>>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        selectedItem={selectedPlan}
        title={selectedPlan ? "Chỉnh sửa kế hoạch" : "Thêm kế hoạch"}
        fields={[
          { name: "name", type: "text", placeholder: "Tên kế hoạch" },
          { name: "credit", type: "number", placeholder: "Số credit" },
          { name: "hour", type: "text", placeholder: "Giờ" },
          { name: "price", type: "number", placeholder: "Giá (VNĐ)" },
          { name: "status", type: "text", placeholder: "Trạng thái (ACTIVE/INACTIVE)" },
        ]}
      />
    </div>
  );
};

export default Plans;
