"use client";

import { Client } from "@/app/types";
import { useState } from "react";

export default function ClientsList({ clients }: { clients: Client[] }) {
  const [statuses, setStatuses] = useState(
    clients.reduce((acc, client) => {
      acc[client.account_number] = client.status;
      return acc;
    }, {} as { [key: string]: string })
  );

  const handleStatusChange = async (
    account_number: number,
    newStatus: string
  ) => {
    try {
      const response = await fetch("http://localhost:3500/clients", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_number, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [account_number]: newStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Не в работе":
        return "gray";
      case "В работе":
        return "orange";
      case "Отказ":
        return "red";
      case "Сделка закрыта":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Account Number</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Middle Name</th>
            <th className="px-4 py-2">Birthdate</th>
            <th className="px-4 py-2">INN</th>
            <th className="px-4 py-2">Responsible Person</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client: Client) => (
              <tr key={client._id}>
                <td className="border px-4 py-2">{client.account_number}</td>
                <td className="border px-4 py-2">{client.last_name}</td>
                <td className="border px-4 py-2">{client.first_name}</td>
                <td className="border px-4 py-2">{client.middle_name}</td>
                <td className="border px-4 py-2">{client.birthdate}</td>
                <td className="border px-4 py-2">{client.inn}</td>
                <td className="border px-4 py-2">
                  {client.responsible_person}
                </td>
                <td className="border px-4 py-2">
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(
                        statuses[client.account_number]
                      ),
                      marginRight: "8px",
                    }}
                  ></span>
                  <select
                    value={statuses[client.account_number]}
                    onChange={(e) =>
                      handleStatusChange(client.account_number, e.target.value)
                    }
                    className="text-black"
                  >
                    <option value="Не в работе">Не в работе</option>
                    <option value="В работе">В работе</option>
                    <option value="Отказ">Отказ</option>
                    <option value="Сделка закрыта">Сделка закрыта</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                There are no clients for you.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
