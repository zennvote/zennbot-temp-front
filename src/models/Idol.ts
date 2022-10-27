export type IdolResponse = {
  id: number;
  firstName?: string;
  lastName: string;
  company?: string;
  unit?: string;
  type?: string;
  birthday: string;
  age: string;
  height: string;
  weight?: string;
  threeSize?: string;
  hometown: string;
  cv?: string;
  introduction: string;
}

export class Idol {
  public id!: number;
  public firstName?: string;
  public lastName!: string;
  public company?: string;
  public unit?: string;
  public type?: string;
  public birthday!: string;
  public age!: string;
  public height!: string;
  public weight?: string;
  public threeSize?: string;
  public hometown!: string;
  public cv?: string;
  public introduction!: string;

  constructor(response: IdolResponse) {
    this.id = response.id;
    this.firstName = response.firstName;
    this.lastName = response.lastName;
    this.company = response.company;
    this.unit = response.unit;
    this.type = response.type;
    this.birthday = response.birthday;
    this.age = response.age;
    this.height = response.height;
    this.weight = response.weight;
    this.threeSize = response.threeSize;
    this.hometown = response.hometown;
    this.cv = response.cv;
    this.introduction = response.introduction;
  }

  get fullName() {
    return this.firstName ? `${this.firstName} ${this.lastName}` : this.lastName;
  }
}