import React from "react";

interface TableProps<T> {
  headers: string[];
  data: T[];
  actions?: {
    label: string;
    color: string;
    onAction: (item: T) => void;
  }[];
  renderRow?: (item: T) => React.ReactNode[]; // Thêm renderRow tùy chọn
}

const Table = <T extends Record<string, any>>({ headers, data, actions = [], renderRow }: TableProps<T>) => {
  return (
    <table className="min-w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          {headers.map((header, idx) => (
            <th key={idx} className="border px-4 py-2 bg-gray-100">
              {header}
            </th>
          ))}
          {actions.length > 0 && (
            <th className="border px-4 py-2 bg-gray-100">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={idx}
            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="border px-4 py-2">{idx + 1}</td>
            {/* Nếu renderRow được truyền thì dùng nó, ngược lại dùng Object.values */}
            {renderRow
              ? renderRow(item)
              : Object.values(item).map((value, idx) => (
                <td key={idx} className="border px-4 py-2 whitespace-nowrap">
                  {String(value)}
                </td>
              ))}
            {actions.length > 0 && (
              <td className="border px-4 py-2">
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => action.onAction(item)}
                    className={`mr-2 px-3 py-1 rounded text-white ${action.color}`}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
