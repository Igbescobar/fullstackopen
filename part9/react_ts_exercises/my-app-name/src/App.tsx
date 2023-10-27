
const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBaseDescriptive extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartBaseDescriptive {
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartBaseDescriptive {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CourseRequirements extends CoursePartBaseDescriptive {
    requirements: string[];
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseRequirements;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>
  }

  const Content = ({ content }: { content: CoursePart[] }) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
    return (
      content.map((cont) => {
        switch (cont.kind) {
          case 'basic':
            return (
              <div>
                <p style={{ fontWeight: "bold" }}> {cont.name} {cont.exerciseCount} </p >
                <p style={{ fontStyle: 'italic' }}>{cont.description}</p>
              </div>
            )
          case 'group':
            return (
              <div>
                <p style={{ fontWeight: "bold" }}>{cont.name} {cont.exerciseCount} </p>
                <p>Project exercise {cont.groupProjectCount}</p>
              </div>
            )
          case 'background':
            return (
              <div>
                <p style={{ fontWeight: "bold" }}>{cont.name} {cont.exerciseCount} </p>
                <p style={{ fontStyle: "italic" }}>{cont.description}</p>
                <p>submit to {cont.backgroundMaterial}</p>
              </div>
            )
          case 'special':
            return (
              <div>
                <p style={{ fontWeight: "bold" }}>{cont.name} {cont.exerciseCount} </p>
                <p style={{ fontStyle: "italic" }}>{cont.description}</p>
                <p>Required skills: {cont.requirements.join(', ')}</p>
              </div>
            )
          default: assertNever(cont)
        }
      }))
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