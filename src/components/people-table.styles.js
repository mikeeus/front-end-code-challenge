import React from "react";

import styles from "./people-table.module.scss";

export default function PeopleTable({ people }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>IP Address</th>
        </tr>
      </thead>
      <tbody>
        {people.map(
          ({ id, first_name, last_name, gender, email, ip_address }) => (
            <tr key={id}>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{gender}</td>
              <td>{email}</td>
              <td>{ip_address}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
