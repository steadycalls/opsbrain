import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, index, uniqueIndex } from "drizzle-orm/mysql-core";

/**
 * OpsBrain App Database Schema
 * Comprehensive data model for SEO, content, and client operations
 */

// ============================================================================
// CORE USER & AUTH TABLES
// ============================================================================

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["owner", "manager", "operator", "va", "client_viewer"]).default("operator").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const roles = mysqlTable("roles", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  permissions: text("permissions"), // JSON array of permissions
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id"),
  accountId: int("account_id"),
  action: varchar("action", { length: 255 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }),
  entityId: int("entity_id"),
  details: text("details"), // JSON
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("user_idx").on(table.userId),
  accountIdx: index("account_idx").on(table.accountId),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

// ============================================================================
// ACCOUNT & PROJECT MANAGEMENT
// ============================================================================

export const accounts = mysqlTable("accounts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }),
  status: mysqlEnum("status", ["active", "paused", "churned"]).default("active").notNull(),
  tier: mysqlEnum("tier", ["basic", "pro", "enterprise"]).default("basic").notNull(),
  ownerId: int("owner_id"),
  billingEmail: varchar("billing_email", { length: 320 }),
  monthlyRetainer: int("monthly_retainer").default(0),
  grossMargin: int("gross_margin"), // percentage
  settings: text("settings"), // JSON
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  ownerIdx: index("owner_idx").on(table.ownerId),
}));

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["planning", "active", "paused", "completed"]).default("planning").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  budget: int("budget"),
  spentAmount: int("spent_amount").default(0),
  managerId: int("manager_id"),
  settings: text("settings"), // JSON
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  managerIdx: index("manager_idx").on(table.managerId),
}));

// ============================================================================
// DOMAIN & PAGE MANAGEMENT
// ============================================================================

export const domains = mysqlTable("domains", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  domain: varchar("domain", { length: 255 }).notNull(),
  cms: mysqlEnum("cms", ["wordpress", "duda", "ghl", "custom"]),
  apiKey: text("api_key"), // encrypted
  status: mysqlEnum("status", ["active", "inactive", "pending"]).default("active").notNull(),
  crawlFrequency: mysqlEnum("crawl_frequency", ["hourly", "daily", "weekly"]).default("daily"),
  lastCrawlAt: timestamp("last_crawl_at"),
  totalPages: int("total_pages").default(0),
  indexedPages: int("indexed_pages").default(0),
  technicalScore: int("technical_score"), // 0-100
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  domainUnique: uniqueIndex("domain_unique").on(table.domain),
}));

export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().primaryKey(),
  domainId: int("domain_id").notNull(),
  url: text("url").notNull(),
  urlHash: varchar("url_hash", { length: 64 }).notNull(), // for indexing
  status: mysqlEnum("status", ["live", "404", "redirect", "error"]).default("live").notNull(),
  cms: varchar("cms", { length: 50 }),
  wordCount: int("word_count"),
  hasSchema: boolean("has_schema").default(false),
  schemaTypes: text("schema_types"), // JSON array
  internalLinks: int("internal_links").default(0),
  externalLinks: int("external_links").default(0),
  lastCrawlAt: timestamp("last_crawl_at"),
  indexedAt: timestamp("indexed_at"),
  title: text("title"),
  metaDescription: text("meta_description"),
  h1: text("h1"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  domainIdx: index("domain_idx").on(table.domainId),
  urlHashIdx: index("url_hash_idx").on(table.urlHash),
  statusIdx: index("status_idx").on(table.status),
}));

// ============================================================================
// CONTENT MANAGEMENT
// ============================================================================

export const keywords = mysqlTable("keywords", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  keyword: varchar("keyword", { length: 500 }).notNull(),
  searchVolume: int("search_volume"),
  difficulty: int("difficulty"), // 0-100
  cpc: int("cpc"), // in cents
  intent: mysqlEnum("intent", ["informational", "navigational", "commercial", "transactional"]),
  currentRank: int("current_rank"),
  targetRank: int("target_rank"),
  assignedPostId: int("assigned_post_id"),
  status: mysqlEnum("status", ["researched", "assigned", "ranking", "achieved"]).default("researched").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  statusIdx: index("status_idx").on(table.status),
}));

export const briefs = mysqlTable("briefs", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  keywordId: int("keyword_id"),
  title: varchar("title", { length: 500 }).notNull(),
  targetKeyword: varchar("target_keyword", { length: 500 }),
  outline: text("outline"), // JSON
  serpAnalysis: text("serp_analysis"), // JSON
  wordCountTarget: int("word_count_target"),
  toneGuidelines: text("tone_guidelines"),
  internalLinkSuggestions: text("internal_link_suggestions"), // JSON
  status: mysqlEnum("status", ["draft", "approved", "assigned"]).default("draft").notNull(),
  assignedTo: int("assigned_to"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  keywordIdx: index("keyword_idx").on(table.keywordId),
  statusIdx: index("status_idx").on(table.status),
}));

