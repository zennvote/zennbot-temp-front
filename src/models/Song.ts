export enum RequestType {
  ticket = '티켓',
  ticketPiece = '조각',
  freemode = '골든벨',
  manual = 'manual',
}

export type SongResponse = {
  title: string,
  requestor: string,
  requestorName: string,
  requestType: RequestType,
}

export class Song {
  public title: string;
  public requestor: string;
  public requestorName: string;
  public requestType: RequestType;

  constructor({ title, requestor, requestorName, requestType }: SongResponse) {
    this.title = title;
    this.requestor = requestor;
    this.requestorName = requestorName;
    this.requestType = requestType;
  }
}