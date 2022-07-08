export type AttendanceResponse = {
  twitchId: string;
  attendedAt: Date,
  tier: number,
};

export class Attendance {
  public twitchId: string;
  public attendedAt: Date;
  public tier: number;

  constructor({ twitchId, attendedAt, tier }: AttendanceResponse) {
    this.twitchId = twitchId;
    this.attendedAt = new Date(attendedAt);
    this.tier = tier;
  }

  get attendedAtString() {
    const year = `${this.attendedAt?.getFullYear()}`.padStart(4, '0');
    const month = `${this.attendedAt?.getMonth()}`.padStart(2, '0');
    const date = `${this.attendedAt?.getDate()}`.padStart(2, '0');
    const hours = `${this.attendedAt?.getHours()}`.padStart(2, '0');
    const minutes = `${this.attendedAt?.getMinutes()}`.padStart(2, '0');
    const seconds = `${this.attendedAt?.getSeconds()}`.padStart(2, '0');

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  }
}