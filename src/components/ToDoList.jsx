import React, { useState, useEffect } from "react";

const ToDoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    //loads tasks from local storage when page is loaded

    useEffect(() => {
        console.log("Loading tasks from localStorage");
        try {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            console.log("Parsed tasks:", savedTasks);
            setTasks(savedTasks);
        } catch (error) {
            console.error("Error parsing tasks from localStorage", error);
            setTasks([]);
        }
    }, []);

 
    
    useEffect(() => {
        console.log("Saving tasks to localStorage:", tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    

    

    
    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    }
    //this will be the function for the textbox which will add new tasks

    // const addTask = () => {

    //     if (newTask.trim() !=='') {

    //         setTasks(t => [...t, newTask]);
    //         setNewTask('');
    //     }

    //     // add an if statement to prevent the add button from adding empty task
    //     // the argument of the if statement is if the string is not equal to empty is only when it will function

    // }


    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks(t => {
                const updatedTasks = [...t, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            setNewTask('');
        }
    };
    //this will be the add task button function ==> done

    const deleteTask = (index) => {

        const removeTasks = tasks.filter((_, i) => i !== index);

        setTasks(removeTasks);

        // the argument passed is if the index of the filter parameters does not match the index selected it will not delete but if they match  it's deleted
    }
    //delete button  ==> done

    const moveTaskUp = (index) => {

        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            
            setTasks(updatedTasks); 
        }

        //this is called array destructuring , basically we're swapping the array object on top with the one below it which explains the [index - 1]
    }

    const moveTaskDown = (index) => {

        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            
            setTasks(updatedTasks); 
        }
    }
    

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div>
                <input type="text" placeholder="Enter new task ..." value={newTask} onChange={handleInputChange} />

                <button className="add-btn" onClick={addTask}>
                    <img src="src/assets/add.png" alt="add"/>
                </button>
            </div>

            
            <ol>
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span className="text">{task}</span>

                        <button className="up-btn"
                            onClick = {() => moveTaskUp(index)}>
                            <img src="src/assets/up-arrow.png" alt="up"/>
                        </button>

                        <button className="down-btn"
                            onClick = {() => moveTaskDown(index)}>
                            <img src="src/assets/down-arrow.png" alt="down"/>
                        </button>

                        <button className="delete-btn"
                            onClick = {() => deleteTask(index)}>
                          <img src="src/assets/trash.png" alt="delete"/>

                        </button>
                    </li>
                )}
            </ol>

        </div>
    );
}

export default ToDoList;