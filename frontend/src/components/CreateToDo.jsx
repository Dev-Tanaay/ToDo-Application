import React, { useState } from 'react'

const CreateToDo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Please fill in all fields");
            return;
        }
        try{
            const response =await fetch("https://todoapp-u2zv.onrender.com/todo", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    title,
                    description
                })
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Todo created successfully:", data);
            alert("Todo created successfully!");
        }catch (error) {
            console.error("Error creating todo:", error);
            alert("Failed to create todo. Please try again.");
            return;
        }
    }
  return (
    <>
    <input type="text" name="" id="" placeholder='Enter the title...' onChange={(e)=>setTitle(e.target.value)}/><br />
    <input type="text" name="" id="" placeholder='Enter the description...' onChange={(e)=>setDescription(e.target.value)}/><br />
    <button type="submit" onClick={handleSubmit}>Add to do</button>
    </>
  )
}

export default CreateToDo