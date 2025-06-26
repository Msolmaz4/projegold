interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Task {
  name: string;
  milestones: string[];
}

interface UserWithTasks extends User {
  description: string;
  tasks: Task[];
}

const Users: UserWithTasks[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "leanne@example.com",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: { lat: "-37.3159", lng: "81.1496" }
    },
    phone: "1-770-736-8031",
    website: "leanne.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    },
    description: "Innovatives Unternehmen im Bereich Technologie und Entwicklung.",
    tasks: [
   
    ]
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "ervin@example.com",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43.9509", lng: "-34.4618" }
    },
    phone: "010-692-6593",
    website: "ervin.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    },
    description: "Führender Anbieter von Finanzdienstleistungen.",
    tasks: [
      {
        name: "Kundensupport",
        milestones: ["Training abgeschlossen", "Support-System implementiert"]
      },
      {
        name: "Produktentwicklung",
        milestones: ["Marktforschung", "Prototypentwicklung"]
      }
    ]
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "clementine@example.com",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: { lat: "-68.6102", lng: "-47.0653" }
    },
    phone: "1-463-123-4447",
    website: "clementine.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications"
    },
    description: "Spezialist für nachhaltige Energielösungen.",
    tasks: [
      {
        name: "Forschung",
        milestones: ["Labortests abgeschlossen", "Ergebnisse veröffentlicht"]
      },
      {
        name: "Marketing",
        milestones: ["Kampagnenstart", "Social Media Präsenz erhöht"]
      }
    ]
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "patricia@example.com",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: { lat: "29.4572", lng: "-164.2990" }
    },
    phone: "493-170-9623",
    website: "patricia.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services"
    },
    description: "Globaler Dienstleister für Logistik und Transport.",
    tasks: [
      {
        name: "Logistikplanung",
        milestones: ["Routenoptimierung", "Flottenmanagement aktualisiert"]
      }
    ]
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "chelsey@example.com",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: { lat: "-31.8129", lng: "62.5342" }
    },
    phone: "(254)954-1289",
    website: "chelsey.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems"
    },
    description: "Hersteller von hochwertigen Konsumgütern.",
    tasks: [
      {
        name: "Qualitätskontrolle",
        milestones: ["Produktinspektionen abgeschlossen", "Bericht erstellt"]
      },
      {
        name: "Vertrieb",
        milestones: ["Neuer Vertrag unterzeichnet", "Markteintritt geplant"]
      }
    ]
  },
  {
    id: 6,
    name: "Dennis Schulist",
    username: "Leopoldo",
    email: "dennis@example.com",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: { lat: "-71.4197", lng: "71.7478" }
    },
    phone: "1-477-935-8478",
    website: "dennis.org",
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications"
    },
    description: "Innovativer Softwareanbieter im Gesundheitsbereich.",
    tasks: [
      {
        name: "Softwareentwicklung",
        milestones: ["Alpha-Test gestartet", "Feedback gesammelt"]
      },
      {
        name: "Kundensupport",
        milestones: ["Ticket-System optimiert", "Schulungen durchgeführt"]
      }
    ]
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn",
    email: "kurtis@example.com",
    address: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: { lat: "24.8918", lng: "21.8984" }
    },
    phone: "210.067.6132",
    website: "kurtis.io",
    company: {
      name: "Johns Group",
      catchPhrase: "Configurable multimedia task-force",
      bs: "generate enterprise e-tailers"
    },
    description: "Beratungsunternehmen für digitale Transformation.",
    tasks: [
    
    ]
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir",
    username: "Maxime",
    email: "nicholas@example.com",
    address: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: { lat: "-14.3990", lng: "-120.7677" }
    },
    phone: "586.493.6943",
    website: "nicholas.com",
    company: {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers"
    },
    description: "Führend in eCommerce und Onlinehandel.",
    tasks: [
      {
        name: "Logistik",
        milestones: ["Versandprozesse verbessert", "Lagerbestand optimiert"]
      },
      {
        name: "Marketing",
        milestones: ["Newsletter gestartet", "Social Media Kampagne"]
      }
    ]
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "glenna@example.com",
    address: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: { lat: "24.6463", lng: "-168.8889" }
    },
    phone: "(775)976-6794",
    website: "glenna.biz",
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies"
    },
    description: "Spezialist für Cloud-Infrastrukturen.",
    tasks: [
      {
        name: "Cloud-Migration",
        milestones: ["Datenmigration abgeschlossen", "Systemtests erfolgreich"]
      },
      {
        name: "Support",
        milestones: ["24/7 Helpdesk etabliert", "Kundenzufriedenheit erhöht"]
      }
    ]
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah",
    email: "clementina@example.com",
    address: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: { lat: "-38.2386", lng: "57.2232" }
    },
    phone: "024-648-3804",
    website: "clementina.net",
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models"
    },
    description: "Innovative Agentur für digitale Medien und Design.",
    tasks: [
      {
        name: "Design",
        milestones: ["Kampagnendesign fertiggestellt", "Kundenfeedback eingeholt"]
      },
      {
        name: "Entwicklung",
        milestones: ["Website Launch", "SEO Optimierung abgeschlossen"]
      }
    ]
  }
];


export default Users;


type Subcategory = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};
export const categories: Category[] = [
  {
    id: "marketing",
    name: "Marketing",
    subcategories: [
      { id: "seo", name: "SEO" },
      { id: "google_ads", name: "Google Ads" },
      { id: "social_media", name: "Social Media" },
    ],
  },
  {
    id: "vertrieb",
    name: "Vertrieb",
    subcategories: [
      { id: "cold_calls", name: "Cold Calls" },
      { id: "cold_mails", name: "Cold Mails" },
      { id: "lead_setting", name: "Leadqualifizierung / Setting" },
    ],
  },
  {
    id: "fulfillment",
    name: "Fulfillment",
    subcategories: [
      { id: "pf_design", name: "PF Design" },
      { id: "pdf_programmierung", name: "PDF Programmierung" },
      { id: "webformula", name: "Webformula" },
    ],
  },
];
