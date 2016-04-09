class Conditions extends React.Component {
  render () {
    const {conditions} = this.props;
    console.log('conditions', conditions);
    return (
      <ul className="list-group">
        {conditions && conditions.length && conditions.map((condition, index) => {
          return (
            <li className="list-group-item" key={index}>
              Cui: {condition.cui}, Label: <b>{condition.label}</b>, Number of Synonyms: {condition.synonyms.length}
            </li>
          );
        })}
      </ul>
    );
  }
}

Conditions.propTypes = {
  conditions: React.PropTypes.array
};
