import React from "react";
interface TableProps<T> {
    headers: string[];
    data: T[];
    actions?: {
        label: string;
        color: string;
        onAction: (item: T) => void;
    }[];
    renderRow?: (item: T) => React.ReactNode[];
}
declare const Table: <T extends Record<string, any>>({ headers, data, actions, renderRow }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
