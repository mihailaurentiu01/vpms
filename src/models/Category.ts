class Category {
  name: string;
  creationDate: string;
  userId: string | undefined;
  id?: string;

  constructor(name: string, userId: string | undefined) {
    this.name = name;
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

export default Category;
