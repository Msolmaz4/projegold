import type { Task } from "./types";


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


interface SimpleTask {
  id?: number | undefined
  name: string;
  milestones?: string[];
}
interface Aufgabe {
  vorarbeit?: number | undefined;
  umsetzung?: number | undefined;
  kontrolle?: number | undefined;
  kosten?: number | undefined;
  status?: "offen" | "Bearbeitung" | "erledigt" | "geplant" | undefined;
  dueDate?: string | undefined;
  category?: "Marketing" | "Development" | "Design" | "Fulfillment" | undefined;
  subcategory?:
    | "Google Ads"
    | "Social Media"
    | "SEO"
    | "PDF Programmierung"
    | "Webformula"
    | 'Backend'
    |  'UX/UI'
    | undefined;
  name: string;
  firma:string,
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
interface Task {
  name: string;
  milestones: string[];
}
interface User {
  id: number |string;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  description?: string;
  imageURL?: string;
}

interface UserWithTasks extends User {
  aufgabe?: Aufgabe[];
    tasks?: Task[];
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
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    phone: "1-770-736-8031",
    website: "leanne.org",
    company: {
      name: "Google",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    description: "Innovatives Unternehmen im Bereich Technologie und Entwicklung.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    tasks: [
      {
        name: "Forschung",
        milestones: ["Labortests abgeschlossen", "Ergebnisse veröffentlicht"]
      },
      {
        name: "Marketing",
        milestones: ["Kampagnenstart", "Social Media Präsenz erhöht"]
      }
    ],
    aufgabe: [
      {
        vorarbeit: 7,
        umsetzung: 9,
        kontrolle: 8,
        kosten: 320,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Google",
      },
    ],
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
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    phone: "010-692-6593",
    website: "ervin.net",
    company: {
      name: "JPMorgan Chase",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
    description: "Führender Anbieter von Finanzdienstleistungen.",
    imageURL: "https://www.facebook.com/photo/?fbid=636819001821935&set=a.636818998488602",
    tasks: [
      {
        name: "Forschung",
        milestones: ["Labortests abgeschlossen", "Ergebnisse veröffentlicht"]
      },
      {
        name: "Marketing",
        milestones: ["Kampagnenstart", "Social Media Präsenz erhöht"]
      }
    ],
    aufgabe: [
      {
        vorarbeit: 8,
        umsetzung: 7,
        kontrolle: 9,
        kosten: 280,
        status: "Bearbeitung",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "JPMorgan Chase",
      },
    ],
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
      geo: { lat: "-68.6102", lng: "-47.0653" },
    },
    phone: "1-463-123-4447",
    website: "clementine.info",
    company: {
      name: "Siemens",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
    description: "Spezialist für nachhaltige Energielösungen.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg",
    tasks: [
      {
        name: '',
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 9,
        umsetzung: 8,
        kontrolle: 7,
        kosten: 310,
        status: "erledigt",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Siemens",
      },
    ],
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
      geo: { lat: "29.4572", lng: "-164.2990" },
    },
    phone: "493-170-9623",
    website: "patricia.biz",
    company: {
      name: "DHL",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
    description: "Globaler Dienstleister für Logistik und Transport.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg2",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 6,
        umsetzung: 10,
        kontrolle: 9,
        kosten: 295,
        status: "geplant",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "DHL",
      },
    ],
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
      geo: { lat: "-31.8129", lng: "62.5342" },
    },
    phone: "(254)954-1289",
    website: "chelsey.info",
    company: {
      name: "Procter & Gamble",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    description: "Hersteller von hochwertigen Konsumgütern.",
    imageURL: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 10,
        umsetzung: 6,
        kontrolle: 8,
        kosten: 300,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Procter & Gamble",
      },
    ],
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
      geo: { lat: "-71.4197", lng: "71.7478" },
    },
    phone: "1-477-935-8478",
    website: "dennis.org",
    company: {
      name: "Cerner",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
    description: "Innovativer Softwareanbieter im Gesundheitsbereich.",
    imageURL: "https://images.unsplash.com/photo-1551836022-4c4c79ecde6d",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 8,
        umsetzung: 9,
        kontrolle: 10,
        kosten: 310,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Cerner",
      },
    ],
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
      geo: { lat: "24.8918", lng: "21.8984" },
    },
    phone: "210.067.6132",
    website: "kurtis.io",
    company: {
      name: "Accenture",
      catchPhrase: "Implemented secondary concept",
      bs: "aggregate real-time technologies",
    },
    description: "Beratung und professionelle Dienstleistungen.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Accenture-Logo.svg",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 9,
        umsetzung: 7,
        kontrolle: 8,
        kosten: 305,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Accenture",
      },
    ],
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime",
    email: "nicholas@example.com",
    address: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: { lat: "-14.3990", lng: "-120.7677" },
    },
    phone: "586.493.6943",
    website: "nicholas.biz",
    company: {
      name: "Intel",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models",
    },
    description: "Führender Chip-Hersteller weltweit.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel_logo_(2006-2020).svg",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 7,
        umsetzung: 8,
        kontrolle: 9,
        kosten: 315,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Intel",
      },
    ],
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
      geo: { lat: "24.6463", lng: "-168.8889" },
    },
    phone: "(775)976-6794",
    website: "glenna.org",
    company: {
      name: "Bayer",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    description: "Pharmaunternehmen mit globaler Reichweite.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bayer_logo.svg",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 10,
        umsetzung: 7,
        kontrolle: 8,
        kosten: 310,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "Bayer",
      },
    ],
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
      geo: { lat: "-38.2386", lng: "57.2232" },
    },
    phone: "024-648-3804",
    website: "clementina.biz",
    company: {
      name: "BMW",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    description: "Premium Autohersteller mit Fokus auf Innovation.",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW_logo.svg",
    tasks: [
      {
        name: "",
        milestones: []
      }
    ],
    aufgabe: [
      {
        vorarbeit: 8,
        umsetzung: 7,
        kontrolle: 9,
        kosten: 320,
        status: "offen",
        dueDate: "2025-06-30",
        category: "Marketing",
        subcategory: "SEO",
        name: "Backlink auf Wikipedia setzen",
        firma: "BMW",
      },
    ],
  },
];








