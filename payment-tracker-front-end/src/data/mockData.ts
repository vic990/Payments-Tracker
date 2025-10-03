import { UserMock, Payment } from "../types";

export const mockUsers: UserMock[] = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@email.com",
    avatar:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    role: "admin",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    avatar:
      "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    role: "user",
  },
  {
    id: "3",
    name: "María López",
    email: "maria.lopez@email.com",
    avatar:
      "https://images.pexels.com/photos/3764538/pexels-photo-3764538.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    role: "user",
  },
  {
    id: "4",
    name: "Diego Restrepo",
    email: "diego.restrepo@email.com",
    avatar:
      "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    role: "user",
  },
  {
    id: "5",
    name: "Sofía Martínez",
    email: "sofia.martinez@email.com",
    avatar:
      "https://images.pexels.com/photos/3785081/pexels-photo-3785081.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    role: "user",
  },
];

export const mockPayments: Payment[] = [
  {
    id: "1",
    amount: 250.0,
    concept: "Cena en restaurante",
    ownerId: "1",
    payerId: "2",
    date: "2024-01-15T19:30:00Z",
    status: "completed",
    category: "Alimentación",
    notes: "Cena de trabajo",
  },
  {
    id: "2",
    amount: 120.5,
    concept: "Taxi al aeropuerto",
    ownerId: "2",
    payerId: "2",
    date: "2024-01-14T14:20:00Z",
    status: "completed",
    category: "Transporte",
  },
  {
    id: "3",
    amount: 75.0,
    concept: "Medicamentos",
    ownerId: "3",
    payerId: "1",
    date: "2024-01-13T10:15:00Z",
    status: "pending",
    category: "Salud",
    notes: "Farmacia San Juan",
  },
  {
    id: "4",
    amount: 300.0,
    concept: "Pago de servicios",
    ownerId: "4",
    payerId: "4",
    date: "2024-01-12T16:45:00Z",
    status: "completed",
    category: "Servicios",
  },
  {
    id: "5",
    amount: 85.25,
    concept: "Supermercado",
    ownerId: "5",
    payerId: "3",
    date: "2024-01-11T09:30:00Z",
    status: "completed",
    category: "Alimentación",
  },
  {
    id: "6",
    amount: 45.0,
    concept: "Café y desayuno",
    ownerId: "1",
    payerId: "1",
    date: "2024-01-10T08:30:00Z",
    status: "completed",
    category: "Alimentación",
  },
];

export const categories = [
  "Alimentación",
  "Transporte",
  "Salud",
  "Servicios",
  "Entretenimiento",
  "Educación",
  "Otros",
];

// Mock credentials for demo
export const mockCredentials = {
  "ana.garcia@email.com": { password: "admin123", user: mockUsers[0] },
  "carlos.mendoza@email.com": { password: "user123", user: mockUsers[1] },
  "maria.lopez@email.com": { password: "user123", user: mockUsers[2] },
  "diego.restrepo@email.com": { password: "user123", user: mockUsers[3] },
  "sofia.martinez@email.com": { password: "user123", user: mockUsers[4] },
};
