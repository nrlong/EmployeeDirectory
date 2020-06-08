import React, {Component} from "react";
import SearchBar from "./SearchBar";
import EmployeeInfo from "./EmployeeInfo";
import API from "../utils/Api";

class ListResults extends Component {
    state={
        result: [],
        filter: "",
        filterBy: "lastName",
        currentSort: "default",
        sortField: ""
    }

    componentDidMount(){
        API.search()
        .then(res => {
            console.log(res)
            this.setState({
                result: res.data.results.map((e, i) => ({
                    lastName: e.name.last,
                    firstName: e.name.first,
                    email: e.email,
                    phone: e.phone,
                    key: i,
                    picture: e.picture.medium
                }))
            })
        })
        .catch(err => console.log(err));
    }
    
    filterEmployees = (searchkey) => {
        console.log(searchkey);
        console.log(this.state.result);
        let filterResult = this.state.result.filter(person => person.lastName === searchkey)

        this.setState({
            result:filterResult
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        console.log(value);
        console.log(name);

        this.filterEmployees(value);
        this.setState({
            [name]: value
        });
        this.filterEmployees(value);
        this.filterEmployees(this.state.search);
    };

    handleInputChange = event => {
        event.preventDefault();
        console.log(event);
        const value = event.target.value;
        const name = event.target.name;
        console.log(value);
        console.log(name);
        this.setState({
            [name]: value
        });
    };

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className ="col-md-12">
                        <h2>Employee Directory</h2>
                    </div>
                </div>

                <div className="row">
                <div className ="col-md-6">
                    <SearchBar 
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    />
                </div>
                </div>
                <div className="row">
                    <table className="table">
                    <tr className="title-col">
                    <th>Last Name</th>
                    <th scope="col">First Name </th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Photo</th>
              </tr>
                {[...this.state.result].map((item) =>
                <EmployeeInfo
                lastName={item.lastName}
                firstName={item.firstName}
                email={item.email}
                phone={item.phone}

                key={item.key}
                picture={item.picture}
                />
                )}

                </table>
            </div>
            
            </div>
            
        )
    }
};


export default ListResults;