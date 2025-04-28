interface TableProps<T extends object> {
    headers: string[];
    data: T[];
    actions: {
        label: string;
        color: string;
        onAction: (item: T) => void;
    }[];
}
declare const Table: <T extends object>({ headers, data, actions }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
