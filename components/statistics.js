import React from "react";
import Row from "./row";
import router from "next/router";

const UserStatistics = ({ stat }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <tr>
          <th>Jazyk</th>
          <th>Počet špatně</th>
          <th>Počet správně</th>
          <th>Celkový počet</th>
          <th>Úspěšnost </th>
          <th>Celkový čas</th>
          <th>Datum konce</th>
        </tr>
        {stat != null && stat.map((u) => <Row statistikaData={u}></Row>)}
      </table>
    </div>
  );
};

export default UserStatistics;
