import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
const url =''

//3 categories that we want
const table = {   
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //states
  const[waiting,setWaiting] = useState(true)    //showing the first page (SetupForm)
  const[loading,setLoading] = useState(false)
  const[quiz,setQuiz] = useState({              //the default values for the first page
    amount:10,
    category:'sports',
    difficulty:'easy'
  })
  const[questions,setQuestions] = useState([])
  const[index,setIndex] =useState(0)   //index in first question is zero
  const[correct,setCorrect] = useState(0)    //count the correct answers
  const[error,setError] = useState(false)
  const[isModalOpen,setIsModalOpen] = useState(false)

  //fetch data from API
  const fetchQuestions = async(url) =>{
    setLoading(true)
    setWaiting(false)   
    try{
      const response = await fetch(url)
      const data = await response.json()
      console.log(data.results)
      //we want the fetch happens after clicking start button on the first page so we are not going to fetch the data here
      if(data.results.length > 0){
        setQuestions(data.results)
        setWaiting(false)
        setLoading(false)
        setError(false)
      }else{
        setWaiting(true)
        setError(true)
      }
    }catch(error){
      console.log(error)
      setError(true)
      setWaiting(true)
    }
    
  }

  const handleStart = (e)=>{
    e.preventDefault()
    console.log("start clicked")
    setIndex(0)
    if(quiz.amount<1 || quiz.amount>50 || isNaN(quiz.amount)){
      console.log("error")
      setError(true)
      setWaiting(true)
    }
    else{
      console.log("show api")
      const { amount, category, difficulty } = quiz
      const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}`
      fetchQuestions(url)
    }

  }

  const openModal=()=>{
    setIsModalOpen(true)
  }

  const closeModal =()=>{
    setWaiting(true)   //go to the SetupForm
    setCorrect(0)
    setIsModalOpen(false)
    setQuiz({
      amount:10,
      category:'sports',
      difficulty:'easy'
    })
  }

  const nextQuestion =() =>{
    setIndex((oldIndex)=>{
      const index = oldIndex +1
      if(index > questions.length-1){    //index begins with 0--if we reaches the last question,then open the modal
        openModal()
      }
      else{   //we didn't reach the end of questions
        return index
      }
    })
  }

  const checkAnswer = (value) =>{
    if(value){  //if user answers the question
      setCorrect((oldState)=>oldState+1)
    }
    nextQuestion()
  }

  return <AppContext.Provider value={{loading,setLoading,quiz,setQuiz,isModalOpen,correct,index,error,setError,questions,setQuestions,handleStart,checkAnswer,openModal,closeModal,nextQuestion,checkAnswer,waiting}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
