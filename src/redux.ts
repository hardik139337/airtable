// import axios from 'axios'
import axios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export function getData(name: string) {
  return async (dispatch: any): Promise<void> => {
    dispatch({ type: 'loading', data: true })
    let { data } = await axios.get(
      `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=Name='${name}'`,
      {
        headers: {
          Authorization: 'Bearer keyzEOi9xKwbhrIoW',
        },
      }
    )

    let temp = ''
    for (let i of data.records[0].fields.Classes) {
      temp += `RECORD_ID()='${i}',`
    }

    let classdata = await axios.get(
      `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?filterByFormula=OR(${temp.slice(
        0,
        -1
      )})`,
      {
        headers: {
          Authorization: 'Bearer keyzEOi9xKwbhrIoW',
        },
      }
    )

    let temparr = []
    for (let i of classdata.data.records) {
      temparr.push(...i.fields.Students)
    }
    let totalstudent = Array.from(new Set(temparr))

    let tempofstudent = ''
    for (let i of totalstudent) {
      tempofstudent += `RECORD_ID()='${i}',`
    }

    let studentdata = await axios.get(
      `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=OR(${tempofstudent.slice(
        0,
        -1
      )})`,
      {
        headers: {
          Authorization: 'Bearer keyzEOi9xKwbhrIoW',
        },
      }
    )
    let studentdatajson: any = {}
    for (let i of studentdata.data.records) {
      studentdatajson[i.id] = i.fields.Name
    }
    let classdatajson: any = {}

    for (let i of classdata.data.records) {
      classdatajson[i.fields.Name] = i.fields.Students.map(
        (i: string) => studentdatajson[i]
      )
    }
    dispatch({ type: 'getdata', data: classdatajson })
    dispatch({ type: 'loading', data: false })
  }
}

function rootReducer(state = {}, action: any): {} {
  switch (action.type) {
    case 'getdata':
      return { ...state, studentdata: action.data }
    case 'loading':
      return { ...state, load: action.data }
    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
