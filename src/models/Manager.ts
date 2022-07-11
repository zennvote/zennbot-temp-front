export type ManagerResponse = { id: number, twitchId: string };

export class Manager {
  id: number;
  twitchId: string;

  constructor(response: ManagerResponse) {
    this.id = response.id;
    this.twitchId = response.twitchId;
  }
}
