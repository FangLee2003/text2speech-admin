import React, { useState, useEffect } from "react";
import { getPlans } from "@/services/api";
import Button from "@/components/Button";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import { Plan } from "@/types/Plan";

const Plans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      const plansData = await getPlans();
      setPlans(plansData);
    };
    fetchPlans();
  }, []);

  const handleAddPlan = () => {
    setSelectedPlan(null); // Reset selected plan for adding new one
    setIsModalOpen(true);
  };

  const handleSavePlan = (newPlan: { name: string; price: number; features: string[] }) => {
    if (selectedPlan) {
      // Edit existing plan
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === selectedPlan.id ? { ...newPlan, id: selectedPlan.id } : plan
        )
      );
    } else {
      // Add new plan
      setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Plans</h2>
      <Button onClick={handleAddPlan}>Add Plan</Button>

      <Table<Plan>
        headers={["Name", "Price", "Features"]}
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
            onAction: handleDeletePlan,
          },
        ]}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlan}
        selectedItem={selectedPlan}
        fields={[
          { name: "name", type: "text", placeholder: "Plan Name" },
          { name: "price", type: "number", placeholder: "Plan Price" },
          { name: "features", type: "text", placeholder: "Plan Features" },
        ]}
        title={selectedPlan ? "Edit Plan" : "Add New Plan"}
      />
    </div>
  );
};

export default Plans;
