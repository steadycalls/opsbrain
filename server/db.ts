import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  accounts,
  projects,
  domains,
  pages,
  keywords,
  briefs,
  posts,
  tasks,
  issues,
  prospects,
  links,
  gbps,
  emails,
  calls,
  invoices,
  webhookEvents,
  webhookSubscriptions,
  auditLogs,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'owner';
      updateSet.role = 'owner';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// ACCOUNT & PROJECT QUERIES
// ============================================================================

export async function getAllAccounts() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(accounts).orderBy(desc(accounts.createdAt));
}

export async function getAccountById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProjectsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(projects).where(eq(projects.accountId, accountId)).orderBy(desc(projects.createdAt));
}

// ============================================================================
// DOMAIN & PAGE QUERIES
// ============================================================================

export async function getAllDomains() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(domains).orderBy(desc(domains.createdAt));
}

export async function getDomainsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(domains).where(eq(domains.accountId, accountId)).orderBy(desc(domains.createdAt));
}

export async function getPagesByDomain(domainId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(pages).where(eq(pages.domainId, domainId)).limit(limit);
}

// ============================================================================
// CONTENT QUERIES
// ============================================================================

export async function getKeywordsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(keywords).where(eq(keywords.accountId, accountId)).orderBy(desc(keywords.createdAt));
}

export async function getBriefsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(briefs).where(eq(briefs.accountId, accountId)).orderBy(desc(briefs.createdAt));
}

export async function getPostsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(posts).where(eq(posts.accountId, accountId)).orderBy(desc(posts.createdAt));
}

export async function getPostsByStatus(accountId: number, status: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(posts)
    .where(and(
      eq(posts.accountId, accountId),
      eq(posts.status, status as any)
    ))
    .orderBy(desc(posts.createdAt));
}

// ============================================================================
// TASK QUERIES
// ============================================================================

export async function getTasksByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(tasks)
    .where(eq(tasks.assignedTo, userId))
    .orderBy(desc(tasks.createdAt));
}

export async function getTasksByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(tasks)
    .where(eq(tasks.accountId, accountId))
    .orderBy(desc(tasks.createdAt));
}

// ============================================================================
// ISSUE QUERIES
// ============================================================================

export async function getIssuesByDomain(domainId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(issues)
    .where(eq(issues.domainId, domainId))
    .orderBy(desc(issues.firstSeen));
}

export async function getCriticalIssues() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(issues)
    .where(and(
      eq(issues.severity, 'critical'),
      eq(issues.status, 'open')
    ))
    .orderBy(desc(issues.firstSeen));
}

// ============================================================================
// LINK BUILDING QUERIES
// ============================================================================

export async function getProspectsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(prospects)
    .where(eq(prospects.accountId, accountId))
    .orderBy(desc(prospects.createdAt));
}

export async function getLinksByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(links)
    .where(eq(links.accountId, accountId))
    .orderBy(desc(links.createdAt));
}

export async function getVerifiedLinks(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(links)
    .where(and(
      eq(links.accountId, accountId),
      eq(links.status, 'live')
    ))
    .orderBy(desc(links.verifiedAt));
}

// ============================================================================
// RANKDRE QUERIES
// ============================================================================

export async function getGBPsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(gbps)
    .where(eq(gbps.accountId, accountId))
    .orderBy(desc(gbps.createdAt));
}

export async function getCallsByGBP(gbpId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(calls)
    .where(eq(calls.gbpId, gbpId))
    .orderBy(desc(calls.calledAt));
}

// ============================================================================
// WEBHOOK QUERIES
// ============================================================================

export async function getWebhookEventsByAccount(accountId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(webhookEvents)
    .where(eq(webhookEvents.accountId, accountId))
    .orderBy(desc(webhookEvents.receivedAt))
    .limit(limit);
}

export async function getWebhookSubscriptionsByAccount(accountId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(webhookSubscriptions)
    .where(eq(webhookSubscriptions.accountId, accountId))
    .orderBy(desc(webhookSubscriptions.createdAt));
}

// ============================================================================
// AUDIT LOG QUERIES
// ============================================================================

export async function createAuditLog(log: {
  userId?: number;
  accountId?: number;
  action: string;
  entityType?: string;
  entityId?: number;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(auditLogs).values(log);
}

export async function getAuditLogsByAccount(accountId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(auditLogs)
    .where(eq(auditLogs.accountId, accountId))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit);
}
