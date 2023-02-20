import React from "react";
import axios from 'axios';

class CustomerAdd extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file : null,
            userName : '',
            birthday : '',
            gender :'',
            job :'',
            fileName : ''
        }
    }

    //e : 이벤트를 전달받음
    handleFormSubmit = (e) => {
        e.preventDefault() //데이터가 서버가 전달됨에 있어 오류가 발생하지않도록
        this.addCustomer()
            .then((response) =>{
                console.log(response.data)
                this.props.stateRefresh();
            })
        //데이터 전달했으니 init
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender :'',
            job :'',
            fileName : ''
        })
        //새로고침해서 고객정보를 다시 받아옴
        //하지만 react는 SPA(single-page-applicaiton)이어서 전체 페이지를 리로드 하는건 아주 비효율적
        //고객추가컴포넌트에서 부모컴포넌트의 상태를 변경하는 식으로 필요한 부분만 새로고침할 수 있도록 해야함
        //부모컴포넌트에서 자식컴포넌트로 함수를 props 형태로 건네주는 방식으로 함(위에 stateRefresh)
        //window.location.reload();
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        //파일이 포함되어있는 데이터를 서버로 전송하고자하려면 웹표준에 맞는 헤더를 만들어주어야함
        const config = {
            headers: {
                'content-type': 'multipart/form-data' //전달하고자하는 데이터가 multipart/form-data다
            }
        }
        return axios.post(url, formData, config);
    }

    handleFileChange = (e) => {
        //state에 있는 값을 변경
        this.setState({
            //file의 첫번째 값 (파일을 여러개 올릴 수 있을 때 때문에 배열로 되어있지만, 우리는 하나만 올릴 수 있도록 할 것이니 0만 가져오면됨)
            file: e.target.files[0],
            fileName: e.target.value
        })
    } 

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState); //state값을 바꿔줌

    }

    render(){
        return(
            //고객추가버튼을 눌렀을 때 handleFormSubmit가 수행 //handleFormSubmit가 양식전송 함수 
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name ="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;