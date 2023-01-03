import { Fragment } from 'react';
import { Container, Button, Row, Col, Navbar, ListGroupItem, ListGroup, ButtonGroup } from 'react-bootstrap';
import './App.css';

type ProblemType = {
  statement: (n: number) => string,
  answer: (a: number, b: number, n: number) => boolean,
}
const Increase: ProblemType = { statement: (n: number) => `${n}% 이상 증가하였다.`, answer: (a, b, n) => ((b / a) >= (1 + n / 100)) }
const Decrease: ProblemType = { statement: (n: number) => `${n}% 이상 감소하였다.`, answer: (a, b, n) => ((b / a) <= (1 - n / 100)) }
const Over: ProblemType = { statement: (n: number) => `${n}배가 넘는다.`, answer: (a, b, n) => ((b / a) >= n) }
const IncreaseEqual: ProblemType = { statement: (n: number) => `증가량이 ${n}%이다.`, answer: (a, b, n) => true } // TODO answer checker
const DecreaseEqual: ProblemType = { statement: (n: number) => `감소량이 ${n}%이다.`, answer: (a, b, n) => true } // TODO answer checker
const IncreaseLess: ProblemType = { statement: (n: number) => `증가량이 ${n}%보다 적다.`, answer: (a, b, n) => true } // TODO answer checker
const DecreaseMore: ProblemType = { statement: (n: number) => `감소량이 ${n}%보다 크다.`, answer: (a, b, n) => true } // TODO answer checker

const ProblemTypes: ProblemType[] = [
  Increase,
  Decrease,
  Over,
  IncreaseEqual,
  DecreaseEqual,
  IncreaseLess,
  DecreaseMore,
]

interface Problem {
  a: number,
  b: number,
  statement: string,
  answer: boolean,
}

function getProblem(): Problem {
  let a: number = Math.round(Math.random() * 1000000)
  let b: number = Math.round(Math.random() * 1000000)
  let n: number = Math.round(Math.random() * 100)
  let problem: ProblemType = ProblemTypes[Math.floor(Math.random() * ProblemTypes.length)]
  let statement: string = problem.statement(n)
  let answer = problem.answer(a, b, n)
  return { a: a, b: b, statement: statement, answer: answer }
}

function getProblems(n: number): Problem[] {
  let problems: Problem[] = Array.from(Array(n).keys()).map(_ => getProblem())
  return problems
}

function problemToJSX(p: Problem, idx: number): JSX.Element {
  // TODO save background color as a state
  return (
    <Row className="text-center align-items-center" key={idx.toString()}>
      <Col xs={3}><p style={{ margin: 0 }}>A = {p.a}</p></Col>
      <Col xs={3}><p style={{ margin: 0 }}>B = {p.b}</p></Col>
      <Col xs={3}><p style={{ margin: 0 }}>{p.statement}</p></Col>
      <Col>
        <ButtonGroup>
          <Button variant="primary" onClick={_ => console.log(p.answer === true)}>Y</Button>
          <Button variant="primary" onClick={_ => console.log(p.answer === false)}>N</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

function App() {
  let problems: JSX.Element[] = getProblems(10).map((p, idx) => <ListGroupItem>{problemToJSX(p, idx)}</ListGroupItem>)

  return (
    <Fragment>
      <Container style={{ width: "60vw", height: "100vh", flex: "1 0 0", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "auto", gap: 10 }}>
        <h5 className="display-5" style={{ textAlign: "center" }}>
          Number updown game
        </h5>
        <ListGroup>
          {problems}
        </ListGroup>
      </Container>
    </Fragment>
  );
}

export default App;
