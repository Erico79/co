import React, { Component } from "react";
import { Button, Row, Col, FormGroup, Input, Label } from "reactstrap";

import "./MerryGoRound.css";

const initialState = {
  shuffling: false,
  boxes: [],
  no_of_boxes: 0,
  winning_box: null,
  selected: []
};

class MerryGoRound extends Component {
  state = initialState;

  shuffle = () => {
    if(!this.state.no_of_boxes){
      alert('You must specify the number of participants first!');
      return;
    }
    
    const a = [];
    for (let x = 0; x < this.state.no_of_boxes; x++) {
      a[x] = x + 1;
    }

    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.setState({
      boxes: a
    });
  };

  reset = () => {
    this.setState(initialState);
  };

  pickBox = box => {
    const selected = [...this.state.selected];
    selected.push(box);
    this.setState({ selected });

    if (box === 1) {
      this.setState({ winning_box: box });
    }
  };

  setParticipants = event => {
    this.setState({ ...initialState, no_of_boxes: event.target.value });
  };

  disabled = box => {
    return this.state.selected.includes(box) && box !== this.state.winning_box;
  };

  render() {
    return (
      <div className="MerryGoRound text-center">
        <h1 className="display-7">Merry go Round</h1>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="exampleEmail" className="font-weight-bold">Number of Players</Label>
              <Input
                type="number"
                placeholder="Number of Players"
                min="1"
                onChange={this.setParticipants}
                className="font-weight-bold"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="controls">
          <Col md="6" className="mb-2">
            <Button
              disabled={this.state.shuffling}
              color="success"
              size="lg"
              onClick={this.shuffle}
            >
              <i className="fa fa-play" /> Shuffle
            </Button>
          </Col>
          <Col md="6">
            <Button color="danger" size="lg" onClick={this.reset}>
              <i className="fa fa-stop" /> Reset
            </Button>
          </Col>
        </Row>
        <hr />
        <Row className="boxes">
          {this.state.boxes.map((box, index) => {
            const box_no = index + 1;
            return (
              <Col md="6" key={index}>
                <Button
                  color={
                    box === this.state.winning_box ? "success" : "secondary"
                  }
                  size="lg"
                  onClick={() => this.pickBox(box)}
                  disabled={this.disabled(box)}
                >
                  {box !== this.state.winning_box ? (
                    this.state.selected.includes(box) ? (
                      <React.Fragment>
                        You Lost! <i className="fa fa-close" />
                      </React.Fragment>
                    ) : (
                      `Box: ${box_no}`
                    )
                  ) : (
                    <React.Fragment>
                      You Won! <i className="fa fa-smile-o" />
                    </React.Fragment>
                  )}
                </Button>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default MerryGoRound;
