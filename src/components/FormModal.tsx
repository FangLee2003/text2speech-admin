import React, { useState, useEffect } from "react";
import Button from "@/components/Button";

interface FieldConfig<T> {
  name: keyof T;
  type: string;
  placeholder: string;
}

interface FormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  selectedItem: T | null;
  fields: Array<FieldConfig<T>>;
  title: string;
}

const FormModal = <T extends Record<string, unknown>>({
  isOpen,
  onClose,
  onSave,
  selectedItem,
  fields,
  title,
}: FormModalProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    } else {
      setFormData({});
    }
  }, [selectedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as T);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-500 text-3xl hover:text-gray-800 cursor-pointer"
        >
          ✖
        </button>

        <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="mb-4" key={String(field.name)}>
              <input
                type={field.type}
                name={String(field.name)}
                value={formData[field.name] as string || ""}
                placeholder={field.placeholder}
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
          ))}
          <Button type="submit" className="w-full bg-blue-600 text-white align-end py-2 rounded-md hover:bg-blue-700">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
