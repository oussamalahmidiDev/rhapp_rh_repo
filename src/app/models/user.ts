// import{uuid}from'../util/uuid';

export class User {
  // id: string;
  constructor(
      public prenom: string, 
      public nom: string, 
      public avatarSrc: string, 
      public email : string,
      public tel : string,
      public dateNaissance: string,
      public adresse: string,
      public id: string
      ) {
    
  }
}
