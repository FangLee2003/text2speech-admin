import React from 'react';

interface TableProps<T> {
  headers: string[];
  data: T[];
  actions: { label: string; color: string, onAction: (item: T) => void; }[];  // Thêm color vào action
}

const Table = <T,>({ headers, data, actions }: TableProps<T>) => {
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
            {Object.values(item).map((value, idx) => (
              <td key={idx} className="border px-4 py-2">{String(value)}</td>
            ))}
            {actions.length > 0 &&
              <td className="px-4 py-2 border">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => action.onAction(row)}
                    className={`px-4 py-2 rounded-sm mr-2 ${action.color}`}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
