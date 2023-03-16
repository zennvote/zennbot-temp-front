export type AccountResponse = {
  index: number,
  twitchId: string,
  username: string,
  ticket: number,
  ticketPiece: number,
  prefix?: string,
  viasIdolIds?: string[],
};

export class Account {
  index: number;
  twitchId: string;
  username: string;
  ticket: number;
  ticketPiece: number;
  prefix?: string;
  biasIdolIds: string[];

  constructor(response: AccountResponse) {
    this.index = response.index;
    this.twitchId = response.twitchId;
    this.username = response.username;
    this.ticket = response.ticket;
    this.ticketPiece = response.ticketPiece;
    this.prefix = response.prefix;
    this.biasIdolIds = response.viasIdolIds ?? [];
  }
}