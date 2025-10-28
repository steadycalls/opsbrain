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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Plus,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export default function ContentHub() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Intelligence Hub</h1>
            <p className="text-muted-foreground">
              Manage keywords, briefs, and content from creation to publication
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Brief
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Total Keywords"
            value="1,247"
            change="+23 this week"
            icon={TrendingUp}
          />
          <StatsCard
            title="Active Briefs"
            value="34"
            change="12 pending review"
            icon={FileText}
          />
          <StatsCard
            title="In Production"
            value="28"
            change="8 publishing today"
            icon={Edit}
          />
          <StatsCard
            title="Published"
            value="156"
            change="24 this month"
            icon={Calendar}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="keywords" className="space-y-4">
          <TabsList>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="briefs">Briefs</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Keyword Research</CardTitle>
                    <CardDescription>
                      Track and manage target keywords across all projects
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search keywords..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">Import from Airtable</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Intent</TableHead>
                      <TableHead>Current Rank</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <KeywordRow
                      keyword="best seo tools 2025"
                      volume={12100}
                      difficulty={65}
                      intent="commercial"
                      currentRank={null}
                      status="researched"
                    />
                    <KeywordRow
                      keyword="how to do keyword research"
                      volume={8900}
                      difficulty={42}
                      intent="informational"
                      currentRank={15}
                      status="ranking"
                    />
                    <KeywordRow
                      keyword="seo audit checklist"
                      volume={5400}
                      difficulty={38}
                      intent="informational"
                      currentRank={8}
                      status="achieved"
                    />
                    <KeywordRow
                      keyword="local seo services"
                      volume={3200}
                      difficulty={55}
                      intent="commercial"
                      currentRank={null}
                      status="assigned"
                    />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Briefs Tab */}
          <TabsContent value="briefs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Briefs</CardTitle>
                <CardDescription>
                  AI-generated briefs ready for content creation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Target Keyword</TableHead>
                      <TableHead>Word Count</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <BriefRow
                      title="The Ultimate Guide to SEO Tools in 2025"
                      keyword="best seo tools 2025"
                      wordCount={2500}
                      assignedTo="Sarah Johnson"
                      status="approved"
                    />
                    <BriefRow
                      title="Keyword Research: A Step-by-Step Guide"
                      keyword="how to do keyword research"
                      wordCount={1800}
                      assignedTo="Mike Chen"
                      status="draft"
                    />
                    <BriefRow
                      title="Complete SEO Audit Checklist for 2025"
                      keyword="seo audit checklist"
                      wordCount={2200}
                      assignedTo="Unassigned"
                      status="draft"
                    />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Posts</CardTitle>
                <CardDescription>
                  Track content from draft to publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Word Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <PostRow
                      title="The Ultimate Guide to SEO Tools in 2025"
                      domain="clienta.com"
                      wordCount={2543}
                      status="published"
                      publishedAt="2 days ago"
                    />
                    <PostRow
                      title="Keyword Research: A Step-by-Step Guide"
                      domain="clientb.com"
                      wordCount={1876}
                      status="review"
                      publishedAt={null}
                    />
                    <PostRow
                      title="Complete SEO Audit Checklist for 2025"
                      domain="clienta.com"
                      wordCount={2198}
                      status="drafting"
                      publishedAt={null}
                    />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>
                  Upcoming content schedule and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Content calendar view coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function StatsCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}

function KeywordRow({
  keyword,
  volume,
  difficulty,
  intent,
  currentRank,
  status,
}: {
  keyword: string;
  volume: number;
  difficulty: number;
  intent: string;
  currentRank: number | null;
  status: string;
}) {
  const statusColors = {
    researched: "bg-muted text-muted-foreground",
    assigned: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    ranking: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    achieved: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  };

  const difficultyColor =
    difficulty >= 60
      ? "text-destructive"
      : difficulty >= 40
      ? "text-chart-5"
      : "text-chart-4";

  return (
    <TableRow>
      <TableCell className="font-medium">{keyword}</TableCell>
      <TableCell>{volume.toLocaleString()}</TableCell>
      <TableCell>
        <span className={difficultyColor}>{difficulty}</span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {intent}
        </Badge>
      </TableCell>
      <TableCell>{currentRank ? `#${currentRank}` : "-"}</TableCell>
      <TableCell>
        <Badge variant="outline" className={statusColors[status as keyof typeof statusColors]}>
          {status}
        </Badge>
      </TableCell>
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
              <Edit className="mr-2 h-4 w-4" />
              Create Brief
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function BriefRow({
  title,
  keyword,
  wordCount,
  assignedTo,
  status,
}: {
  title: string;
  keyword: string;
  wordCount: number;
  assignedTo: string;
  status: string;
}) {
  const statusColors = {
    draft: "bg-muted text-muted-foreground",
    approved: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    assigned: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  };

  return (
    <TableRow>
      <TableCell className="font-medium max-w-xs truncate">{title}</TableCell>
      <TableCell className="text-muted-foreground">{keyword}</TableCell>
      <TableCell>{wordCount.toLocaleString()} words</TableCell>
      <TableCell>{assignedTo}</TableCell>
      <TableCell>
        <Badge variant="outline" className={statusColors[status as keyof typeof statusColors]}>
          {status}
        </Badge>
      </TableCell>
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
              View Brief
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Generate Draft
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function PostRow({
  title,
  domain,
  wordCount,
  status,
  publishedAt,
}: {
  title: string;
  domain: string;
  wordCount: number;
  status: string;
  publishedAt: string | null;
}) {
  const statusColors = {
    brief_ready: "bg-muted text-muted-foreground",
    drafting: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    review: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    approved: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    published: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    indexed: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  };

  return (
    <TableRow>
      <TableCell className="font-medium max-w-xs truncate">{title}</TableCell>
      <TableCell className="text-muted-foreground">{domain}</TableCell>
      <TableCell>{wordCount.toLocaleString()} words</TableCell>
      <TableCell>
        <Badge variant="outline" className={statusColors[status as keyof typeof statusColors]}>
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">{publishedAt || "-"}</TableCell>
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
              View Post
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
