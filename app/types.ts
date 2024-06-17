export interface User {
  _id?: string;
  full_name: string;
  login: string;
  password: string;
}

export interface Client {
  _id: string;
  account_number: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  birthdate: string;
  inn: number;
  responsible_person: string;
  status: string;
}