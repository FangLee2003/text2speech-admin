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
declare const FormModal: <T extends Record<string, unknown>>({ isOpen, onClose, onSave, selectedItem, fields, title, }: FormModalProps<T>) => import("react/jsx-runtime").JSX.Element | null;
export default FormModal;