export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  domainId: int("domain_id"),
  briefId: int("brief_id"),
  slug: varchar("slug", { length: 500 }),
  targetKw: varchar("target_kw", { length: 500 }),
  outline: text("outline"), // JSON
  draftUrl: text("draft_url"),
  publishUrl: text("publish_url"),
  serpTarget: int("serp_target"), // target SERP position
  currentPosition: int("current_position"),
  status: mysqlEnum("status", ["brief_ready", "drafting", "review", "approved", "published", "indexed"]).default("brief_ready").notNull(),
  wordCount: int("word_count"),
  authorId: int("author_id"),
  publishedAt: timestamp("published_at"),
  indexedAt: timestamp("indexed_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  domainIdx: index("domain_idx").on(table.domainId),
  briefIdx: index("brief_idx").on(table.briefId),
  statusIdx: index("status_idx").on(table.status),
}));

// ============================================================================
// TASK MANAGEMENT
// ============================================================================

export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  type: mysqlEnum("type", ["content", "technical", "link_building", "client", "admin"]).notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["todo", "in_progress", "review", "blocked", "completed"]).default("todo").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium").notNull(),
  ownerId: int("owner_id"),
  assignedTo: int("assigned_to"),
  eta: timestamp("eta"),
  effort: int("effort"), // in hours
  costCode: varchar("cost_code", { length: 100 }),
  relatedEntityType: varchar("related_entity_type", { length: 100 }),
  relatedEntityId: int("related_entity_id"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  assignedToIdx: index("assigned_to_idx").on(table.assignedTo),
  statusIdx: index("status_idx").on(table.status),
}));

// ============================================================================
// TECHNICAL SEO & ISSUES
// ============================================================================

export const issues = mysqlTable("issues", {
  id: int("id").autoincrement().primaryKey(),
  domainId: int("domain_id").notNull(),
  pageId: int("page_id"),
  severity: mysqlEnum("severity", ["critical", "high", "medium", "low"]).default("medium").notNull(),
  ruleId: varchar("rule_id", { length: 100 }).notNull(),
  ruleName: varchar("rule_name", { length: 255 }),
  description: text("description"),
  status: mysqlEnum("status", ["open", "in_progress", "fixed", "ignored"]).default("open").notNull(),
  autoFixable: boolean("auto_fixable").default(false),
  firstSeen: timestamp("first_seen").defaultNow().notNull(),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
  fixedAt: timestamp("fixed_at"),
  assignedTaskId: int("assigned_task_id"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  domainIdx: index("domain_idx").on(table.domainId),
  pageIdx: index("page_idx").on(table.pageId),
  severityIdx: index("severity_idx").on(table.severity),
  statusIdx: index("status_idx").on(table.status),
}));

// ============================================================================
// LINK BUILDING
// ============================================================================

export const prospects = mysqlTable("prospects", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  domain: varchar("domain", { length: 255 }).notNull(),
  url: text("url"),
  dr: int("dr"), // Domain Rating
  traffic: int("traffic"),
  topicRelevance: int("topic_relevance"), // 0-100
  contactEmail: varchar("contact_email", { length: 320 }),
  contactName: varchar("contact_name", { length: 255 }),
  status: mysqlEnum("status", ["identified", "contacted", "replied", "negotiating", "accepted", "rejected"]).default("identified").notNull(),
  outreachTemplate: text("outreach_template"),
  lastContactedAt: timestamp("last_contacted_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  statusIdx: index("status_idx").on(table.status),
}));

export const links = mysqlTable("links", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  prospectId: int("prospect_id"),
  sourceUrl: text("source_url").notNull(),
  targetUrl: text("target_url").notNull(),
  dr: int("dr"),
  anchor: text("anchor"),
  status: mysqlEnum("status", ["pending", "live", "removed", "nofollow"]).default("pending").notNull(),
  linkType: mysqlEnum("link_type", ["guest_post", "editorial", "resource", "directory", "other"]),
  verifiedAt: timestamp("verified_at"),
  lastCheckedAt: timestamp("last_checked_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  prospectIdx: index("prospect_idx").on(table.prospectId),
  statusIdx: index("status_idx").on(table.status),
}));

// ============================================================================
// RANKDRE SUPPORT
// ============================================================================

export const gbps = mysqlTable("gbps", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  projectId: int("project_id"),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 255 }),
  category: varchar("category", { length: 255 }),
  businessName: varchar("business_name", { length: 255 }),
  status: mysqlEnum("status", ["pending", "created", "warming", "active", "suspended"]).default("pending").notNull(),
  phone: varchar("phone", { length: 50 }),
  gmail: varchar("gmail", { length: 320 }),
  gmailPassword: text("gmail_password"), // encrypted
  gbpUrl: text("gbp_url"),
  verificationMethod: varchar("verification_method", { length: 100 }),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  projectIdx: index("project_idx").on(table.projectId),
  statusIdx: index("status_idx").on(table.status),
  locationIdx: index("location_idx").on(table.state, table.city),
}));

// ============================================================================
// COMMUNICATION
// ============================================================================

