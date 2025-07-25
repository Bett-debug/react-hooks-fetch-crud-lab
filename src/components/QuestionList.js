import React from "react";
import { useState,useEffect } from "react";
import QuestionItem from "./QuestionItem";


const API='http://localhost:4000/questions'



function QuestionList() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
    
  }, []);

  function handleDelete(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE"
  }).then(() => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  });
  }

//patch request to update a question
function handleUpdate(id, updatedQuestion) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {  
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedQuestion),
  })
    .then((response) => response.json())
    .then((data) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? data : question
        )
      );
    })
  }


  return (
    <>  
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {loading ? (
          <p>Loading questions...</p>
        ) : (
          questions.map((question) => (
            <li key={question.id}>
            <QuestionItem
              key={question.id}
              question={question}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              />
            </li>

             
            

            

          ))
        )}
      </ul>
    </section>
    </>

    


  );
}

export default QuestionList;
