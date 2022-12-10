//Modal--the answer page
import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const{isModalOpen,correct,questions,closeModal} = useGlobalContext()
  console.log(correct)
  console.log(questions.length)  //same as index

  const correctAnswerPercentage = ()=>{
    const percentage = ((correct/questions.length)*100).toFixed(0)  //The toFixed() method converts a number to a string and rounds the string to a specified number of decimals.
    return percentage
  }  
  return(
    <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className='modal-content'>
        <h2>congrats!</h2>
        <p>You answered {correctAnswerPercentage()}% of questions correctly</p>
        <button className='close-btn' onClick={closeModal}>play again</button>
      </div>
    </div>
  )
}

export default Modal
