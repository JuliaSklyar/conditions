class Conditions extends React.Component {

  render () {
    const {conditions} = this.props;
    let listOfConditions;

    if (conditions && conditions.length) {
      listOfConditions = conditions.map((condition, index) => {
        return (
          <li
            className="list-group-item"
            key={index}
            onClick={() => this.props.handleOnClick(condition)}>
            Cui: {condition.cui}, Label: <b>{condition.label}</b>, Number of Synonyms: {condition.synonyms.length}
          </li>
        );
      });
    }

    return (
      <ul className="list-group">
        {listOfConditions}
      </ul>
    );
  }
}

Conditions.propTypes = {
  conditions: React.PropTypes.array,
  handleOnClick: React.PropTypes.func
};
