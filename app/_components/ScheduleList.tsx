import React, { useEffect, useState } from "react";
import axios from "axios";

interface Script {
  id: number;
  description: string;
  time: string;
  status: boolean;
}

const ScriptTable: React.FC<{ eventId: number }> = ({ eventId }) => {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await axios.get(`/api/event/schedule`);
        setScripts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching scripts:", error);
      }
    };

    fetchScripts();
  }, [eventId]);

  return (
    <div className="mt-16 flex justify-center">
      <table className="md:w-full w-80 whitespace-nowrap text-left text-sm leading-6">
        <colgroup>
          <col className="w-1/12" />
          <col className="w-3/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead className="border-b border-gray-200 text-gray-900">
          <tr>
            <th scope="col" className="px-0 py-3 font-semibold">
              Status
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Descrição
            </th>
            <th scope="col" className="py-3 pl-8 pr-10 text-right font-semibold">
              Horário
            </th>
          </tr>
        </thead>
        <tbody>
          {scripts.map((script) => (
            <tr key={script.id} className="border-b border-gray-100">
              <td className="px-0 py-5">
                <input
                  type="checkbox"
                  checked={script.status}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
              </td>
              <td className="px-0 py-5">
                <div className="truncate font-medium text-gray-900 ml-4">{script.description}</div>
              </td>
              <td className="py-5 pl-8 pr-0 text-right">
                {new Date(script.time).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScriptTable;
