import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";
import check from '../src/icons/done.png'
import box from '../src/icons/check.png'

function App() {
    // useState()
    const [plans, setPlans]=useState("")

    //  post request
    const addPlan=()=>{
        axios.post('http://localhost:3001/add', {
            plans:plans
        })
            .then((response)=>{
                // console.log(response.data)
                setPlanList([...planList, {
                    plans:plans}])
            })
    }

   //  get request
    const [planList, setPlanList]=useState([])

    const getList=()=>{
        axios.get('http://localhost:3001/lists', {
        })
            .then((response)=>{
                setPlanList(response.data)
            })
    }

  //  delete request
    const deletePlans=(id)=>{
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then((response)=>{
                // console.log(response.data)
                setPlanList(planList.filter((val)=>{
                    return val.id!==id
                }))
            })
    }

  //  put request
    const done=(id)=>{
        axios.put(`http://localhost:3001/done/${id}`, {isDone:1})
            .then((response)=>{
            })
    }

    // done or not
    const icon=(isDone)=>{
        if (isDone)
            return check
        return box
    }
    const pressDelete=async (id)=>{
        deletePlans(id)
        await getList()
    }

    const pressDone=async (id)=>{
        done(id)
        await getList()
    }

    const pressAdd=async ()=>{
        addPlan()
        await getList()
    }


    useEffect(()=>{
        console.log(1)
    },[planList])

  return (
    <div className="App">
      <div className="head">
          <h1>Make your plans for today quick and easy with us!</h1>
              <label>Input your plans:</label>
          <input placeholder="input..." required type="text" onChange={(event)=>{
              setPlans(event.target.value)
          }}/>
          <div className="addShow">
              <button onClick={pressAdd}>Add</button>
              <button onClick={getList}>SHOW</button>
          </div>
          {
              planList.map((val,key)=>{
                  return <div className="getPlan">
                      <div className="icon">
                          <img src={icon(val.isDone)}/>
                      </div>
                      <h3>{val.plans}</h3>
                      <div>
                          <button className="buttonDone" onClick={()=>{pressDone(val.id).then()}}>DONE</button>
                          <button className="buttonDelete" onClick={()=>{pressDelete(val.id).then()}}>DELETE</button>
                      </div>
                  </div>
              })
          }
      </div>

    </div>
  );
}

export default App;