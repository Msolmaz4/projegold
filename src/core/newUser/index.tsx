import type { User } from "../../types/User.types";

const NewUser = ({
  name,
  email,
  hashedPassword,
}: {
  name: string;
  email: string;
  hashedPassword: string;
}): User => ({
  id: Date.now() + Math.floor(Math.random() * 1000000),
  name,
  username: "",
  email,
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: { lat: "", lng: "" },
  },
  phone: "",
  website: "",
  company: {
    name,
    catchPhrase: "",
    bs: "",
  },
  description: "",
  imageURL: "",
  tasks: [],
  aufgabe: [],
  admin: false,
  password: hashedPassword,
});

export default NewUser;
