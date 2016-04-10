class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allConditions: [],
      resultConditions: [],
      synonyms: []
    };
  }

  componentDidMount() {
    $.get('/api/conditions').done((data) => {
      this.setState({allConditions: data});
    })
  }

  getSynonym(synonyms, query) {
    return _.find(synonyms, (synonym) => {
      return synonym.toLocaleLowerCase().indexOf(query) !== -1;
    });
  }

  getResultConditions(query) {
    const {allConditions} = this.state;
    let resultConditions = [];

    if (!query) return resultConditions;
    
    resultConditions = _.chain(allConditions)
      .filter((condition) => {
        if (condition.label.toLocaleLowerCase().indexOf(query) !== -1) return true;
        if (condition.cui.toLocaleLowerCase().indexOf(query) !== -1) return true;

        const synonym = this.getSynonym(condition.synonyms, query);
        if (synonym) return true;

        return false;
      })
      .first(5)
      .value();

    return resultConditions;
  }

  handleOnChange(event) {
    const query = event.target.value.trim().toLocaleLowerCase();

    this.setState({resultConditions: this.getResultConditions(query)});
  }

  getSortedConditions() {
    const {resultConditions} = this.state;

    return _.sortBy(resultConditions, (condition) => {
      return condition.synonyms.length
    });
  }

  sortByAscending() {
    const sortedConditions = this.getSortedConditions();

    this.setState({resultConditions: sortedConditions});
  }

  sortByDiscending() {
    const sortedConditions = this.getSortedConditions().reverse();

    this.setState({resultConditions: sortedConditions});
  }

  handleOnConditionClick(condition) {
    this.setState({synonyms: condition.synonyms});
    $('#modal').modal('show');
  }

  render () {
    return (
      <div className="container">
        <h1>Enter a condition name</h1>
        <div className="row">
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              onChange={(event) => this.handleOnChange(event)}/>
            <br/>
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.sortByAscending()}>
                By Ascending
              </button>
              {' '}
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.sortByDiscending()}>
                By Discending
              </button>
            </div>
            <br/>
            <Conditions
              conditions={this.state.resultConditions}
              handleOnClick={(condition) => this.handleOnConditionClick(condition)}
            />
            <Modal synonyms={this.state.synonyms}/>
          </div>
        </div>
      </div>
    );
  }
}