class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allConditions: [],
      resultConditions: []
    };
  }

  componentDidMount() {
    $.get('/api/conditions').done((data) => {
      this.setState({allConditions: data});
      console.log('allConditions:', data);
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
    console.log('this', this);
    const query = event.target.value.trim().toLocaleLowerCase();

    this.setState({resultConditions: this.getResultConditions(query)});
  }

  render () {
    return (
      <div className="container">
        <h1>Enter a condition</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for..."
                onChange={(event) => this.handleOnChange(event)}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
            <br/>
            <Conditions conditions={this.state.resultConditions}/>
          </div>
        </div>
      </div>
    );
  }
}