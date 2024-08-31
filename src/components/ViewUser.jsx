import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewUser({ userId }) {
  //states for the fields

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [userDetail, setUserDetail] = useState({});

  //handlers
  function handleSubmit(e) {
    e.preventDefault();
    // if (validate()) {
    // }
    console.log(userDetail);

  }


  useEffect(() => {
    axios.get(`https://66cd7c788ca9aa6c8cca7ddb.mockapi.io/users/${userId}`).then((res) => {
      //  console.log("get single user data for: ",userId,res.data)
      let userData = res.data;
      console.log("get single user data for: ", userData)
      setUserDetail(userData);
    }
    )
      .catch((err) => console.log(err));
  }, []);

  const validate = () => {
    let errMsg = "";

    if (!userData.name.trim()) {
      errMsg = "Name should not be empty"
      alert(errMsg)
      return false
    }
    if (!userData.userName.trim()) {
      errMsg = "Username should not be empty"
      alert(errMsg)
      return false
    }
    if (!validateEmail(userData.email)) {
      errMsg = "Enter valid email"
      alert(errMsg)
      return false
    }
    if (!userData.address.street.trim()) {
      errMsg = "Street should not be empty"
      alert(errMsg)
      return false
    }
    if (!userData.address.suite.trim()) {
      errMsg = "Suite should not be empty"
      alert(errMsg)
      return false
    }
    if (!userData.address.city.trim()) {
      errMsg = "City should not be empty"
      alert(errMsg)
      return false
    }
    if (!userData.address.zipcode.trim()) {
      errMsg = "Zipcode should not be empty"
      alert(errMsg)
      return false
    }
    if (!userData.address.geo.lat || isNaN(userData.address.geo.lat)) {
      errMsg = "Enter Valid latitude"
      alert(errMsg)
      return false
    }
    if (!userData.address.geo.lng || isNaN(userData.address.geo.lng)) {
      errMsg = "Enter Valid longtitude"
      alert(errMsg)
      return false
    }
    if (!userData.phone.trim()) {
      errMsg = "Enter Valid phone number"
      alert(errMsg)
      return false
    }

    if (!validURL(userData.website)) {
      errMsg = "Enter Valid website link"
      alert(errMsg)
      return false
    }

    if (!userData.company.name.trim()) {
      errMsg = "Company name should not be empty"
      alert(errMsg)
      return false
    }

    if (!userData.company.catchPharse.trim()) {
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
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  function handlechange(keyVal) {
    let changes = { ...userDetail };
    for (let key in keyVal) {
      changes[key] = keyVal[key];
    }
    setUserDetail(changes);
  }


  return (
    <div className="add_user_coordinator">
      <div className="artboard bg-base-100 p-5 rounded-lg">
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
              <input
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


            <button
              className="btn btn-accent place-self-center w-24"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        }
        {successMessage ? (
          <div className="text-success text-center font-bold text-lg">
            {successMessage}
          </div>
        ) : (
          ""
        )}
        {errorMessage ? (
          <div className="text-error text-center font-bold text-lg">
            {errorMessage}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
