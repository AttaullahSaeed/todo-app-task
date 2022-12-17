import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
const List = ({ items, removeItem, editItem }) => {
  return (
    <>
      <div className="container">
        {items.map((item) => {
          const { id, title } = item;
          return (
            <div className="w-full bg-white ">
              <ul className="divide-y-2 divide-gray-400 bg-gray-200 my-2">
                <li className="flex justify-between p-3 ">
                  {title}

                  <div className="flex gap-x-5 ">
                    <BiEditAlt
                      onClick={() => editItem(id)}
                      className="text-blue-600 cursor-pointer"
                      size={23}
                    />
                    <AiFillDelete
                      className="text-red-600 cursor-pointer"
                      onClick={() => removeItem(id)}
                      size={22}
                    />
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
