import React from "react";
import Client from "../client";
import { useState } from "react";
import { Server } from "../types";
import { useEffect } from "react";

interface Props {
  client: Client;
}

const ServerList: React.FC<Props> = ({ client }) => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    const f = async () => {
      setServers(await client.list());
    };

    f();
  }, [client]);

  return (
    <ul>
      {servers.map(server => (
        <li key={server.id}>
          {server.id} {server.name} {server.status}
        </li>
      ))}
    </ul>
  );
};

export default ServerList;
