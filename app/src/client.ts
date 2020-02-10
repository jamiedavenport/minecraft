import { Server } from "./types";
import { apiUrl } from "./config";

export default class Client {
  constructor(private readonly apiKey: string) {}

  async list(): Promise<Server[]> {
    const resp = await fetch(`${apiUrl}/list`, {
      headers: {
        "X-API-KEY": this.apiKey
      }
    });
    return await resp.json();
  }

  async start(id: number): Promise<void> {
    const resp = await fetch(`${apiUrl}/start`, {
      method: "POST",
      body: JSON.stringify({
        id
      }),
      headers: {
        "X-API-KEY": this.apiKey
      }
    });
  }

  async stop(id: number): Promise<void> {
    const resp = await fetch(`${apiUrl}/stop`, {
      method: "POST",
      body: JSON.stringify({
        id
      }),
      headers: {
        "X-API-KEY": this.apiKey
      }
    });
  }
}
