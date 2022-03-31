import React from "react";
import Row from "./row";

const UserStatistics = ({ stat }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <tr>
          <th className="border-top-0">Jazyk</th>
          <th className="border-top-0">Počet špatně</th>
          <th className="border-top-0">Počet správně</th>
          <th className="border-top-0">Celkový počet</th>
          <th className="border-top-0">Úspěšnost </th>
          <th className="border-top-0">Celkový čas</th>
          <th className="border-top-0">Datum konce</th>
        </tr>
        {stat != null && stat.map((u) => <Row statistikaData={u}></Row>)}
      </table>
    </div>
  );
};

export default UserStatistics;
