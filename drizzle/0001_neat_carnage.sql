CREATE TABLE `accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`company_name` varchar(255),
	`status` enum('active','paused','churned') NOT NULL DEFAULT 'active',
	`tier` enum('basic','pro','enterprise') NOT NULL DEFAULT 'basic',
	`owner_id` int,
	`billing_email` varchar(320),
	`monthly_retainer` int DEFAULT 0,
	`gross_margin` int,
	`settings` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`account_id` int,
	`action` varchar(255) NOT NULL,
	`entity_type` varchar(100),
	`entity_id` int,
	`details` text,
	`ip_address` varchar(45),
	`user_agent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `briefs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`keyword_id` int,
	`title` varchar(500) NOT NULL,
	`target_keyword` varchar(500),
	`outline` text,
	`serp_analysis` text,
	`word_count_target` int,
	`tone_guidelines` text,
	`internal_link_suggestions` text,
	`status` enum('draft','approved','assigned') NOT NULL DEFAULT 'draft',
	`assigned_to` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `briefs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calls` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`gbp_id` int,
	`caller_phone` varchar(50),
	`receiver_phone` varchar(50),
	`duration` int,
	`status` enum('answered','missed','voicemail'),
	`recording_url` text,
	`transcription` text,
	`lead_quality` enum('hot','warm','cold','spam'),
	`called_at` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `calls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `domains` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`domain` varchar(255) NOT NULL,
	`cms` enum('wordpress','duda','ghl','custom'),
	`api_key` text,
	`status` enum('active','inactive','pending') NOT NULL DEFAULT 'active',
	`crawl_frequency` enum('hourly','daily','weekly') DEFAULT 'daily',
	`last_crawl_at` timestamp,
	`total_pages` int DEFAULT 0,
	`indexed_pages` int DEFAULT 0,
	`technical_score` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `domains_id` PRIMARY KEY(`id`),
	CONSTRAINT `domain_unique` UNIQUE(`domain`)
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`prospect_id` int,
	`subject` varchar(500),
	`body` text,
	`from_email` varchar(320),
	`to_email` varchar(320),
	`status` enum('draft','sent','delivered','opened','replied','bounced') NOT NULL DEFAULT 'draft',
	`sent_at` timestamp,
	`opened_at` timestamp,
	`replied_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gbps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`state` varchar(100),
	`city` varchar(255),
	`category` varchar(255),
	`business_name` varchar(255),
	`status` enum('pending','created','warming','active','suspended') NOT NULL DEFAULT 'pending',
	`phone` varchar(50),
	`gmail` varchar(320),
	`gmail_password` text,
	`gbp_url` text,
	`verification_method` varchar(100),
	`verified_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gbps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`invoice_number` varchar(100) NOT NULL,
	`status` enum('draft','sent','paid','overdue','cancelled') NOT NULL DEFAULT 'draft',
	`amount` int NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`billing_period_start` timestamp,
	`billing_period_end` timestamp,
	`due_date` timestamp,
	`paid_at` timestamp,
	`line_items` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`),
	CONSTRAINT `invoices_invoice_number_unique` UNIQUE(`invoice_number`)
);
--> statement-breakpoint
CREATE TABLE `issues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`domain_id` int NOT NULL,
	`page_id` int,
	`severity` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
	`rule_id` varchar(100) NOT NULL,
	`rule_name` varchar(255),
	`description` text,
	`status` enum('open','in_progress','fixed','ignored') NOT NULL DEFAULT 'open',
	`auto_fixable` boolean DEFAULT false,
	`first_seen` timestamp NOT NULL DEFAULT (now()),
	`last_seen` timestamp NOT NULL DEFAULT (now()),
	`fixed_at` timestamp,
	`assigned_task_id` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `issues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `keywords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`keyword` varchar(500) NOT NULL,
	`search_volume` int,
	`difficulty` int,
	`cpc` int,
	`intent` enum('informational','navigational','commercial','transactional'),
	`current_rank` int,
	`target_rank` int,
	`assigned_post_id` int,
	`status` enum('researched','assigned','ranking','achieved') NOT NULL DEFAULT 'researched',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `keywords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`prospect_id` int,
	`source_url` text NOT NULL,
	`target_url` text NOT NULL,
	`dr` int,
	`anchor` text,
	`status` enum('pending','live','removed','nofollow') NOT NULL DEFAULT 'pending',
	`link_type` enum('guest_post','editorial','resource','directory','other'),
	`verified_at` timestamp,
	`last_checked_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`domain_id` int NOT NULL,
	`url` text NOT NULL,
	`url_hash` varchar(64) NOT NULL,
	`status` enum('live','404','redirect','error') NOT NULL DEFAULT 'live',
	`cms` varchar(50),
	`word_count` int,
	`has_schema` boolean DEFAULT false,
	`schema_types` text,
	`internal_links` int DEFAULT 0,
	`external_links` int DEFAULT 0,
	`last_crawl_at` timestamp,
	`indexed_at` timestamp,
	`title` text,
	`meta_description` text,
	`h1` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`domain_id` int,
	`brief_id` int,
	`slug` varchar(500),
	`target_kw` varchar(500),
	`outline` text,
	`draft_url` text,
	`publish_url` text,
	`serp_target` int,
	`current_position` int,
	`status` enum('brief_ready','drafting','review','approved','published','indexed') NOT NULL DEFAULT 'brief_ready',
	`word_count` int,
	`author_id` int,
	`published_at` timestamp,
	`indexed_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`status` enum('planning','active','paused','completed') NOT NULL DEFAULT 'planning',
	`start_date` timestamp,
	`end_date` timestamp,
	`budget` int,
	`spent_amount` int DEFAULT 0,
	`manager_id` int,
	`settings` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prospects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`domain` varchar(255) NOT NULL,
	`url` text,
	`dr` int,
	`traffic` int,
	`topic_relevance` int,
	`contact_email` varchar(320),
	`contact_name` varchar(255),
	`status` enum('identified','contacted','replied','negotiating','accepted','rejected') NOT NULL DEFAULT 'identified',
	`outreach_template` text,
	`last_contacted_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prospects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`permissions` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`project_id` int,
	`type` enum('content','technical','link_building','client','admin') NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`status` enum('todo','in_progress','review','blocked','completed') NOT NULL DEFAULT 'todo',
	`priority` enum('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
	`owner_id` int,
	`assigned_to` int,
	`eta` timestamp,
	`effort` int,
	`cost_code` varchar(100),
	`related_entity_type` varchar(100),
	`related_entity_id` int,
	`completed_at` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `webhook_delivery_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscription_id` int NOT NULL,
	`event_id` int,
	`status_code` int,
	`latency_ms` int,
	`attempts` int DEFAULT 1,
	`response_snippet` text,
	`delivered_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webhook_delivery_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int,
	`source` varchar(100) NOT NULL,
	`event_type` varchar(255) NOT NULL,
	`payload_json` text NOT NULL,
	`hash` varchar(64) NOT NULL,
	`received_at` timestamp NOT NULL DEFAULT (now()),
	`processed_at` timestamp,
	`status` enum('pending','processing','processed','failed') NOT NULL DEFAULT 'pending',
	`attempts` int DEFAULT 0,
	`error` text,
	CONSTRAINT `webhook_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `webhook_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`account_id` int NOT NULL,
	`event` varchar(255) NOT NULL,
	`target_url` text NOT NULL,
	`secret` text NOT NULL,
	`headers` text,
	`filter_expr` text,
	`retry_max` int DEFAULT 5,
	`is_enabled` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `webhook_subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('owner','manager','operator','va','client_viewer') NOT NULL DEFAULT 'operator';--> statement-breakpoint
CREATE INDEX `owner_idx` ON `accounts` (`owner_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `audit_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `audit_logs` (`account_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `audit_logs` (`createdAt`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `briefs` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `briefs` (`project_id`);--> statement-breakpoint
CREATE INDEX `keyword_idx` ON `briefs` (`keyword_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `briefs` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `calls` (`account_id`);--> statement-breakpoint
CREATE INDEX `gbp_idx` ON `calls` (`gbp_id`);--> statement-breakpoint
CREATE INDEX `called_at_idx` ON `calls` (`called_at`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `domains` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `domains` (`project_id`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `emails` (`account_id`);--> statement-breakpoint
CREATE INDEX `prospect_idx` ON `emails` (`prospect_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `emails` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `gbps` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `gbps` (`project_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `gbps` (`status`);--> statement-breakpoint
CREATE INDEX `location_idx` ON `gbps` (`state`,`city`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `invoices` (`account_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `invoices` (`status`);--> statement-breakpoint
CREATE INDEX `domain_idx` ON `issues` (`domain_id`);--> statement-breakpoint
CREATE INDEX `page_idx` ON `issues` (`page_id`);--> statement-breakpoint
CREATE INDEX `severity_idx` ON `issues` (`severity`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `issues` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `keywords` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `keywords` (`project_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `keywords` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `links` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `links` (`project_id`);--> statement-breakpoint
CREATE INDEX `prospect_idx` ON `links` (`prospect_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `links` (`status`);--> statement-breakpoint
CREATE INDEX `domain_idx` ON `pages` (`domain_id`);--> statement-breakpoint
CREATE INDEX `url_hash_idx` ON `pages` (`url_hash`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `pages` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `posts` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `posts` (`project_id`);--> statement-breakpoint
CREATE INDEX `domain_idx` ON `posts` (`domain_id`);--> statement-breakpoint
CREATE INDEX `brief_idx` ON `posts` (`brief_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `posts` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `projects` (`account_id`);--> statement-breakpoint
CREATE INDEX `manager_idx` ON `projects` (`manager_id`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `prospects` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `prospects` (`project_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `prospects` (`status`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `tasks` (`account_id`);--> statement-breakpoint
CREATE INDEX `project_idx` ON `tasks` (`project_id`);--> statement-breakpoint
CREATE INDEX `assigned_to_idx` ON `tasks` (`assigned_to`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `tasks` (`status`);--> statement-breakpoint
CREATE INDEX `subscription_idx` ON `webhook_delivery_logs` (`subscription_id`);--> statement-breakpoint
CREATE INDEX `event_idx` ON `webhook_delivery_logs` (`event_id`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `webhook_events` (`account_id`);--> statement-breakpoint
CREATE INDEX `source_idx` ON `webhook_events` (`source`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `webhook_events` (`status`);--> statement-breakpoint
CREATE INDEX `hash_idx` ON `webhook_events` (`hash`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `webhook_subscriptions` (`account_id`);--> statement-breakpoint
CREATE INDEX `event_idx` ON `webhook_subscriptions` (`event`);