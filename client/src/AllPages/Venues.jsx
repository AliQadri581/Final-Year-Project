import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PicturesComp from "../PicturesComp";
import AmenityComp from "../AmenityComp";
import VenueForm from "./VenueForm";
import Account from "./Account";

function Venues() {
  const { event } = useParams();
  const [venueData, setVenueData] = useState([])
  // console.log(event);


  useEffect(() => {
    try {
      
      axios
        .get("/myVenues")
        .then(({data}) => { //data comes is an object key which has an array of objects, so we are destructuring data first then setting the array to setVenueData as it is
          
          console.log(data)
          return setVenueData(data) 
        })
    } catch (error) {
      console.log(error)
    }
      
  }, []);


  async function deleting(id){
    try {
      await axios.delete(`/deleteVenue/${id}`)

      setVenueData((prevData)=>prevData.filter((venue)=> venue._id!==id))
      
    } catch (error) {
      console.log({error: 'deletion unsuccessful'})
    }
  }

  return (
    <>
      {event !== "new" && (
        
          <>
         
            <Link
              className="inline-flex gap-1 items-center bg-purple-700 text-white py-2 m-4 px-6 rounded-full text-center text-xl font-bold"
              to={"/accPage/venues/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add a Venue
            </Link>
          <div className="m-6  flex flex-col items-start">
              <h1 className="text-4xl font-bold m-3 ">List of your all venues</h1>
              {

               venueData && venueData.length > 0 ? venueData.map((data)=>{
                  return (
                     
                    // <div key={data._id} className=" text-2xl m-2 shadow-md rounded-md overflow-hidden bg-white flex flex-col items-start">
                    //   <br />
                    //   <Link to={`/accPage/venues/${data._id}`} className="m-2 flex flex-col ">
                      
                    //     {data.category}
                    //     <br />
                    //     {data.title} 
                        
                      

                    //   </Link>
                    //   {data.existingPhotos.length > 0 && 
                      
                    //   <div key={data} className='flex h-40 '>
                    //   <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className=' w-full rounded-2xl'/>
                    //   </div>
                      
                    // }
                    // </div>

                    <div className="card m-2  shadow-lg rounded-xl text-2xl" style={{ width: '18rem' }}>
  <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{data.title}</h5>
    <p className="card-text">{data.description}</p>
    <div className="flex justify-between">
    <Link to={`/accPage/venues/new?id=${data._id}`} className="mt-2 btn bg-purple-700 text-white text-xl">{data.category}</Link>
    <button onClick={()=> deleting(data._id)} className="mt-2 ml-1 btn bg-red-600 text-white rounded-2xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button>
    </div>
  </div>
</div>
                    
                  )
                })
                : <p>You have no venues to show</p>
              }
             </div> 
          
          
            </>
      )}
      {event == "new" && (
        <div>
     

          <VenueForm />
        </div>
      )}
    </>
  );
}

export default Venues;
