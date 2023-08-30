import { useState } from 'react'

const Statistics = ({ good, neutral, bad, total, score }) => {
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={score / total} />
        <StatisticLine text="positive" value={`${((good / total) * 100).toFixed(2)}%`} />
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}
const Button = ({ handleBad, handleGood, handleNeutral }) => {
  return (
    <div>
      <button onClick={handleGood}>Good! </button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setScore(score + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setScore(score - 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleGood={handleGood} handleBad={handleBad} handleNeutral={handleNeutral} />
      <Statistics good={good} bad={bad} score={score} total={total} neutral={neutral} />
    </div>
  )
}

export default App