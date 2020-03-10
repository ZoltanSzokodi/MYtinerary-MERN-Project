import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const commentsContext = createContext();


// CONTEXT WRAPPER COMPONENT ==========================================
const CommentsContext = props => {
  const [comments, setComments] = useState([]);

  // fetch all comments --------------------------------------
  const getComments = useCallback(async () => {
    try {
      const response = await axios
        .get(`http://localhost:5000/api/comments/all`);
      setComments([...response.data.comments]);
    }
    catch (error) {
      console.log(error.response);
    }
  }, []);


  // RENDER =============================================================
  return (
    <commentsContext.Provider value={{ comments, setComments, getComments }}>
      {props.children}
    </commentsContext.Provider>
  );
}

export default CommentsContext;