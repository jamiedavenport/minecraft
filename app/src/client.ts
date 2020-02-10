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
}
