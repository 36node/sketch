import React from "react";
import { connect } from "react-redux";

import { listPets } from "../actions";
import { selectPets } from "../selectors";

import { withMainLayout } from "./layout";
import { Container, Jumbotron } from "../components/layout";

@withMainLayout
@connect(state => ({
  pets: selectPets(state),
}))
export default class extends React.PureComponent {
  componentDidMount() {
    this.listPets();
  }

  listPets = () => {
    this.props.dispatch(listPets({ org: "36node" }));
  };

  render() {
    const { pets } = this.props;
    return (
      <Container>
        <Jumbotron> Pets in store. </Jumbotron>
        <div>
          {pets.map(pet => (
            <div key={pet.id}>{pet.name}</div>
          ))}
        </div>
      </Container>
    );
  }
}
