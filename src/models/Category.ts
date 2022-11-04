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

  setId(id: string) {
    this.id = id;
  }
}

export default Category;
