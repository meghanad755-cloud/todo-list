 
import { AiFillDelete } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

const TodoList = () => {
  const[todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const[currentTodo, setCurrentTodo] = useState({_id: null, message: ''});

  const getAllTodos = async () =>{
    try{
      const response = await axios.get('http://localhost:8000/todolist/getall');
      setTodos(response.data.data);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() =>{
    getAllTodos();
    console.log('This runs once when the componenet mounts.');
  }, []);

  //The useEffect hook is an essential part of this react component. It is used to perform side effects in functional components, such as fetching data, subscribing to events, or manually updating the DOM.

  //In this component, the useEffect is used to fetch the initail list 

  const handleDelete = async (id) => {
    try{
      const result = await axios.delete(`http://localhost:8000/todolist/deleteTodo/${id}`);
      if(result.data.success === 'deleted') {
        toast.success('Todo deleted successfully!');
        getAllTodos();
      }
    }catch(error){
      console.error(error);
      toast.error('Failed to delete todo.');
    }
  };
  
  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, message: e.target.value });
  };

  //{ ...currentTodo } means "create a new object and copy all properties of currentTodo into it."

  //Example workflow
  //Initial state:

  //isEditing = false
  //currentTodo = {_id: null, message:''}
  //The user is not editing any to-do yet.

  //user clicks the edit button for a To-Do: Let's say the user clicks the edit button for the to-do:

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ _id: todo._id, message:todo.message });
  }

  const handleUpdate =async () => {
    //validate the message before updating
    if(currentTodo.message.length <4|| currentTodo.message.length > 20) {
      toast.error('message must be between 4 and 20 characters.');
      return; //Blocks the update if validation fails
    }
    try{
      const result = await axios.put(`http://localhost:8000/todolist/updateToDo/${currentTodo._id}`,{
        message:currentTodo.message
      });
      if (result.data.success === 'updated'){
        toast.success('ToDo updated successfully!');
        console.log(result)
        getAllTodos();
        setIsEditing(false);
        setCurrentTodo({_id: null, message:''});
      }
    }catch (error){
      console.error(error);
      toast.error('Failed to update todo.')
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({_id: null, message:''});
  };
  return (
    <div>
      {isEditing ?(
        <div>
          <input
          type="text"
          value={currentTodo.message}
          onChange={handleEditInputChange}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) :(
        <ul>
          {todos.map((todo) =>(
            <li key= {todo._id}>
              {todo.message}
              <AiFillEdit  className="icon" onClick={() =>handleEdit(todo)}/>

              <AiFillDelete className="icon" onClick={() =>handleDelete(todo._id)}/>
             </li>
          ))}
        </ul>
      )}
    </div>
    );
  };

export default TodoList;
