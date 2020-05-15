// import{uuid}from'../util/uuid';

export class User {
  // id: string;
  constructor(
      public prenom: string, 
      public nom: string, 
      public photo: string, 
      public email : string,
      public telephone : string,
      public dateNaissance: string,
      public adresse: string,
      public id: string,
      public avatar_link: string
      ) {
    
  }
}
