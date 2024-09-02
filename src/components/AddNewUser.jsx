import { useState } from "react";
import axios from "axios";
import { AppState } from "../context/AppContext";
import LoaderOverlay from "./LoaderOverlay";
import { useNavigate } from "react-router-dom";

export default function AddNewUser() {
  //states for the fields

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongitude] = useState("");

  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const [cName, setCName] = useState("");
  const [catchPharse, setCatchPharse] = useState("");
  const [bs, setBs] = useState("");

  const [loadingOverlay, setLoadingOverLay] = useState(false);
  const {  userListDispatch } = AppState();
  const navigate = useNavigate();

  //handlers
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
    const dataSet = {
      name,
      username:userName,
      email,
      address:{
        street,
        suite,
        city,
        zipcode,
        geo:{
          lat:latitude,
          lng:longtitude
        }
      },
      phone,
      website,
      company:{
        name:cName,
        catchPhrase:catchPharse,
        bs
      }
    };

    setLoadingOverLay(true);
      axios.post("https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users", dataSet).then((res) => {
        setLoadingOverLay(false);
        userListDispatch({type:"add",data:res.data})
        alert("Added successfully")
        navigate("/")
      }
      ).catch((err) => {
        setLoadingOverLay(false);
        alert("Add failed, try again");
      });

    }
    
  }



  const validate = () => {
    let errMsg = "";

    if (!name.trim()) {
      errMsg = "Name should not be empty"
      alert(errMsg)
      return false
    }
    if (!userName.trim()) {
      errMsg = "Username should not be empty"
      alert(errMsg)
      return false
    }
    if (!validateEmail(email)) {
      errMsg = "Enter valid email"
      alert(errMsg)
      return false
    }
    if (!street.trim()) {
      errMsg = "Street should not be empty"
      alert(errMsg)
      return false
    }
    if (!suite.trim()) {
      errMsg = "Suite should not be empty"
      alert(errMsg)
      return false
    }
    if (!city.trim()) {
      errMsg = "City should not be empty"
      alert(errMsg)
      return false
    }
    if (!zipcode.trim()) {
      errMsg = "Zipcode should not be empty"
      alert(errMsg)
      return false
    }
    if (!latitude || isNaN(latitude)) {
      errMsg = "Enter Valid latitude"
      alert(errMsg)
      return false
    }
    if (!longtitude || isNaN(longtitude)) {
      errMsg = "Enter Valid longtitude"
      alert(errMsg)
      return false
    }
    if (!phone.trim()) {
      errMsg = "Enter Valid phone number"
      alert(errMsg)
      return false
    }

    if (!validURL(website)) {
      errMsg = "Enter Valid website link"
      alert(errMsg)
      return false
    }

    if (!cName.trim()) {
      errMsg = "Company name should not be empty"
      alert(errMsg)
      return false
    }

    if (!catchPharse.trim()) {
      errMsg = "Catch Pharse should not be empty"
      alert(errMsg)
      return false
    }

    return true;
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}


  return (
    <div className="add_user_coordinator">
      <div className="artboard bg-base-100 p-5 rounded-lg">
      {loadingOverlay && <LoaderOverlay />}
      <div className={loadingOverlay ? 'content-dimmed' : ''}>
        <div className="text-accent text-center text-xl font-bold add_user_header">
          Add New user
        </div>
        <form className="grid-cols-1 gap-4 p-5 responsive-form"
        >
          <div className="form-row">
            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-accent text-xl font-bold form_section_header">
            Address
          </div>

          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Suite"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
            />
          </div>

          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Zipcode"
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Longtitude"
              value={longtitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div className="text-accent text-xl font-bold form_section_header">
            Contact
          </div>

          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>


          <div className="text-accent text-xl font-bold form_section_header">
            Company
          </div>


          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Company Name"
              value={cName}
              onChange={(e) => setCName(e.target.value)}
            />
            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Catch Pharse"
              value={catchPharse}
              onChange={(e) => setCatchPharse(e.target.value)}
            />
          </div>


          <div className="form-row">

            <input
              className="p-3 border w-60 rounded-lg"
              placeholder="Bs"
              value={bs}
              onChange={(e) => setBs(e.target.value)}
            />
          </div>


          <button
            className="btn btn-accent place-self-center w-24"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    </div>
  )
}
