import React, { useState } from "react";
import Client from "../client";
import { Server } from "../types";

type ButtonProps = {
  loading: boolean;
  server: Server;
  handleStart: () => void;
  handleStop: () => void;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  server,
  handleStart,
  handleStop
}) => {
  if (loading) {
    return null;
  }

  if (server.status === "active") {
    return <button onClick={handleStop}>Stop</button>;
  } else {
    return <button onClick={handleStart}>Start</button>;
  }
};

type Props = {
  client: Client;
  server: Server;
  onChange: (updated: Server) => void;
};

const ServerItem: React.FC<Props> = ({ client, server, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await client.start(server.id);
    setLoading(false);
    onChange({
      ...server,
      status: "active"
    });
  };

  const handleStop = async () => {
    setLoading(true);
    await client.stop(server.id);
    setLoading(false);
    onChange({
      ...server,
      status: "off"
    });
  };

  return (
    <>
      {server.name} {server.ip} {server.status}{" "}
      <Button
        loading={loading}
        handleStart={handleStart}
        handleStop={handleStop}
        server={server}
      />
    </>
  );
};

export default ServerItem;
