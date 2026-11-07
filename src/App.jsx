import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [showFinished, setShowFinished] = useState(true);

  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos");
  //   if (todoString) {
  //     let todos = JSON.parse(todoString);
  //     setTodos(todos);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // const saveToLs = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLs();
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure want to delete this todo ?")) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      // saveToLs();
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
    // saveToLs();
  };
  return (
    <>
      <Navbar />
      <div className="md:container bg-[#12121e] mx-auto my-5 border border-white/10 shadow-xl text-purple-500 p-5 rounded-2xl min-h-[80vh]  md:w-1/2">
        <h1 className="font-bold text-center text-xl my-5">
          todo. - Manage your todos at one place
        </h1>
        <div className="addTodo mb-5">
          <div className="heading">
            <h2 className="text-lg font-bold">Add a Todo</h2>
          </div>
          <div className="addText flex flex-col gap-2 mt-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="bg-[#1b1b2a] border border-white/10 rounded-md text-white outline-none focus:border-purple-500 drop-shadow-2xl  w-full h-9 transition-all pl-2"
            />
            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className=" shadow-2xl bg-purple-600 disabled:bg-purple-950 disabled:text-gray-500 hover:bg-purple-700 transition-all text-white rounded-md px-3 py-2 text-sm font-bold"
            >
              Save
            </button>
          </div>
        </div>
        <label className="cursor-pointer py-2 block-auto">
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          className="cursor-pointer accent-purple-400 w-4 h-4"
        />{" "}
        Show Completed Tasks
        </label>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos my-3">
          {todos.length == 0 && (
            <div className="flex justify-center p-10">No Todos to display </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo my-3 flex justify-between items-center p-2  rounded-md border bg-[#181828] border-white/10"
                >
                  <div className="text text-mist-300 flex items-center gap-2">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                      className="cursor-pointer w-4 h-4 accent-purple-400"
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-blue-500/10  hover:bg-blue-500 border border-blue-300/10 transition-all text-white rounded-lg px-4 py-3 mx-2 text-sm font-bold"
                    >
                      <MdEditSquare size={19}/>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-red-500/10 hover:bg-red-700 border border-red-300/10 transition-all text-white rounded-md px-4 py-3 mx-2 text-sm font-bold"
                    >
                      <MdDelete size={19} />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
