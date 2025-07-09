
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Briefcase, Zap, Users } from "lucide-react";
import { useState } from "react";

const JobFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
      skills: ["React", "TypeScript", "Node.js"],
      description: "Join our innovative team building next-generation web applications.",
      postedBy: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
      aiMatch: 95
    },
    {
      id: 2,
      title: "Blockchain Developer",
      company: "CryptoStart",
      location: "San Francisco, CA",
      salary: "$130k - $180k",
      type: "Full-time",
      skills: ["Ethereum", "Solidity", "Web3"],
      description: "Build the future of decentralized finance with our cutting-edge team.",
      postedBy: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
      aiMatch: 88
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$100k - $130k",
      type: "Full-time",
      skills: ["React", "Python", "AWS"],
      description: "Help us scale our platform to millions of users worldwide.",
      postedBy: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face",
      aiMatch: 92
    }
  ];

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
          
          <div className="max-w-2xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg py-3"
            />
          </div>
        </div>
        
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={job.avatar} />
                        <AvatarFallback>{job.postedBy.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                    </div>
                    <CardDescription className="text-base">{job.description}</CardDescription>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600">{job.aiMatch}% match</span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">{job.salary}</p>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
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
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">Load More Jobs</Button>
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
