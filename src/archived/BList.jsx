import React from "react";

<div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Item List</h1>
        <ul className="space-y-4">
          {sampleData.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-100"
            >
              <span>{item.name}</span>
              <div>
                <button className="py-2 px-4 bg-blue-500 text-white rounded mr-2">
                  Edit
                </button>
                <button className="py-2 px-4 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>