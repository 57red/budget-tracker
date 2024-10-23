function BalanceSheet() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-primary bg-primary-subtle mb-3">
              <div className="card-header">Balance</div>
              <div className="card-body">
                <h5 className="card-title">${5000}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-success bg-successs-subtle mb-3">
              <div className="card-header">Total Income</div>
              <div className="card-body">
                <h5 className="card-title">${2500}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-warning bg-warning-subtle mb-3">
              <div className="card-header">Total Expenses</div>
              <div className="card-body">
                <h5 className="card-title">${2500}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BalanceSheet;
