var Header = React.createClass({
  render: function () {
    return (
      <header className="bar bar-nav">
        <h1 className="title">{this.props.text}</h1>
      </header>
      )
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {searchKey: ""};
  },

  searchHandler: function(event) {
    console.log("value======>", event.target.value);
    var searchKey = event.target.value;
    this.setState({searchKey: searchKey});
    this.props.searchHandler(searchKey);
  },
  render: function() {
    return (
      <div className="bar bar-standard bar-header-secondary">
        <input type="search" value={this.state.symbol} onChange={this.searchHandler}/>
      </div>
      )
  }
});

var EmployeeListItem = React.createClass({
  render: function() {
    return (
      <li className="table-view-cell media">
        <a href={"#employees/" + this.props.employee.id} >
          <img className="media-object small pull-left" src={'images/' + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg"}/>
        {this.props.employee.firstName} {this.props.employee.lastName}
        <p>{this.props.employee.title}</p>
        </a>
      </li>
      )
  }
});


var EmployeeList = React.createClass({
  render: function() {

    var items = this.props.employees.map(function(employee) {
      return (
        <EmployeeListItem key={employee.id} employee={employee} />
        )

    });

    return (
      <ul className="table-view">
      {items}
      </ul>
      )
  }
});

var HomePage = React.createClass({
  getInitialState: function() {
    return {employees: []}
  },
  searchHandler:function(key) {
    this.props.service.findByName(key).done(function(result) {
      this.setState({searchKey: key, employees: result});
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <Header text="Employee Directory"/>
        <SearchBar searchHandler={this.searchHandler}/>
        <div className="content">
          <EmployeeList employees={this.state.employees}/>
        </div>
      </div>
      );
  }
});


var EmployeePage = React.createClass({
  getInitialState: function() {
    return {employee: {}};
  },

  componentDidMount: function() {
    this.props.service.findById(this.props.employeeId).done(function(result) {
      this.setState({employee: result});
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <Header text="Employee Detail" />
        <h3>{this.state.employee.firstName} {this.state.employee.lastName}</h3>
        {this.state.employee.title}
      </div>
      )
  }
});

router.addRoute('', function(){
  React.render(<HomePage service={employeeService}/>, document.body);
});

router.addRoute('employees/:id', function(id){
  React.render(<EmployeePage employeeId={id} service={employeeService}/>, document.body);
});

router.start();

