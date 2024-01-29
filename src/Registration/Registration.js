import React, { useState } from 'react'
import './Registration.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'

export default function Registration() {

  const [show,setShow] = useState(true);

  const [allData, setAllData] = useState([{}]);

  const [buttonstate, setButtonState] = useState(true)

  const [input, setInput] = useState({
    fname:'',
    emailid:'',
    pass:'',
    contact:'',
    age:'',
    dob:''
  })

  const [index, setIndex] = useState(0);


  function getInputData(e)
  {
    let target = e.target
    let value = target.value
    let key = target.name

    return(
      setInput((old)=>{
          return{
              ...old,
              [key] : value
          }
      })
    )
  }


  // getData or Fetch Data

  let temp ={}

  const getData =(e)=>{
    e.preventDefault();
    let event = e.target;
    // let event = e.target.value;
    // console.log(event);

    let formData = new FormData(event);
    // console.log(formData);

    // fetch data one by one

    // console.log(formData.get("fname"))
    // console.log(formData.get("emailid"))
    // console.log(formData.get("pass"))
    // console.log(formData.get("contact"))
    // console.log(formData.get("age"))
    // console.log(formData.get("dob"))
    // console.log(formData.get("photo"))


    for(let data of formData.entries())
    {
      // console.log(data)

      let key = data[0]
      let value = data[1]

      // console.log(value)
      // console.log(typeof(value))

      if(typeof(value) == 'object')
      {
        value = URL.createObjectURL(value)
      }

      // console.log(value)

      temp[key] = value
      // console.log(temp)

    }

    // return(
    //   setAllData((old)=>{
    //     return[
    //       ...old,
    //       temp
    //     ]
    //   }),
    //   setShow(false)
    // )

  }



  function insertData(e)
  {
    e.preventDefault();
    // alert("Insert Data");
    getData(e);

      return(
        setAllData((old)=>{
          return[
            ...old,
            temp
          ]
        }),
        setShow(false)
      )
    
  }



  function updateData(e)
  {
    e.preventDefault();
    // alert(index)
    getData(e);

    const tempData = [...allData]
    tempData[index] = temp

    return(
      setShow(false),
      setAllData(tempData)
    )
  }



  function editUser(item)
  {
      return(
        setShow(true),
        setInput(item),
        setButtonState(false),
        setIndex(item.index)
      )
  }



  function deleteUser(index)
  {
    // console.log(index)
    // [...allData].splice(index);

    let tempdata =[...allData];
    // console.log(tempdata)

    tempdata.splice(index,1);
    // console.log(tempdata)

    return(
      setAllData(tempdata)
    )

  }



  function addButton()
  {
    return(
      setShow(true),
      setInput({
        fname :'',
        emailid :'',
        pass:'',
        contact :'',
        age :'',
        dob :''
      }),
      setButtonState(true)
    )
  }



  function Tr({item})
      {
        return(

          <>

            <tr className='text-center'>
              <td>{item.index+1}</td>
              <td><img src={item.photo} alt='' width={50} height={50} className='rounded-circle'></img></td>
              <td>{item.fname}</td>
              <td>{item.emailid}</td>
              <td>{item.pass}</td>
              <td>{item.contact}</td>
              <td>{item.age}</td>
              <td>{item.dob}</td>
              <td>

                <Button className='me-2' onClick={()=>(editUser(item))}>

                  <i className='fa fa-edit'></i>

                </Button>

                <Button variant='danger' onClick={()=>{deleteUser(item.index)}}>

                  <i className='fa fa-trash'></i>

                </Button>

              </td>
            </tr>
          
          </>
        )
      }

      
  return (
    <>

      <h1 className='text-center'>User Details</h1>


      <Modal show={show} onHide={()=>setShow(false)}>

        <Modal.Header closeButton>

          <Modal.Title className='text-center'>Registration Form</Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={buttonstate ? insertData : updateData}>

            <Form.Group>

              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='fname' placeholder='Enter Your Full Name' onChange={getInputData} value={input.fname}/>

            </Form.Group>

            <Form.Group>

              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='emailid' placeholder='Enter Your Email Id' onChange={getInputData} value={input.emailid}/>

            </Form.Group>

            <Form.Group>

              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='pass' placeholder='Enter Your Password' onChange={getInputData} value={input.pass}/>

            </Form.Group>

            <Form.Group>

              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type='tel' name='contact' placeholder='Enter Your Mobile Number' onChange={getInputData} value={input.contact} />

            </Form.Group>

            <Form.Group> 

              <Form.Label>Age</Form.Label>
              <Form.Control type='number' name='age' placeholder='Enter Your Age' onChange={getInputData} value={input.age} />
           
            </Form.Group>

            <Form.Group> 

              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control type='date' name='dob' placeholder='Enter Your Date Of Birth' onChange={getInputData} value={input.dob} />
              
            </Form.Group>

            <Form.Group>

              <Form.Label>Profile Photo</Form.Label>
              <Form.Control type='file' name='photo'/>

            </Form.Group>

            <br/>

            <Form.Group>

              {

                buttonstate ? <Button type='submit' variant='success'>Submit</Button> :
                <Button type='submit' variant='success'>Update</Button> 

              }

              <Button type='reset' variant='danger' className='mx-2' onClick={()=>(setShow(false))}>Cancel</Button>

            </Form.Group>

          </Form>

           {/* <p>{JSON.stringify(input)}</p> */}

        </Modal.Body>

        {/* <Modal.Footer>

          <Button variant='danger' onClick={() => setShow(false)}>

            <i className='fa fa-close'></i> Close

          </Button>

        </Modal.Footer> */}

      </Modal>

      {/* <p>{console.log(alldata)}</p> */}
      {/* <p>{JSON.stringify(alldata)}</p> */}


      <Container>

        <Table striped bordered hover>

          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile No.</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              allData.map((item,index)=>{
                item['index'] = index;
                return <Tr item={item} key={index} />
              })
            }

          </tbody>

        </Table>

      </Container>


      <Button className='position-absolute mb-3 me-4 bottom-0 end-0 rounded-circle' onClick={addButton}>

          <i className="fa-solid fa-plus"></i>
      
      </Button>
      
    </>
  )
}