export const emails = mysqlTable("emails", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  prospectId: int("prospect_id"),
  subject: varchar("subject", { length: 500 }),
  body: text("body"),
  fromEmail: varchar("from_email", { length: 320 }),
  toEmail: varchar("to_email", { length: 320 }),
  status: mysqlEnum("status", ["draft", "sent", "delivered", "opened", "replied", "bounced"]).default("draft").notNull(),
  sentAt: timestamp("sent_at"),
  openedAt: timestamp("opened_at"),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  prospectIdx: index("prospect_idx").on(table.prospectId),
  statusIdx: index("status_idx").on(table.status),
}));

export const calls = mysqlTable("calls", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  gbpId: int("gbp_id"),
  callerPhone: varchar("caller_phone", { length: 50 }),
  receiverPhone: varchar("receiver_phone", { length: 50 }),
  duration: int("duration"), // in seconds
  status: mysqlEnum("status", ["answered", "missed", "voicemail"]),
  recordingUrl: text("recording_url"),
  transcription: text("transcription"),
  leadQuality: mysqlEnum("lead_quality", ["hot", "warm", "cold", "spam"]),
  calledAt: timestamp("called_at").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  gbpIdx: index("gbp_idx").on(table.gbpId),
  calledAtIdx: index("called_at_idx").on(table.calledAt),
}));

// ============================================================================
// BILLING & INVOICES
// ============================================================================

export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  invoiceNumber: varchar("invoice_number", { length: 100 }).notNull().unique(),
  status: mysqlEnum("status", ["draft", "sent", "paid", "overdue", "cancelled"]).default("draft").notNull(),
  amount: int("amount").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("USD"),
  billingPeriodStart: timestamp("billing_period_start"),
  billingPeriodEnd: timestamp("billing_period_end"),
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  lineItems: text("line_items"), // JSON
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  statusIdx: index("status_idx").on(table.status),
}));

// ============================================================================
// WEBHOOKS
// ============================================================================

export const webhookEvents = mysqlTable("webhook_events", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id"),
  source: varchar("source", { length: 100 }).notNull(),
  eventType: varchar("event_type", { length: 255 }).notNull(),
  payloadJson: text("payload_json").notNull(),
  hash: varchar("hash", { length: 64 }).notNull(),
  receivedAt: timestamp("received_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
  status: mysqlEnum("status", ["pending", "processing", "processed", "failed"]).default("pending").notNull(),
  attempts: int("attempts").default(0),
  error: text("error"),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  sourceIdx: index("source_idx").on(table.source),
  statusIdx: index("status_idx").on(table.status),
  hashIdx: index("hash_idx").on(table.hash),
}));

export const webhookSubscriptions = mysqlTable("webhook_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("account_id").notNull(),
  event: varchar("event", { length: 255 }).notNull(),
  targetUrl: text("target_url").notNull(),
  secret: text("secret").notNull(),
  headers: text("headers"), // JSON
  filterExpr: text("filter_expr"),
  retryMax: int("retry_max").default(5),
  isEnabled: boolean("is_enabled").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  accountIdx: index("account_idx").on(table.accountId),
  eventIdx: index("event_idx").on(table.event),
}));

export const webhookDeliveryLogs = mysqlTable("webhook_delivery_logs", {
  id: int("id").autoincrement().primaryKey(),
  subscriptionId: int("subscription_id").notNull(),
  eventId: int("event_id"),
  statusCode: int("status_code"),
  latencyMs: int("latency_ms"),
  attempts: int("attempts").default(1),
  responseSnippet: text("response_snippet"),
  deliveredAt: timestamp("delivered_at").defaultNow().notNull(),
}, (table) => ({
  subscriptionIdx: index("subscription_idx").on(table.subscriptionId),
  eventIdx: index("event_idx").on(table.eventId),
}));

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Domain = typeof domains.$inferSelect;
export type InsertDomain = typeof domains.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type InsertPage = typeof pages.$inferInsert;
export type Keyword = typeof keywords.$inferSelect;
export type InsertKeyword = typeof keywords.$inferInsert;
export type Brief = typeof briefs.$inferSelect;
export type InsertBrief = typeof briefs.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
export type Issue = typeof issues.$inferSelect;
export type InsertIssue = typeof issues.$inferInsert;
export type Prospect = typeof prospects.$inferSelect;
export type InsertProspect = typeof prospects.$inferInsert;
export type Link = typeof links.$inferSelect;
export type InsertLink = typeof links.$inferInsert;
export type GBP = typeof gbps.$inferSelect;
export type InsertGBP = typeof gbps.$inferInsert;
export type Email = typeof emails.$inferSelect;
export type InsertEmail = typeof emails.$inferInsert;
export type Call = typeof calls.$inferSelect;
export type InsertCall = typeof calls.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;
export type WebhookEvent = typeof webhookEvents.$inferSelect;
export type InsertWebhookEvent = typeof webhookEvents.$inferInsert;
export type WebhookSubscription = typeof webhookSubscriptions.$inferSelect;
export type InsertWebhookSubscription = typeof webhookSubscriptions.$inferInsert;
