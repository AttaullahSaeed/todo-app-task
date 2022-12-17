import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import List from "./components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIdEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "bg-yellow-500", "Please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIdEditing(false);
      showAlert(true, "bg-green-500", "Edit successfully...");
    } else {
      showAlert(true, "bg-green-600", "item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "bg-red-700", "Item removed");
    setList(list.filter((itm) => itm.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIdEditing(true);
    setEditID(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "bg-red-700", "Empty list");
    setList([]);
  };

  return (
    <>
      <section className="mx-auto w-[50%] bg-white p-5 shadow-lg mt-20">
        <form onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h2 className="text-center my-3 text-4xl mb-6 font-medium">
            Todo List
          </h2>
          <div className="mb-3 flex justify-center">
            <input
              type="text"
              className="py-2 px-2 outline-none bg-gray-200 w-full shadow border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-gray-600 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase  shadow-lg hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>

        {list.length ? (
          <div className="mt-12">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <div className="mt-5 flex justify-center">
              <button
                onClick={clearList}
                type="button"
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Remove All
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default App;
