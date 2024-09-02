import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import LoaderOverlay from "./LoaderOverlay";
import { AppState } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function ViewUser({ userId }) {

  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingOverlay, setLoadingOverLay] = useState(false);
  const { userListDispatch } = AppState();
  const navigate = useNavigate();

  // to handle update operation
  function handleUpdate(e) {
    e.preventDefault();
    if (validate()) {
      setLoadingOverLay(true);
      axios.put(`https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users/${userId}`, userDetail).then((res) => {
        setLoadingOverLay(false);
        userListDispatch({type:"update",data:res.data})
        alert("Updated successfully")
        navigate("/")
      }).catch((err) => {
        console.log(err)
        setLoadingOverLay(false);
        alert("Update failed")
      });
    }

  }

  // to handle delete
  function handleDelete(e) {
    e.preventDefault();
    setLoadingOverLay(true);
    axios.delete(`https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users/${userId}`).then((res) => {
      setLoadingOverLay(false);
      userListDispatch({type:"delete",data:res.data})
      alert("Deleted successfully")
      navigate("/")
    }).catch((err) => {
      console.log(err)
      setLoadingOverLay(false);
      alert("Delete failed")
    });
  }

  // get user details based on id
  useEffect(() => {
    setLoading(true);
    axios.get(`https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users/${userId}`).then((res) => {
      let userData = res.data;
      setUserDetail(userData);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      console.log(err)
    });
  }, []);

  // validation for fields
  const validate = () => {
    let errMsg = "";

    if (!userDetail.name.trim()) {
      errMsg = "Name should not be empty"
      alert(errMsg)
      return false
    }
    if (!userDetail.username.trim()) {
      errMsg = "Username should not be empty"
      alert(errMsg)
      return false
    }
    if (!validateEmail(userDetail.email)) {
      errMsg = "Enter valid email"
      alert(errMsg)
      return false
    }
    if (!userDetail.address.street.trim()) {
      errMsg = "Street should not be empty"
      alert(errMsg)
      return false
    }
    if (!userDetail.address.suite.trim()) {
      errMsg = "Suite should not be empty"
      alert(errMsg)
      return false
    }
    if (!userDetail.address.city.trim()) {
      errMsg = "City should not be empty"
      alert(errMsg)
      return false
    }
    if (!userDetail.address.zipcode.trim()) {
      errMsg = "Zipcode should not be empty"
      alert(errMsg)
      return false
    }
    if (!userDetail.address.geo.lat || isNaN(userDetail.address.geo.lat)) {
      errMsg = "Enter Valid latitude"
      alert(errMsg)
      return false
    }
    if (!userDetail.address.geo.lng || isNaN(userDetail.address.geo.lng)) {
      errMsg = "Enter Valid longtitude"
      alert(errMsg)
      return false
    }
    if (!userDetail.phone.trim()) {
      errMsg = "Enter Valid phone number"
      alert(errMsg)
      return false
    }

    if (!validURL(userDetail.website)) {
      errMsg = "Enter Valid website link"
      alert(errMsg)
      return false
    }

    if (!userDetail.company.name.trim()) {
      errMsg = "Company name should not be empty"
      alert(errMsg)
      return false
    }

    if (!userDetail.company.catchPhrase.trim()) {
      errMsg = "Catch Pharse should not be empty"
      alert(errMsg)
      return false
    }

    return true;
  };

  // email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // url validation
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  // store updated values
  function handlechange(keyVal) {
    let changes = { ...userDetail };
    for (let key in keyVal) {
      changes[key] = keyVal[key];
    }
    setUserDetail(changes);
  }

  return (
    <div className="add_user_coordinator">
      {loading ? <Loader></Loader> :
        <div className="artboard bg-base-100 p-5 rounded-lg">
          {loadingOverlay && <LoaderOverlay />}
          <div className={loadingOverlay ? 'content-dimmed' : ''}>

            <div className="text-accent text-center text-xl font-bold add_user_header">
              User Details
            </div>
            {
              (Object.keys(userDetail).length > 0) &&

              <form className="grid-cols-1 gap-4 p-5 responsive-form"
              >
                <div className="form-row">
                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Name"
                    value={userDetail.name}
                    onChange={(e) =>
                      handlechange({ "name": e.target.value })
                    }
                  />

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="UserName"
                    value={userDetail.username}
                    onChange={(e) => handlechange({ "username": e.target.value })}
                  />
                </div>

                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Email"
                    value={userDetail.email}
                    onChange={(e) => handlechange({ "email": e.target.value })}
                  />
                </div>

                <div className="text-accent text-xl font-bold form_section_header">
                  Address
                </div>

                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Street"
                    value={userDetail.address.street}
                    onChange={(e) => {
                      let addressObj = userDetail.address;
                      addressObj["street"] = e.target.value;
                      handlechange(addressObj);
                    }}
                  />
                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Suite"
                    value={userDetail.address.suite}
                    onChange={(e) => {
                      let addressObj = userDetail.address;
                      addressObj["suite"] = e.target.value;
                      handlechange(addressObj);
                    }

                    }
                  />
                </div>

                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="City"
                    value={userDetail.address.city}
                    onChange={(e) => {
                      let addressObj = userDetail.address;
                      addressObj["city"] = e.target.value;
                      handlechange(addressObj);
                    }}
                  />
                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Zipcode"
                    value={userDetail.address.zipcode}
                    onChange={(e) => {
                      let addressObj = userDetail.address;
                      addressObj["zipcode"] = e.target.value;
                      handlechange(addressObj);
                    }}
                  />
                </div>

                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Latitude"
                    value={userDetail.address.geo.lat}
                    onChange={(e) => {
                      let addressObj = userDetail.address;
                      addressObj["geo"]["lat"] = e.target.value;
                      handlechange(addressObj);
                    }}
                  />
                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Longtitude"
                    value={userDetail.address.geo.lng}
                    onChange={(e) => {
                      let addressObj = userDetail.address;
                      addressObj["geo"]["lng"] = e.target.value;
                      handlechange(addressObj);
                    }}
                  />
                </div>

                <div className="text-accent text-xl font-bold form_section_header">
                  Contact
                </div>

                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Phone"
                    value={userDetail.phone}
                    onChange={(e) => {
                      handlechange({ "phone": e.target.value });
                    }}
                  />
                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Website"
                    value={userDetail.website}
                    onChange={(e) => {
                      handlechange({ "website": e.target.value });
                    }}
                  />
                </div>


                <div className="text-accent text-xl font-bold form_section_header">
                  Company
                </div>


                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Company Name"
                    value={userDetail.company.name}
                    onChange={(e) => {
                      let companyObj = userDetail.company;
                      companyObj["name"] = e.target.value;
                      handlechange(companyObj);
                    }}
                  />
                  <textarea
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Catch Pharse"
                    value={userDetail.company.catchPhrase}
                    onChange={(e) => {
                      let companyObj = userDetail.company;
                      companyObj["catchPhrase"] = e.target.value;
                      handlechange(companyObj);
                    }}
                  />
                </div>


                <div className="form-row">

                  <input
                    className="p-3 border w-60 rounded-lg"
                    placeholder="Bs"
                    value={userDetail.company.bs}
                    onChange={(e) => {
                      let companyObj = userDetail.company;
                      companyObj["bs"] = e.target.value;
                      handlechange(companyObj);
                    }
                    }
                  />
                </div>

                <div className="form-row">


                  <button
                    className="btn btn-accent place-self-center w-24"
                    type="submit"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-error place-self-center w-24"
                    type="submit"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>

                </div>
              </form>
            }
          </div>
        </div>}
    </div>
  )
}
