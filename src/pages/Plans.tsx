import React, { useState, useEffect } from "react";
import { getPlans, createPlan, updatePlan } from "@/services/api";
import Button from "@/components/Button";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import { Plan } from "@/types/Plan";
import ConfirmModal from "@/components/ConfirmModal";

const Plans = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const fetchPlans = async () => {
    const plansData = await getPlans();
    setPlans(plansData);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddPlan = () => {
    setSelectedPlan(null);
    setEditModalOpen(true);
  };


  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setEditModalOpen(true);
  };

  const handleSavePlan = async (form: {
    name: string;
    credit: number;
    hour: string;
    price: number;
  }) => {
    try {
      if (selectedPlan) {
        // Gọi PUT API
        await updatePlan({ ...selectedPlan, ...form });
      } else {
        // Gọi POST API
        await createPlan(form);
      }
      fetchPlans();
    } catch (error) {
      console.error("Lỗi khi lưu Plan:", error);
    } finally {
      setEditModalOpen(false);
    }
  };
  const handleConfirmDelete = (plan: Plan) => {
    setSelectedPlan(plan)
    setConfirmModalOpen(true);
  };
  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter((plan) => plan.id !== id)); // TODO: gọi DELETE nếu backend hỗ trợ
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Plans</h2>
      <Button onClick={handleAddPlan}>Add Plan</Button>

      <Table<Plan>
        headers={["Name", "Credit", "Hour", "Price", "Status", "Created Date", "Updated Date"]}
        data={plans}
        actions={[
          {
            label: "Edit",
            color: "bg-emerald-400 text-white hover:bg-emerald-500",
            onAction: handleEditPlan,
          },
          {
            label: "Delete",
            color: "bg-rose-600 text-white hover:bg-rose-700",
            onAction: (plan) => handleConfirmDelete(plan),
          },
        ]}
      />

      <FormModal<Plan>
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSavePlan}
        selectedItem={selectedPlan}
        fields={[
          { name: "name", type: "text", placeholder: "Tên gói" },
          { name: "credit", type: "number", placeholder: "Số credit" },
          { name: "hour", type: "text", placeholder: "Giờ sử dụng" },
          { name: "price", type: "number", placeholder: "Giá tiền" },
        ]}
        title={selectedPlan ? "Chỉnh sửa gói" : "Tạo gói mới"}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa gói "${selectedPlan?.name}" không?`}
        onConfirm={() => {
          handleDeletePlan(selectedPlan?.id || 0);
          setConfirmModalOpen(false);
        }}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </div>
  );
};

export default Plans;
