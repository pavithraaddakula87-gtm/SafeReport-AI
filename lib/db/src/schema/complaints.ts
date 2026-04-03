import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  real,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const complaintsTable = pgTable("complaints", {
  id: serial("id").primaryKey(),
  complaintId: varchar("complaint_id", { length: 20 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  subcategory: varchar("subcategory", { length: 100 }),
  aiCategory: varchar("ai_category", { length: 100 }),
  sentiment: varchar("sentiment", { length: 50 }),
  urgency: varchar("urgency", { length: 20 }).notNull().default("medium"),
  riskScore: integer("risk_score").default(0),
  locationLat: real("location_lat"),
  locationLng: real("location_lng"),
  locationName: varchar("location_name", { length: 500 }),
  incidentDate: timestamp("incident_date"),
  isUrgent: boolean("is_urgent").default(false),
  isUnsafe: boolean("is_unsafe").default(false),
  isRepeat: boolean("is_repeat").default(false),
  numberOfPeople: integer("number_of_people").default(1),
  witnessDetails: text("witness_details"),
  isAnonymous: boolean("is_anonymous").default(true),
  privacyLevel: varchar("privacy_level", { length: 20 }).default("full"),
  reporterName: varchar("reporter_name", { length: 255 }),
  reporterEmail: varchar("reporter_email", { length: 255 }),
  reporterPhone: varchar("reporter_phone", { length: 50 }),
  contactMethod: varchar("contact_method", { length: 50 }),
  additionalNotes: text("additional_notes"),
  imageBase64: text("image_base64"),
  imagesBase64: jsonb("images_base64").$type<string[]>().default([]),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  assignedTo: varchar("assigned_to", { length: 255 }),
  assignedTeam: varchar("assigned_team", { length: 255 }),
  assignedMemberPhone: varchar("assigned_member_phone", { length: 50 }),
  escalationLevel: integer("escalation_level").default(0),
  adminNotes: text("admin_notes"),
  userId: integer("user_id").references(() => usersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  complaintId: integer("complaint_id")
    .notNull()
    .references(() => complaintsTable.id),
  senderId: integer("sender_id").references(() => usersTable.id),
  senderName: varchar("sender_name", { length: 255 }),
  senderRole: varchar("sender_role", { length: 50 }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const escalationsTable = pgTable("escalations", {
  id: serial("id").primaryKey(),
  complaintId: integer("complaint_id")
    .notNull()
    .references(() => complaintsTable.id),
  level: integer("level").notNull(),
  reason: text("reason").notNull(),
  escalatedBy: integer("escalated_by").references(() => usersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertComplaintSchema = createInsertSchema(complaintsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertMessageSchema = createInsertSchema(messagesTable).omit({
  id: true,
  createdAt: true,
});
export const insertEscalationSchema = createInsertSchema(escalationsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Complaint = typeof complaintsTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;
export type Escalation = typeof escalationsTable.$inferSelect;
