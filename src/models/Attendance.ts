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
    const year = this.attendedAt?.getFullYear();
    const month = this.attendedAt?.getMonth() + 1;
    const date = this.attendedAt?.getDate();
    const hours = this.attendedAt?.getHours();
    const hourOf12 = hours > 12 ? hours - 12 : hours;
    const minutes = this.attendedAt?.getMinutes();
    const amstring = hours > 12 ? '오후' : '오전';

    return `${year}년 ${month}월 ${date}일 ${amstring} ${hourOf12}시 ${minutes}분`;
  }
}