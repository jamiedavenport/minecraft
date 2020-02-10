import React from "react";
import Client from "../client";
import { useState } from "react";
import { Server } from "../types";
import { useEffect } from "react";
import ServerItem from "./ServerItem";

type Props = {
  client: Client;
};

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
      {servers.map((server, index) => {
        const handleChange = (updated: Server) => {
          const newServers = [...servers];
          newServers[index] = updated;
          setServers(newServers);
        };

        return (
          <li key={server.id}>
            <ServerItem
              onChange={handleChange}
              client={client}
              server={server}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ServerList;
