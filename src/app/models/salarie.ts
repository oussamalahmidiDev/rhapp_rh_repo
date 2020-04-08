export interface Salarie {
      // infos pers
      nom: string;
      photo?: string;
      numDeSomme: string;
      email: string;
      cin: string;
      adresse: string;
      dateNaissance: string;
      lieuNaissance: string;
      tel: string;

      // infos prof
      division?: string;
      direction?: string;
      service?: string;
      diplome?: string;

      // contact urgence

      cinUrgence?: string;
      nomUrgence?: string;
      adresseUrgence?: string;
      telUrgence?: string;
      emailUrgence?: string;

      // statut: string
    }
