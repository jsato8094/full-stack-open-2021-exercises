const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ course }) => {
  let total = course
    .parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b)
  return (
    <p>
      total of {total} excercises
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course