import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URLS } from "../apiConfig";
import { useParams } from "react-router-dom";
import "./profile.css";
import { Button } from "@mui/material";

const Profile = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const { profileId } = useParams();

  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `${API_URLS}/view-profile/${profileId}`,
        config
      );
      setData(response.data);
      console.log(response, "profiles");
    } catch (err) {
      console.log(err, "fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const imagesToDisplay = showAllImages
    ? data.selectedImageFiles || []
    : (data.selectedImageFiles || []).slice(0, 4);

  const toggleImages = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <div className="main">
    <div className="one">
   
        <h2>{data.name}</h2>
        <h4>{data.title}</h4>
     
      <div className="display">
        <div className="video">
          {Array.isArray(data.selectedVideoFile) &&
            data.selectedVideoFile.map((videoPath, index) => (
              <video key={index} controls>
                <source
                  src={`${API_URLS}${videoPath}`}
                  alt={`video ${index}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ))}
        </div>
        <div className="image">
          {Array.isArray(imagesToDisplay) &&
            imagesToDisplay.map((imagePath, index) => (
              <div key={index}>
                <img src={`${API_URLS}${imagePath}`} alt={`Image ${index}`} />
              </div>
            ))}
        </div>
        <div>
          {data.selectedImageFiles && data.selectedImageFiles.length > 4 && (
            <div>
              <button onClick={toggleImages}>
                {showAllImages ? "Show Less Images" : "Show More Images"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
     <div className="two">
     <div className="first">
      <div className="character">
        <>
          <h2>Characteristic</h2>
          <div>
            <div>
              <h6>
                Education <span>{data.education}</span>{" "}
              </h6>
              <h6>
                Age{" "}
                <div>
                  <span>{data.age}</span>
                </div>{" "}
              </h6>
              <h6>
                Experience <span>{data.Experience}</span>{" "}
              </h6>
              <h6>
                Nationality <span>hhh</span>{" "}
              </h6>
            </div>
            <div>
              <h6>
                Personality <span>person</span>{" "}
              </h6>
              <h6>
                Teaching style <span>{data.TeachingStyle}</span>{" "}
              </h6>
              <h6>
                Availability <span>{data.availabilityStatus}</span>{" "}
              </h6>
            </div>
          </div>
        </>
      </div>
      <div className="price">
        <h2>Prices</h2>
        <div>
          {data.prices?.map((pricesString, index) => {
            try {
              const prices = JSON.parse(pricesString);
              return (
                <div key={index}>
                  {Object.entries(prices).map(([time, cost]) => (
                    <div
                      key={time}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                         
                          fontSize: "15px",
                        }}
                      >
                        {time.replace(/_/g, " ")}{" "}
                        {/* Replace underscores with spaces */}
                      </p>
                      <p>{cost}$</p>
                    </div>
                  ))}
                </div>
              );
            } catch (error) {
              return null;
            }
          })}
        </div>

      </div>
      </div>
    <div className="second">
    <div className="about" >
        <h2>About me</h2>
        <div>
          <p>{data.aboutUs}</p>
        </div>
      </div>
    </div>
    <div className="third">
      <div className="service" >
        <h2>Services</h2>
        <div>
          {data.serviceNames?.map((serviceString, index) => {
            try {
              const serviceArray = JSON.parse(serviceString);
              return (
                <React.Fragment key={index}>
                  {serviceArray.map((serviceName, innerIndex) => (
                    <div
                      className="mb-2"
                      key={innerIndex}
                      style={{ flexBasis: "50%" }}
                    >
                      <p
                        className="mb-2"
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                         
                        }}
                      >
                        <span style={{ color: "#B80909" }}>
                          {/* <FcCheckmark style={{ color: "#B80909" }} /> */}
                        </span>{" "}
                        {serviceName}
                      </p>
                    </div>
                  ))}
                </React.Fragment>
              );
            } catch (error) {
              console.log(error, "ser");
              return null;
            }
          })}
        </div>
      </div>
      <div className="avalaible">
        <h2>Availability</h2>
        <div>
          {data.selectedTimes?.map((timesString, index) => {
            try {
              const timesObject = JSON.parse(timesString);
              return (
                <div key={index} className="mb-2 w-100">
                  {Object.entries(timesObject).map(([day, time]) => (
                    <div
                      key={day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mb-2">{day}</p>
                      <p>{time}</p>
                    </div>
                  ))}
                </div>
              );
            } catch (error) {
              // Handle parsing error if needed
              return null;
            }
          })}
        </div>
      </div>
      </div>
     </div>
    </div>
  );
};

export default Profile;
