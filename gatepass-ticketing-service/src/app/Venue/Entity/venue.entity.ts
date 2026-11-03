export class Venue {
  id: number;
  name: string;
  city: string;
  capacity: number;
  created_at: Date;
  updated_at: Date;

  constructor(data: Partial<Venue>) {
    this.id = data.id! ,
    this.name = data.name!,
    this.city = data.city!,
    this.capacity = data.capacity!,
    this.created_at = data.created_at!,
    this.updated_at = data.updated_at!
  }

}

