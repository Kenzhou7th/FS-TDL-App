import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

// Function to handle saving the edited task
  const handleSave = () => {
    if (editedText.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }
    onEdit(todo.id, editedText); 
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
        )}
      </div>

{/* Action buttons: Edit/Save and Delete */}
      <div className="todo-actions">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className="delete-button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;