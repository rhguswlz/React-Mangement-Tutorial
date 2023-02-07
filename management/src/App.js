import logo from './logo.svg';
import './App.css';
import Customer from './components/Customers';

const customers = [
  {
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '홍길동',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
  },
  {
    'id' : 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name' : '고현지',
    'birthday' : '950907',
    'gender' : '여자',
    'job' : '프로그래머'
  
  },
  {
    'id' : 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name' : '고도리',
    'birthday' : '950101',
    'gender' : '여자',
    'job' : '은행원'
  }

]

function App() {
  return (
    <div>
      {customers.map(c =>{return(<Customer key={c.id} id={c.id} iamge={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/> );})}
    </div>
  );
}

export default App;
