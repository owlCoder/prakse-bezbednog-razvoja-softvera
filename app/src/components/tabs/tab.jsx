import React, { useState } from "react";
import { FaUsers, FaShoppingCart, FaBoxOpen, FaClipboardList } from "react-icons/fa";

// Create separate components for tab content
const UsersTabContent = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      Users Content Goes Here
    </div>
  );
};

const ProductsTabContent = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      Products Content Goes Here
    </div>
  );
};

const OrdersTabContent = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      Orders Content Goes Here
    </div>
  );
};

const AuditTabContent = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      Audit Content Goes Here
    </div>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("users");

  const tabItems = [
    { id: "users", label: "Users", icon: <FaUsers className="inline mr-2" />, content: <UsersTabContent /> },
    { id: "products", label: "Products", icon: <FaBoxOpen className="inline mr-2" />, content: <ProductsTabContent /> },
    { id: "orders", label: "Orders", icon: <FaShoppingCart className="inline mr-2" />, content: <OrdersTabContent /> },
    { id: "audit", label: "Audit", icon: <FaClipboardList className="inline mr-2" />, content: <AuditTabContent /> },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
    <div className="p-2 flex justify-center">
      <div className="bg-slate-100 dark:bg-gray-400 px-4 py-3 bg-opacity-80 rounded-lg max-w-md shadow-lg overflow-hidden">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          {tabItems.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer py-2 px-3 rounded-lg
                ${activeTab === item.id
                  ? "text-slate-100 bg-blue-800 bg-opacity-80"
                  : "bg-opacity-40 hover:bg-opacity-60"}
              `}
              onClick={() => handleTabClick(item.id)}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
     
      </div>
      
    </div>
       {/* Render tab content based on activeTab */}
       {tabItems.map((item) => (
          <div key={item.id} className={activeTab === item.id ? "block" : "hidden"}>
            {item.content}
          </div>
        ))}
    </div>
  );
};

export default Tabs;
