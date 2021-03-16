import React, { useState } from "react";

function CountryCard(props) {
  const [visibility, setVisibility] = useState(false);
  const userCount = props.users.length;

  /* hides/unhides user info based on active class */
  const handleToggleVisibility = () => {
    setVisibility((prevState) => {
      return !prevState;
    });
  };
  const activeStatus = visibility ? "active" : "";

  return (
    <div className="country">
      <img src={props.country.flag} alt={`${props.country.name}-flag`} />
      <p>{props.country.name}</p>
      <button
        onClick={handleToggleVisibility}
        /* clickable only if country has users */
        disabled={userCount !== 0 ? false : true}
      >
        Users: {userCount}
      </button>
      <ul className={`user_content ${activeStatus}`}>
        {props.users.map((user) => {
          return (
            <li key={user.login.uuid}>
              <img
                className="userImg"
                src={user.picture.thumbnail}
                alt={user.name.first}
              />
              <p>
                name: {user.name.first} {user.name.last}
              </p>
              <p>email: {user.email}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CountryCard;
