"use client";

import { Client } from "@/app/types";
import { useState, useEffect } from "react";

export default function ClientsList({ clients }: { clients: Client[] }) {
  const responsiblePersonName =
    clients.find((client) => client.responsible_person)?.responsible_person ||
    "";

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof Client | "status">(
    "account_number"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [statuses, setStatuses] = useState(
    clients.reduce((acc, client) => {
      acc[client.account_number] = client.status;
      return acc;
    }, {} as { [key: string]: string })
  );

  useEffect(() => {
    let sortedClients = [...clients];

    if (searchQuery) {
      sortedClients = sortedClients.filter(
        (client) =>
          client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.middle_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          client.account_number.toString().includes(searchQuery.toLowerCase())
      );
    }

    sortedClients.sort((a, b) => {
      const aValue =
        sortKey === "status" ? statuses[a.account_number] : a[sortKey];
      const bValue =
        sortKey === "status" ? statuses[b.account_number] : b[sortKey];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredClients(sortedClients);
  }, [searchQuery, sortKey, sortOrder, clients, statuses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (key: keyof Client | "status") => {
    if (key === sortKey) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleStatusChange = async (
    account_number: number,
    newStatus: string
  ) => {
    try {
      const response = await fetch(
        "https://aton-internship-api.onrender.com/clients",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account_number, status: newStatus }),
        }
      );

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
    <div className="overflow-x-auto p-8">
      <h1 className="text-center mb-4">
        Здравствуйте, {responsiblePersonName}!
      </h1>
      <h2 className="text-center mb-4 uppercase">Список клиентов</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Поиск..."
          className="border rounded p-2 text-black"
        />
      </div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="hidden md:table-header-group">
          <tr className="block md:table-row">
            <th
              className="px-4 py-2 cursor-pointer block md:table-cell"
              onClick={() => handleSortChange("account_number")}
            >
              Номер счета
            </th>
            <th
              className="px-4 py-2 cursor-pointer block md:table-cell"
              onClick={() => handleSortChange("last_name")}
            >
              Фамилия
            </th>
            <th
              className="px-4 py-2 cursor-pointer block md:table-cell"
              onClick={() => handleSortChange("first_name")}
            >
              Имя
            </th>
            <th
              className="px-4 py-2 cursor-pointer block md:table-cell"
              onClick={() => handleSortChange("middle_name")}
            >
              Отчество
            </th>
            <th className="px-4 py-2 block md:table-cell">Дата рождения</th>
            <th className="px-4 py-2 block md:table-cell">ИНН</th>
            {/* <th className="px-4 py-2">Responsible Person</th> */}
            <th
              className="px-4 py-2 cursor-pointer block md:table-cell"
              onClick={() => handleSortChange("status")}
            >
              Статус
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {filteredClients.length > 0 ? (
            filteredClients.map((client: Client) => (
              <tr
                key={client._id}
                className="block md:table-row mb-4 md:mb-0 border md:border-0"
              >
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">Номер счета: </span>
                  {client.account_number}
                </td>
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">Фамилия: </span>
                  {client.last_name}
                </td>
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">Имя: </span>
                  {client.first_name}
                </td>
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">Отчество: </span>
                  {client.middle_name}
                </td>
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">
                    Дата рождения:{" "}
                  </span>
                  {client.birthdate}
                </td>
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">ИНН: </span>
                  {client.inn}
                </td>
                <td className="border-t border-l border-r md:border border-gray-300 px-4 py-2 block md:table-cell">
                  <span className="md:hidden font-semibold">Статус: </span>
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
            <tr className="block md:table-row">
              <td colSpan={8} className="text-center py-4 block md:table-cell">
                {searchQuery
                  ? "К сожалению, клиентов с заданными параметрами не найдено. Попробуйте изменить параметры поиска."
                  : "К сожалению, для данного пользователя нет закрепленных клиентов. Попробуйте зайти под другим логином."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
