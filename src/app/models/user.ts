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
    public id: string,
    public avatarLink: string,
    public token: string
  ) {

  }
}
