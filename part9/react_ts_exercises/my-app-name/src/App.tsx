
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>
  }

  interface ContentProps {
    name: string,
    exerciseCount: number,
  }

  const Content = ({ content }: { content: ContentProps[] }) => {
    return (
      <div>
        {content.map((content => (
          <p key={content.name}>{content.name} {content.exerciseCount}</p>
        )))}
      </div>
    )
  }

  const Total = ({ total }: { total: number }) => {
    return (
      <p>Number of exercises {total}</p>
    )
  }

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;