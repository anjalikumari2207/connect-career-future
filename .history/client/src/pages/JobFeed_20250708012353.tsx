import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus, Zap } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/api/job";
import axios from "@/api/axios";
import { toast } from "@/hooks/use-toast";


const applyToJob = async (jobId: string) => {
  try {
    const res = await axios.post(`/jobs/${jobId}/apply`);
    toast({
      title: "Application Submitted",
      description: res.data.msg || "You’ve successfully applied!",
    });
  } catch (err: any) {
    toast({
      title: "Application Failed",
      description: err.response?.data?.msg || "Please try again later.",
      variant: "destructive",
    });
  }
};

interface JobFeedProps {
  onPostJob?: () => void;
}

const JobFeed = ({ onPostJob }: JobFeedProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });

  const filteredJobs = jobs.filter((job: any) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills?.some((skill: string) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesType =
      jobType === "all" || job.type?.toLowerCase().includes(jobType);
    const matchesLocation =
      location === "all" ||
      job.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Opportunity
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered job matching finds the perfect roles for your skills
          </p>

          <div className="flex justify-center mb-8">
            <Button
              onClick={onPostJob}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post a Job
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <Input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg py-3"
            />

            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="los angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading jobs...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Failed to load jobs.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {filteredJobs.map((job: any) => (
                <Card
                  key={job._id}
                  className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                                job.createdBy?.name || "JD"
                              }`}
                            />
                            <AvatarFallback>
                              {job.createdBy?.name?.slice(0, 2) || "JD"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">
                              {job.title}
                            </CardTitle>
                            <p className="text-gray-600">
                              {job.company} • {job.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              Posted {job.createdAt
                                ? new Date(job.createdAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {job.description}
                        </CardDescription>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-600">
                            {job.aiMatch || Math.floor(Math.random() * 21 + 80)}%
                            match
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-green-600">
                          {job.salary || "N/A"}
                        </p>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {job.skills?.map((skill: string) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">Save</Button>
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No jobs found matching your criteria.
                </p>
              </div>
            )}

            <div className="text-center mt-12">
                <Button
  onClick={() => applyToJob(job._id)}
  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
>
  Apply Now
</Button>

              <Button size="lg" variant="outline">
                Load More Jobs
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobFeed;
