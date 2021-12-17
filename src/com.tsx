import React from 'react'
import { useSelector } from 'react-redux'

export default function Com(props: any) {
  const loading = useSelector((state: any) => state.load)
  let studentdata = props.studentdata
  let setLogin = props.setLogin
  return (
    <div>
      <button
        onClick={() => {
          setLogin(true)
        }}
      >
        logout
      </button>
      {!loading ? (
        Object.keys(studentdata).map((key1) => (
          <div className='border' key={key1}>
            <h1>{key1}</h1>
            <p>
              {studentdata[key1].map((i: string) => (
                <span key={i}> {i}</span>
              ))}
            </p>
          </div>
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  )
}
