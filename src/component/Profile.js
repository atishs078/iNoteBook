import React, { useContext, useState, useEffect } from 'react';
import colorContext from '../context/color/colorContext';
import Loader from './Loader';

const Profile = (props) => {
    const host = "http://192.168.101.61:5000";
    const [credential, setCredential] = useState({});
    const context = useContext(colorContext);
    const { textColor } = context;
    const [loading, setLoading] = useState(false);  // Loading state

    const getUserDetails = async () => {
        setLoading(true); // Show loader when the fetch starts
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });

            const json = await response.json();
            console.log(json);

            // Update the state with the user details from the json response
            setCredential(json.user);  // Access 'user' from the JSON
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Disable loader after fetching data
        }
    };

    useEffect(() => {
        getUserDetails();  // Fetch user details when component mounts
    }, []);

    let formatted_date = new Date(credential.timeStamp);

    return (
        <>
            {loading ? (  
                <Loader />
            ) : (  
                <div className={`container text-${textColor}`}>
                    <h1>Welcome to the Profile Section</h1>
                    <p name="name" id="name"><strong>Name: </strong>  {credential.name || "N/A"}</p>
                    <p name="email" id="email"><strong>Email: </strong> {credential.email || "N/A"}</p>
                    <p><strong>Created Date: </strong> 
                      {formatted_date.getDate()}/{formatted_date.getMonth() + 1}/{formatted_date.getFullYear()}
                    </p>
                </div>
            )}
        </>
    );
};

export default Profile;
