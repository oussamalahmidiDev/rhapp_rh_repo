// import{uuid}from'../util/uuid';

export class User {
  // id: string;
  constructor(
    public prenom: string,
    public nom: string,
    public photo: any,
    public email: string,
    public telephone: string,
    public dateNaissance: string,
    public adresse: string,
    public id: number,
    public avatarLink: string,
    public token: string,
    public role: 'ADMIN' | 'RH',
    public dateCreation: string
  ) {

  }
}
