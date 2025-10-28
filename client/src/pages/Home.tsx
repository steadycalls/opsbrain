import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
  Link2,
  Activity,
  Users,
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "Operator"}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your SEO operations today
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Content Shipped"
            value="24"
            change="+12%"
            trend="up"
            icon={FileText}
            description="This week"
          />
          <KPICard
            title="Indexation Rate"
            value="73%"
            change="+5%"
            trend="up"
            icon={CheckCircle2}
            description="Within 7 days"
          />
          <KPICard
            title="Link Velocity"
            value="18"
            change="+3"
            trend="up"
            icon={Link2}
            description="Links this month"
          />
          <KPICard
            title="Technical Issues"
            value="12"
            change="-8"
            trend="down"
            icon={Activity}
            description="Critical issues"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Tasks</CardTitle>
                  <CardDescription>Your assigned work for today</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/team">
                    <a className="flex items-center gap-1">
                      View All <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <TaskItem
                  title="Review and publish blog post: SEO Best Practices 2025"
                  status="in_progress"
                  priority="high"
                  dueDate="Today, 3:00 PM"
                  project="Client A - Blog"
                />
                <TaskItem
                  title="Fix canonical issues on product pages"
                  status="todo"
                  priority="urgent"
                  dueDate="Today, 5:00 PM"
                  project="Client B - Technical"
                />
                <TaskItem
                  title="Outreach to 10 prospects for guest posting"
                  status="todo"
                  priority="medium"
                  dueDate="Tomorrow"
                  project="Client C - Link Building"
                />
                <TaskItem
                  title="Generate weekly client report"
                  status="todo"
                  priority="low"
                  dueDate="Friday"
                  project="Reporting"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Pipeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content Pipeline</CardTitle>
                  <CardDescription>Current workflow status</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/content">
                    <a className="flex items-center gap-1">
                      View All <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PipelineStage
                  stage="Briefs Ready"
                  count={8}
                  color="bg-chart-1"
                />
                <PipelineStage
                  stage="Drafting"
                  count={12}
                  color="bg-chart-2"
                />
                <PipelineStage
                  stage="Review"
                  count={5}
                  color="bg-chart-3"
                />
                <PipelineStage
                  stage="Approved"
                  count={3}
                  color="bg-chart-4"
                />
                <PipelineStage
                  stage="Published"
                  count={24}
                  color="bg-chart-5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Site Health Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Site Health</CardTitle>
                  <CardDescription>Technical SEO status across projects</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/site-health">
                    <a className="flex items-center gap-1">
                      View All <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SiteHealthItem
                  domain="clienta.com"
                  score={92}
                  issues={2}
                  status="good"
                />
                <SiteHealthItem
                  domain="clientb.com"
                  score={78}
                  issues={8}
                  status="warning"
                />
                <SiteHealthItem
                  domain="clientc.com"
                  score={65}
                  issues={15}
                  status="critical"
                />
                <SiteHealthItem
                  domain="clientd.com"
                  score={88}
                  issues={4}
                  status="good"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across all operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  icon={CheckCircle2}
                  title="Content published"
                  description="'Top 10 SEO Tools' went live on clienta.com"
                  time="2 hours ago"
                  iconColor="text-chart-4"
                />
                <ActivityItem
                  icon={Link2}
                  title="New backlink verified"
                  description="DR 65 link from industry-blog.com"
                  time="4 hours ago"
                  iconColor="text-chart-1"
                />
                <ActivityItem
                  icon={AlertCircle}
                  title="Technical issue detected"
                  description="12 pages with missing meta descriptions on clientb.com"
                  time="6 hours ago"
                  iconColor="text-destructive"
                />
                <ActivityItem
                  icon={Users}
                  title="Team member completed task"
                  description="Sarah finished keyword research for Client D"
                  time="Yesterday"
                  iconColor="text-chart-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <QuickActionButton
                icon={FileText}
                label="Create Brief"
                href="/content/briefs"
              />
              <QuickActionButton
                icon={Activity}
                label="Run Site Crawl"
                href="/site-health"
              />
              <QuickActionButton
                icon={Link2}
                label="Add Prospect"
                href="/authority/prospects"
              />
              <QuickActionButton
                icon={Calendar}
                label="View Calendar"
                href="/content/calendar"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="outline"
            className={
              trend === "up"
                ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                : "bg-chart-1/10 text-chart-1 border-chart-1/20"
            }
          >
            {change}
          </Badge>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskItem({
  title,
  status,
  priority,
  dueDate,
  project,
}: {
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  project: string;
}) {
  const statusColors = {
    todo: "bg-muted text-muted-foreground",
    in_progress: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    review: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  };

  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    high: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    urgent: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={statusColors[status as keyof typeof statusColors]}>
            {status.replace("_", " ")}
          </Badge>
          <Badge variant="outline" className={priorityColors[priority as keyof typeof priorityColors]}>
            {priority}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {dueDate}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{project}</p>
      </div>
    </div>
  );
}

function PipelineStage({
  stage,
  count,
  color,
}: {
  stage: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-sm font-medium">{stage}</span>
      </div>
      <Badge variant="secondary">{count}</Badge>
    </div>
  );
}

function SiteHealthItem({
  domain,
  score,
  issues,
  status,
}: {
  domain: string;
  score: number;
  issues: number;
  status: "good" | "warning" | "critical";
}) {
  const statusConfig = {
    good: { color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/20" },
    warning: { color: "text-chart-5", bg: "bg-chart-5/10", border: "border-chart-5/20" },
    critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
          <span className={`text-sm font-bold ${config.color}`}>{score}</span>
        </div>
        <div>
          <p className="text-sm font-medium">{domain}</p>
          <p className="text-xs text-muted-foreground">{issues} issues</p>
        </div>
      </div>
      <Badge variant="outline" className={`${config.bg} ${config.color} ${config.border}`}>
        {status}
      </Badge>
    </div>
  );
}

function ActivityItem({
  icon: Icon,
  title,
  description,
  time,
  iconColor,
}: {
  icon: any;
  title: string;
  description: string;
  time: string;
  iconColor: string;
}) {
  return (
    <div className="flex gap-3">
      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) {
  return (
    <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
      <Link href={href}>
        <a className="flex flex-col items-center gap-2 w-full">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </a>
      </Link>
    </Button>
  );
}
