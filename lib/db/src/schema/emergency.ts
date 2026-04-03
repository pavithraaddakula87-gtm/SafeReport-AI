import { pgTable, serial, integer, doublePrecision, timestamp } from "drizzle-orm/pg-core";

export const emergencyLocationsTable = pgTable("emergency_locations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
