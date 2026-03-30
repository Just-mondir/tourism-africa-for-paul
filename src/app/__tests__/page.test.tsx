/**
 * Test d'intégration pour la page d'accueil
 */

import { render, screen } from "@testing-library/react";
import HomePage from "../page";

// Mock des composants et fonctions
jest.mock("@/lib/supabase/queries", () => ({
  getDestinations: jest.fn(() =>
    Promise.resolve({
      destinations: [],
      total: 0,
      page: 1,
      limit: 4,
    })
  ),
  getPosts: jest.fn(() =>
    Promise.resolve({
      posts: [],
      total: 0,
      page: 1,
      limit: 4,
    })
  ),
}));

describe("HomePage", () => {
  it("renders the hero section", async () => {
    render(await HomePage());
    expect(
      screen.getByText(/Découvrez les.*merveilles cachées.*du monde/i)
    ).toBeInTheDocument();
  });

  it("renders navigation links", async () => {
    render(await HomePage());
    expect(screen.getByText(/Trouver votre voyage/i)).toBeInTheDocument();
    expect(screen.getByText(/Lire les articles/i)).toBeInTheDocument();
  });
});

