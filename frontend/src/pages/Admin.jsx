import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import confirmsvg from '../assets/confirm.svg'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AsteriskIcon } from 'lucide-react';
const Admin = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'))
  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [obj, setobj] = useState({})
  const[configobj, setconfigobj] = useState({})
  const [maintenancetoggle, setmaintenacetoggle] = useState(false)
    const [messagetoggle, setmessagetoggle] = useState(false)
    const [messageinput, setmessageinput] = useState("")

useEffect(()=>{
    populateConfig()
  }, [])
  const consoledate = (value) => {
    console.log('Local date:', value)
    const utc = dayjs(value).toISOString()
    console.log('UTC ISO:', utc)
  }

  const prepareObj = (customDate, customTitle, customSubject) => {
    if (customDate && customTitle && customSubject) {
      const OBJ = {
        title: customTitle,
        subject: customSubject,
        date: dayjs(customDate).toISOString(),
        votes: 0,
        closed: false,
      }

      return OBJ
    }
  }

const confirmSubmit = () =>{
  if (!confirm("Potvrda unosa?")) {
    return
  }

const objlast = prepareObj(date, title, subject)
  console.log("last obj", objlast)
  axios.post("http://localhost:3000/api/items/", objlast).then((response)=>{
    console.log(response)
    if (response.status === 201) {
      toast.success("USPESAN UNOS")
      setTimeout(() => {
        navigate("/")
      }, 1200);
    } else {
      toast.error("Greska")
    }
  })

  
}


const populateConfig = async () =>{
  const response = await axios.get("http://localhost:3000/api/config")
if (response.status === 200) {
  setconfigobj(response.data)
  console.log(response.data)
  setmaintenacetoggle(response.data.maintenance)
  setmessagetoggle(response.data.enablemessage)
  setmessageinput(response.data.message)

}
}



const confirmConfigEdit = async () => {
  if (!confirm("Izmeni konfiguraciju?")) {
    return
  }
  const body = {
    maintenance: maintenancetoggle,
    enablemessage: messagetoggle,
    message: messageinput
  }

try {
    const response = await axios.put("http://localhost:3000/api/config/690270cba549a5a9da9f3b48", body)
  if (response.status === 200) {
    toast.success("USPESNO!")
  } else {
    toast.error("GRESKA")
  }
} catch (error) {
  toast.error("GRESKA!")
}
}
  useEffect(() => {
    // update object whenever any field changes
    prepareObj(date, title, subject)
  }, [date, title, subject])


  

  return (
    <div>
      <h2>Admin</h2>

      <input
        type="datetime-local"
        id="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value)
          consoledate(e.target.value)
        }}
      />
      <br />

      <input
        type="text"
        id="title"
        placeholder="Naslov"
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        type="text"
        id="subject"
        placeholder="Predmet"
        className="input"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <br />








      <button
        className="btn btn-success"
        onClick={() => [ confirmSubmit()]}
      >
        SAČUVAJ
      </button>




      <div className="mt-5">

        <h2>CONFIG</h2>
<label className='font-bold' htmlFor="config-maintenance">MAINTENANCE</label>
<input checked={maintenancetoggle} onChange={(e)=>{setmaintenacetoggle(e.target.checked)}} className='w-[30px] h-[30px] accent-blue-600 rounded-md border-2 border-gray-400 checked:border-blue-600 focus:ring-2 focus:ring-blue-500' type='checkbox' id='config-maintenance'/>
      <br />

      <label className='font-bold' htmlFor="config-messagecheck">SHOW MESSAGE</label>
<input checked={messagetoggle} onChange={(e)=>{setmessagetoggle(e.target.checked)}} className='w-[30px] h-[30px] accent-blue-600 rounded-md border-2 border-gray-400 checked:border-blue-600 focus:ring-2 focus:ring-blue-500' type='checkbox' id='config-messagecheck'/>
<br></br>
  <label className='font-bold' htmlFor="config-textbox">MESSAGE</label>
<textarea value={messageinput} onChange={(e)=>{setmessageinput(e.target.value)}} style={{border: "1px solid black"}} id='config-textbox'/>





<br></br>


      <button
        className="btn btn-success"
        onClick={() => [ confirmConfigEdit()]}
      >
        SAČUVAJ
      </button>
      </div>
    </div>
  )
}

export default Admin
