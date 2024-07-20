import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// this will create a  "UserResume" table with columns specified inside neon resume builder database
export const UserResume = pgTable("userResume", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userEmail: varchar("userEmail").notNull(),
  userName: varchar("userName").notNull(),
  createdAt: varchar("createdAt").notNull(),
  resumeId: varchar("resumeId").notNull(),
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  address: varchar("address"),
  jobTitle: varchar("jobTitle"),
  phone: varchar("phone"),
  email: varchar("email"),
  website: varchar("website"),
  summary: varchar("summary", { length: 1000 }),
  experience: text("experience"),
  education: text("education"),
});
