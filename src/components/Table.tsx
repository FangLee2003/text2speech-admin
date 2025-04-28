import React from "react";

interface TableProps<T extends object> {  // 👈 T extends object
  headers: string[];
  data: T[];
  actions: { label: string; color: string; onAction: (item: T) => void }[];
}

const Table = <T extends object>({ headers, data, actions }: TableProps<T>) => {
  return (
    <table className="min-w-full mt-4">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          {headers.map((header, idx) => (
            <th key={idx} className="border px-4 py-2">{header}</th>
          ))}
          {actions.length > 0 && <th className="border px-4 py-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {(Object.values(item) as Array<string | number | boolean | null | undefined>).map((value, valueIdx) => (
              <td key={valueIdx} className="border px-4 py-2">{String(value)}</td>
            ))}
            {actions.length > 0 && (
              <td className="px-4 py-2 border">
                {actions.map((action, actionIdx) => (
                  <button
                    key={actionIdx}
                    onClick={() => action.onAction(item)}
                    className={`px-4 py-2 rounded-sm mr-2 ${action.color}`}
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
