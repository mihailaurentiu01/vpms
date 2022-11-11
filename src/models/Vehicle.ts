class Vehicle {
  category: string;
  company: string;
  registrationNumber: string;
  owner: string;
  contactNumber: number;
  creationDate: string;
  userId: string | undefined;
  id?: string;

  constructor(
    category: string,
    company: string,
    registrationNumber: string,
    owner: string,
    contactNumber: number,
    userId: string | undefined
  ) {
    this.category = category;
    this.company = company;
    this.registrationNumber = registrationNumber;
    this.owner = owner;
    this.contactNumber = contactNumber;
    this.creationDate = new Date().toLocaleDateString('es');
    this.userId = userId;
  }

  setId(id: string | undefined) {
    this.id = id;
  }

  setCreationDate(date: string) {
    this.creationDate = date;
  }
}

export default Vehicle;
