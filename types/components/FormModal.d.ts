interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    selectedItem: any | null;
    fields: Array<{
        name: string;
        type: string;
        placeholder: string;
    }>;
    title: string;
}
declare const FormModal: ({ isOpen, onClose, onSave, selectedItem, fields, title }: FormModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default FormModal;
