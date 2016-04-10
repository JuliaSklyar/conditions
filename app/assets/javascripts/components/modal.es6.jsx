class Modal extends React.Component {

  render () {
    const {synonyms} = this.props;
    let listOfSynonyms = <div>There is no synonyms for this condition</div>;

    if (synonyms && synonyms.length) {
      listOfSynonyms =
        <ul className="list-group">
          {synonyms.map((synonym, index) => {
            return (
              <li
                className="list-group-item"
                key={index}>
                {synonym}
              </li>
            );
          })}
        </ul>
    }

    return (
      <div id="modal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Synonyms</h4>
            </div>
            <div className="modal-body">
              {listOfSynonyms}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  synonyms: React.PropTypes.array,
};
