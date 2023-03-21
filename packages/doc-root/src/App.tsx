import { NavLink, Route, Routes } from 'react-router-dom';
import styles from "./App.module.scss";
import { ContextExample } from './components/ContextExample';
import { FormModelExample } from './components/FormModelExample';
import { UseEffectStrangeExample } from './components/UseEffectStangeExample';


function App()
{
  return (
    <div className="App">
      <div className={styles.list}>
      <NavLink to="/">home</NavLink>
      <NavLink to="/form">form exmaple</NavLink>
      <NavLink to="/context">context rerender example</NavLink>
      <NavLink to="/useEffectStrange">useEffect strange example</NavLink>
      </div>
      <Routes>
        <Route path="/form" Component={FormModelExample} />
        <Route path="/context" Component={ContextExample}/>
        <Route path="/useEffectStrange" Component={UseEffectStrangeExample}/>
        <Route path="/" Component={null}></Route>
      </Routes>
    </div>
  )
}

export default App;
