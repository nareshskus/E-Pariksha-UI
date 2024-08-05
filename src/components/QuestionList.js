import { QuestionCard } from './QuestionCard'

const QuestionList = ({questions}) => {

  const reverseData = [...questions].reverse();
  return (
    <div>
        <h2>Questions</h2>
        <ul>
            {reverseData.map(question =>(
                <li key={question.questionId}>
                    <QuestionCard question={question}/>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default QuestionList