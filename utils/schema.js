import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// this will create a  "UserResume" table with columns specified inside neon resume builder database
export const UserResume = pgTable("userResume", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userEmail: varchar("userEmail").notNull(),
  userName: varchar("userName").notNull(),
  createdAt: varchar("createdAt").notNull(),
  resumeId: varchar("resumeId").notNull(),
});
