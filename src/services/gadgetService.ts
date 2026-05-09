import { getDatabase } from "../database/database";
import { Gadget, NewGadget } from "../types/gadget";

export const gadgetService = {
  create: async (gadget: NewGadget): Promise<number> => {
    const db = await getDatabase();

    const result = await db.runAsync(
      "INSERT INTO gadgets(name, brand, category, price, purchaseYear) VALUES (?, ?, ?, ?, ?)",
      [
        gadget.name,
        gadget.brand,
        gadget.category,
        Number(gadget.price),
        Number(gadget.purchaseYear),
      ]
    );

    return result.lastInsertRowId;
  },

  getAll: async (): Promise<Gadget[]> => {
    const db = await getDatabase();

    const gadgets = await db.getAllAsync<Gadget>(
      "SELECT * FROM gadgets ORDER BY name ASC"
    );

    return gadgets;
  },

  getById: async (id: number): Promise<Gadget | null> => {
    const db = await getDatabase();

    const gadget = await db.getFirstAsync<Gadget>(
      "SELECT * FROM gadgets WHERE id = ?",
      [id]
    );

    return gadget ?? null;
  },

  update: async (id: number, gadget: NewGadget): Promise<void> => {
    const db = await getDatabase();

    await db.runAsync(
      "UPDATE gadgets SET name=?, brand=?, category=?, price=?, purchaseYear=? WHERE id=?",
      [
        gadget.name,
        gadget.brand,
        gadget.category,
        Number(gadget.price),
        Number(gadget.purchaseYear),
        id,
      ]
    );
  },

  delete: async (id: number): Promise<void> => {
    const db = await getDatabase();

    await db.runAsync("DELETE FROM gadgets WHERE id = ?", [id]);
  },
};