import Navbar from "./components/Navbar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure want to delete this todo ?")) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-mist-900 text-purple-500 p-5 rounded-2xl min-h-[80vh] max-w-[80vw]">
        <div className="addTodo">
          <div className="heading">
            <h2 className="text-lg font-bold">Add a Todo</h2>
          </div>
          <div className="addText flex justify-between">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="bg-mist-200 rounded-md w-full h-9 text-black pl-2"
            />
            <button
              onClick={handleAdd}
              className="bg-purple-600 hover:bg-purple-800 transition-all text-white rounded-sm px-3 py-1 ml-5 text-sm font-bold"
            >
              Save
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold mt-5">Your Todos</h2>
        <div className="todos my-3">
          {todos.length ==0 && <div className="flex justify-center p-10">No Todos to display </div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo my-3 flex justify-between items-center p-2 bg-mist-200 rounded-sm"
              >
                <div className="text text-black flex gap-3">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={(e)=>handleEdit(e,item.id)}
                    className="bg-purple-600 hover:bg-purple-800 transition-all text-white rounded-sm px-3 py-2 mx-2 text-sm font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-purple-600 hover:bg-purple-800 transition-all text-white rounded-sm px-3 py-2 mx-2 text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
