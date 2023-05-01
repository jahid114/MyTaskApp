import React, { useState, useEffect } from 'react';
import './note.css';
import { useDispatch } from 'react-redux';
import { deleteNote, deleteTodoInApp, toggleTodo } from '../../actions/notes';
import { BsTrash3Fill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import toast from 'react-hot-toast';

const Note = ({ item, setCurrentId, setShowForm, setIsEditing, setSelectedDate, theme }) => {
  const [showDescription, setShowDescription] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  const donehandler = async (event) => {
    dispatch(toggleTodo(item._id));
  };

  const deleteTodoHandler = async () => {
    const deleteInAppNote = {
      title: item.title,
      description: item.description,
      userId: user?.result?._id,
      message: 'deleted',
    };
    try {
      dispatch(deleteTodoInApp(deleteInAppNote));
      dispatch(deleteNote(item._id));
      toast.error('Todo deleted!', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.log('deleteTodoHandler error', error);
    }
  };

  const descriptionHandler = () => {
    setShowDescription((prev) => !prev);
  };

  const editTodoHandler = () => {
    setCurrentId(item._id);
    setSelectedDate(new Date(item.date));
    setShowForm(true);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className='note'
      style={{
        backgroundColor: theme ? '#1f1f2b' : '#f2f2f2',
      }}
    >
      <div className='note_container'>
        <div className='note_text_container'>
          <input
            type='checkbox'
            className='note_checkbox'
            checked={item.done}
            onChange={donehandler}
            style={{
              cursor: 'pointer',
            }}
          />
          <h2 className={item.done ? 'note_title done' : 'note_title'}>{item.title}</h2>
        </div>
        <div className='note_button_container'>
          {item.description.length > 0 && (
            <div className='icon_container note_description' onClick={descriptionHandler}>
              <BsReverseLayoutTextWindowReverse />
            </div>
          )}
          <div className='icon_container note_update' onClick={editTodoHandler}>
            <FiEdit />
          </div>
          <div className='icon_container note_delete' onClick={deleteTodoHandler}>
            <BsTrash3Fill />
          </div>
        </div>
      </div>
      <div className='note_input_container'>
        {showDescription && (
          <p className={item.done ? 'note_description done' : 'note_description'}>{item.description}</p>
        )}
      </div>
    </div>
  );
};

export default Note;