type Subcategory = {
  id: string;
  name: string;
};

type Category = {
  id: string | number | undefined;
  name: string;
  subcategories: Subcategory[];
};
const Categories: Category[] = [
  {
    id: 1,
    name: "Marketing",
    subcategories: [
      { id: "seo", name: "SEO" },
      { id: "google_ads", name: "Google Ads" },
      { id: "social_media", name: "Social Media" },
    ],
  },
  {
    id: 2,
    name: "Vertrieb",
    subcategories: [
      { id: "cold_calls", name: "Cold Calls" },
      { id: "cold_mails", name: "Cold Mails" },
      { id: "lead_setting", name: "Leadqualifizierung / Setting" },
    ],
  },
  {
    id: 3,
    name: "Fulfillment",
    subcategories: [
      { id: "pf_design", name: "PF Design" },
      { id: "pdf_programmierung", name: "PDF Programmierung" },
      { id: "webformula", name: "Webformula" },
    ],
  },
];


const initialTasks: Task[] = [
  {
    id: 1,
    category: "Marketing",
    subcategory: "SEO",
    name: "Backlink auf Wikipedia setzen",
    vorarbeit: 10,
    umsetzung: 10,
    kontrolle: 10,
    kosten: 300,
    status: "offen",
    dueDate: "2025-06-30",
    firma: "Firma A",
  },
  {
    id: 2,
    category: "Marketing",
    subcategory: "SEO",
    name: "20 Backlinks auf Kundenwebseiten setzen",
    vorarbeit: 20,
    umsetzung: 320,
    kontrolle: 15,
    kosten: 0,
    status: "in Bearbeitung",
    dueDate: "2025-07-05",
    firma: "Firma B",
  },
  {
    id: 3,
    category: "Development",
    subcategory: "Frontend",
    name: "Landing Page für Produktlaunch erstellen mit sehr langem Text, der auf mehrere Zeilen umbrechen sollte, damit es sichtbar ist",
    vorarbeit: 15,
    umsetzung: 120,
    kontrolle: 20,
    kosten: 500,
    status: "offen",
    dueDate: "2025-07-10",
    firma: "Firma A",
  },
  {
    id: 4,
    category: "Development",
    subcategory: "Backend",
    name: "API-Endpunkt für Bestellungen implementieren",
    vorarbeit: 10,
    umsetzung: 180,
    kontrolle: 30,
    kosten: 0,
    status: "erledigt",
    dueDate: "2025-07-15",
    firma: "Firma C",
  },
  {
    id: 5,
    category: "Design",
    subcategory: "UX/UI",
    name: "Benutzerfluss für Checkout optimieren",
    vorarbeit: 25,
    umsetzung: 80,
    kontrolle: 15,
    kosten: 200,
    status: "geplant",
    dueDate: "2025-07-08",
    firma: "Firma B",
  },
];

export { Users, initialTasks, Categories };