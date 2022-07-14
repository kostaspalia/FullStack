const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
{
  const total = parts.reduce((s, p) => {
    return (s+p.exercises)
  },0)
  return <>
    {parts.map(part => <Part key={part.id} part={part} />)}
    <p>total of {total} exercises</p>
  </>
  
}

const Course = ({course}) =>
  <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
  </>

export default Course
