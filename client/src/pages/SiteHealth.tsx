import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Plus,
  Search,
  MoreVertical,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function SiteHealth() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Site Health Monitor</h1>
            <p className="text-muted-foreground">
              Technical SEO monitoring and issue detection across all domains
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Domain
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Total Domains"
            value="12"
            subtitle="8 active crawls"
            icon={Globe}
            color="bg-chart-1"
          />
          <StatsCard
            title="Critical Issues"
            value="8"
            subtitle="Needs attention"
            icon={XCircle}
            color="bg-destructive"
          />
          <StatsCard
            title="Warnings"
            value="24"
            subtitle="Medium priority"
            icon={AlertTriangle}
            color="bg-chart-5"
          />
          <StatsCard
            title="Healthy"
            value="156"
            subtitle="All clear"
            icon={CheckCircle2}
            color="bg-chart-4"
          />
        </div>

        {/* Domains Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monitored Domains</CardTitle>
                <CardDescription>
                  Technical health scores and issue tracking
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search domains..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Health Score</TableHead>
                  <TableHead>Total Pages</TableHead>
                  <TableHead>Indexed</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Last Crawl</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <DomainRow
                  domain="clienta.com"
                  healthScore={92}
                  totalPages={1247}
                  indexed={1189}
                  issues={{ critical: 0, high: 2, medium: 5, low: 8 }}
                  lastCrawl="2 hours ago"
                  cms="wordpress"
                />
                <DomainRow
                  domain="clientb.com"
                  healthScore={78}
                  totalPages={856}
                  indexed={743}
                  issues={{ critical: 3, high: 5, medium: 12, low: 15 }}
                  lastCrawl="5 hours ago"
                  cms="duda"
                />
                <DomainRow
                  domain="clientc.com"
                  healthScore={65}
                  totalPages={2341}
                  indexed={1876}
                  issues={{ critical: 5, high: 10, medium: 18, low: 22 }}
                  lastCrawl="1 day ago"
                  cms="custom"
                />
                <DomainRow
                  domain="clientd.com"
                  healthScore={88}
                  totalPages={543}
                  indexed={521}
                  issues={{ critical: 1, high: 3, medium: 7, low: 12 }}
                  lastCrawl="3 hours ago"
                  cms="ghl"
                />
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>
              Latest technical SEO problems detected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <IssueItem
                severity="critical"
                title="Missing canonical tags"
                description="12 pages on clientb.com missing canonical tags"
                domain="clientb.com"
                detectedAt="2 hours ago"
              />
              <IssueItem
                severity="high"
                title="Broken internal links"
                description="8 broken links detected on clientc.com"
                domain="clientc.com"
                detectedAt="4 hours ago"
              />
              <IssueItem
                severity="medium"
                title="Slow page load times"
                description="15 pages with load time > 3s on clienta.com"
                domain="clienta.com"
                detectedAt="6 hours ago"
              />
              <IssueItem
                severity="low"
                title="Missing alt text"
                description="24 images without alt text on clientd.com"
                domain="clientd.com"
                detectedAt="1 day ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  color: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-lg ${color}/10 flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${color.replace('bg-', 'text-')}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function DomainRow({
  domain,
  healthScore,
  totalPages,
  indexed,
  issues,
  lastCrawl,
  cms,
}: {
  domain: string;
  healthScore: number;
  totalPages: number;
  indexed: number;
  issues: { critical: number; high: number; medium: number; low: number };
  lastCrawl: string;
  cms: string;
}) {
  const scoreColor =
    healthScore >= 80
      ? "text-chart-4"
      : healthScore >= 60
      ? "text-chart-5"
      : "text-destructive";

  const indexationRate = Math.round((indexed / totalPages) * 100);

  const totalIssues = issues.critical + issues.high + issues.medium + issues.low;

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{domain}</span>
          <span className="text-xs text-muted-foreground capitalize">{cms}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Progress value={healthScore} className="h-2" />
          </div>
          <span className={`text-sm font-medium ${scoreColor}`}>{healthScore}</span>
        </div>
      </TableCell>
      <TableCell>{totalPages.toLocaleString()}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span>{indexed.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{indexationRate}%</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          {issues.critical > 0 && (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              {issues.critical}
            </Badge>
          )}
          {issues.high > 0 && (
            <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/20">
              {issues.high}
            </Badge>
          )}
          {totalIssues === 0 && (
            <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
              None
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">{lastCrawl}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Crawl
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Activity className="mr-2 h-4 w-4" />
              View Issues
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function IssueItem({
  severity,
  title,
  description,
  domain,
  detectedAt,
}: {
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  domain: string;
  detectedAt: string;
}) {
  const severityConfig = {
    critical: {
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      icon: XCircle,
    },
    high: {
      color: "text-chart-5",
      bg: "bg-chart-5/10",
      border: "border-chart-5/20",
      icon: AlertTriangle,
    },
    medium: {
      color: "text-chart-3",
      bg: "bg-chart-3/10",
      border: "border-chart-3/20",
      icon: AlertTriangle,
    },
    low: {
      color: "text-muted-foreground",
      bg: "bg-muted",
      border: "border-border",
      icon: Activity,
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{title}</p>
          <Badge variant="outline" className={`${config.bg} ${config.color} ${config.border} capitalize`}>
            {severity}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{domain}</span>
          <span>•</span>
          <span>{detectedAt}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        View
      </Button>
    </div>
  );
}
