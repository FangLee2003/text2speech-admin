interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
declare const ConfirmModal: ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => import("react/jsx-runtime").JSX.Element | null;
export default ConfirmModal;
