import React from "react";

class CustomerDelete extends React.Component{

    //api 함수
    deleteCustomer(id) {
        const url = '/api/customers/' + id; // /api/cutomers/7 => 7번 고객 삭제
        fetch(url,{
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }


    render(){
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }

}

export default CustomerDelete;