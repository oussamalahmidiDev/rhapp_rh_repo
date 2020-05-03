export interface Salarie {
      id?: number;
      // infos pers
      nom: string;
      photo?: string;
      numSomme: string;
      email: string;
      cin: string;
      adresse: string;
      dateNaissance: string;
      lieuNaissance: string;
      tel: string;
      dateCreation: Date;

      // infos prof
      division?: string;
      direction?: string;
      service?: string;
      diplomeObt?: string;
      fonction: string;

      // contact urgence

      cinUrg?: string;
      nomUrgence?: string;
      adresseUrgence?: string;
      telUrgence?: string;
      emailUrg?: string;

      // statut: string
    }


    // [
    //   {
    //     "id": 1,
    //     "numSomme": 999,
    //     "cin": "Y677",
    //     "adresse": "asdsdf",
    //     "cv": "sdfsd",
    //     "lieuNaissance": "safi",
    //     "dateCreation": "2020-04-27T18:57:56.000+0000",
    //     "dateUpdate": "2020-04-27T18:57:56.000+0000",
    //     "diplomeObt": "BAC",
    //     "fonction": "dsdf",
    //     "cinUrg": "Yuuu",
    //     "emailUrg": "sdfadsf",
    //     "solde": 2121,
    //     "absences": [
    //       {
    //         "id": 1,
    //         "dateDebut": "2020-05-04T00:00:00.000+0000",
    //         "dateFin": "2020-04-04T00:00:00.000+0000",
    //         "dateCreation": "2020-04-28T03:04:31.000+0000",
    //         "dateModification": "2020-04-28T03:04:31.000+0000",
    //         "type": "deces"
    //       }
    //     ],
    //     "email": "lahmidioussama14@gmail.com",
    //     "role": "ADMIN",
    //     "conges": [
    //       {
    //         "id": 1,
    //         "dateDebut": "2020-05-04T00:00:00.000+0000",
    //         "duree": 10,
    //         "motif": "Conge d'ete",
    //         "dateCreation": "2020-04-28T02:51:38.000+0000",
    //         "dateModification": "2020-04-28T02:51:38.000+0000",
    //         "type": {
    //           "id": 1,
    //           "typeConge": "REPO"
    //         },
    //         "dateFin": "2020-04-04T00:00:00.000+0000"
    //       }
    //     ],
    //     "avantages": []
    //   }
    // ]
    
