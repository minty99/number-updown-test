import React from 'react';
import { Fragment } from 'react';
import { Container, Button, Row, Col, ListGroupItem, ListGroup, ButtonGroup } from 'react-bootstrap';
import './App.css';
import { Problem, genProblem } from './problems';

const LIGHT_GREEN: string = "#90EE90"
const LIGHT_RED: string = "#EE9090"
const WHITE: string = "#FFFFFF"

type ProblemRowProps = { problem: Problem, index: number, showAnswer: boolean }
type ProblemRowState = { solved: boolean, selected: boolean }

class ProblemRow extends React.Component<ProblemRowProps, ProblemRowState> {
  constructor(props: ProblemRowProps) {
    super(props);
    this.state = {
      solved: false,
      selected: true
    }
  }

  bgColor() {
    if (!this.state.solved) return WHITE
    else if (this.props.problem.answer === this.state.selected) return LIGHT_GREEN
    else return LIGHT_RED
  }

  render() {
    let a = this.props.problem.a
    let b = this.props.problem.b
    let statement = this.props.problem.statement
    let finished = this.state.solved || this.props.showAnswer
    let reason = this.props.problem.reason
    return (
      <ListGroupItem style={{ backgroundColor: this.bgColor() }}>
        <Row className="text-center align-items-center">
          <Col xs={3}><p style={{ margin: 0 }}>A = {a}</p></Col>
          <Col xs={3}><p style={{ margin: 0 }}>B = {b}</p></Col>
          <Col xs={3}><p style={{ margin: 0 }}>{statement}</p></Col>
          <Col xs={3}>
            <ButtonGroup style={{ display: (!finished) ? "flex" : "none" }}>
              <Button variant="success" onClick={() => this.setState({ solved: true, selected: true })}>Yes</Button>
              <Button variant="danger" onClick={() => this.setState({ solved: true, selected: false })}>No</Button>
            </ButtonGroup>
            <Button disabled={true} style={{ width: "100%", display: (finished) ? "block" : "none" }}>정답: {this.props.problem.answer ? "Yes" : "No"} ({reason})</Button>
          </Col>
        </Row>
      </ListGroupItem>
    )
  }
}

type ProblemListProps = { n: number }
type ProblemListState = { showAnswer: boolean, problems: Problem[] }

class ProblemList extends React.Component<ProblemListProps, ProblemListState> {
  constructor(props: ProblemListProps) {
    super(props);
    this.state = {
      showAnswer: false,
      problems: Array.from(Array(this.props.n).keys()).map(genProblem)
    }
  }

  render() {
    return (
      <Fragment>
        <ListGroup>
          {this.state.problems.map((p, idx) => <ProblemRow problem={p} index={idx} showAnswer={this.state.showAnswer} />)}
        </ListGroup>
        <Button variant="primary" onClick={() => this.setState({ showAnswer: true })}>모든 문제 답 보기</Button>
        <Button variant="primary" onClick={() => window.location.reload()}>다음 문제 보기</Button>
      </Fragment>
    )
  }
}

class Clock extends React.Component<{}, { seconds: number }> {
  timerId: NodeJS.Timer | undefined

  constructor(props: {}) {
    super(props);
    this.state = { seconds: 0 };
    this.timerId = undefined
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  render() {
    return (
      <h6 className="display-6" style={{ textAlign: "center" }}>
        {Math.floor(this.state.seconds / 60).toString().padStart(2, '0')}:{(this.state.seconds % 60).toString().padStart(2, '0')}
      </h6>
    );
  }
}


function App() {
  return (
    <Fragment>
      <Container style={{ width: "60vw", height: "100vh", flex: "1 0 0", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "auto", gap: 10 }}>
        <h5 className="display-5" style={{ textAlign: "center" }}>
          Number Updown Game
        </h5>
        <Clock />
        <ProblemList n={10} />
      </Container>
    </Fragment>
  );
}

export default App;
