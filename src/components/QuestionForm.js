import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newQuestion) => {
        props.setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {[0, 1, 2, 3].map((index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text" 
              name={`answers[${index}]`}
              value={formData.answers[index]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  answers: formData.answers.map((answer, i) =>
                    i === index ? e.target.value : answer
                  ),
                })
              }
            />
          </label>
        ))}
       
       
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {[0, 1, 2, 3].map((index) => (
              <option key={index} value={index}>
                {formData.answers[index] || `Answer ${index + 1}`}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
