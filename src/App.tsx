/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import Com from './com'
import { getData } from './redux'
function App() {
  const [login, setLogin] = useState(true)
  const [loadin, setLoading] = useState(false)
  const [name, setName] = useState('')
  const studentdata = useSelector((state: any) => state.studentdata)
  const dispatch = useDispatch()
  const handelsubmit = function () {
    setLogin(false)
    setLoading(true)
    dispatch(getData(name))
  }

  return (
    <div className='app'>
      {login ? (
        <div>
          <input
            type='text'
            placeholder='name'
            name='name'
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button onClick={handelsubmit}>login</button>
        </div>
      ) : (
        <div>
          <Com studentdata={studentdata} setLogin={setLogin}></Com>
        </div>
      )}
    </div>
  )
}

export default App
