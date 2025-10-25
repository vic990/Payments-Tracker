import { API_URL } from "../auth/constants";

export async function insertPayment() {
  try {
    const response = await fetch(`${API_URL}/`);
  } catch (error) {
    return error;
  }
}
