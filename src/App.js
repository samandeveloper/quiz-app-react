import React from 'react'
import { useGlobalContext } from './context'
import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  //bring from the context.js file
  const{quiz,waiting,loading,index,questions,correct,checkAnswer,nextQuestion} = useGlobalContext()

  console.log(quiz.amount)
  console.log(index)  //index begins from 0
  console.log(questions.length)

  if(loading){
    return <Loading />
  }
  if(waiting){
    return <SetupForm />
  }

  //we have to write the below line as object and || [] to not receive error for the first render of undefined answer
  const { question:question, incorrect_answers:incorrect_answers, correct_answer:correct_answer } = questions[index] ||[]
  console.log(incorrect_answers)
  //all answers in the four buttons
  //the two line below is written since we can not iterate for incorrect_answers directly
  let incorrectAnswerValue = Object.values(incorrect_answers || [])
  let answers = [...incorrectAnswerValue]  
  const correctAnswer = correct_answer
  const randomAnswer = Math.floor(Math.random()*4)  
    if(randomAnswer === 3){
      answers.push(correctAnswer)
    }else{
      answers.push(answers[randomAnswer])
      answers[randomAnswer] = correctAnswer
    }

    if(typeof(index) === 'undefined'){
    console.log("modal")
    return <Modal/>
    }
    
    else{
      return(
        <main>
          <section className='quiz'>
            <p className='correct-answers'>correct answer : {correct}/{index} </p>
            <article className='container' key={index}>
              <h2>{question}</h2>
                <div className='btn-container'>
                  {answers.map((answer,index)=>{
                    return <button className='answer-btn' key={index} onClick={()=>checkAnswer(correctAnswer === answer)}>{answer}</button>
                  })}
                </div>
              </article>
              <button className='next-question' onClick={nextQuestion}>next question</button>
          </section>
        </main>
      )
    }
}

export default App
