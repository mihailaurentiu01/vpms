class Category {
  name: string;
  creationDate: string;
  userId: string | undefined;

  constructor(name: string, userId: string | undefined) {
    this.name = name;
    this.creationDate = new Date().toLocaleDateString('es');
    this.userId = userId;
  }
}

export default Category;
