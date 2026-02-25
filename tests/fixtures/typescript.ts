interface User {
  name: string;
  age: number;
}

const createUser = (name: string, age: number): User => ({ name, age });

export default createUser;
