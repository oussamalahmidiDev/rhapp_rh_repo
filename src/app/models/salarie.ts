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
    }
