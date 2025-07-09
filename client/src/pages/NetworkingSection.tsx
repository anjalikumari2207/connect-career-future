
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, Link } from "lucide-react";

const NetworkingSection = () => {
  const professionals = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Product Manager at Google",
      location: "Mountain View, CA",
      skills: ["Product Strategy", "Data Analysis", "Leadership"],
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
      connections: 847,
      mutualConnections: 12
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Senior Developer at Microsoft",
      location: "Seattle, WA",
      skills: ["React", "Azure", "DevOps"],
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
      connections: 1234,
      mutualConnections: 8
    },
    {
      id: 3,
      name: "Emily Zhang",
      title: "UX Designer at Airbnb",
      location: "San Francisco, CA",
      skills: ["UI/UX", "Figma", "User Research"],
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face",
      connections: 623,
      mutualConnections: 15
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Expand Your Professional Network
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with professionals who share your interests and goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {professionals.map((person) => (
            <Card key={person.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{person.name}</CardTitle>
                <p className="text-gray-600 text-sm">{person.title}</p>
                <p className="text-gray-500 text-sm">{person.location}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {person.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{person.connections} connections</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link className="w-4 h-4" />
                    <span>{person.mutualConnections} mutual</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Your Network Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Connections</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span>Profile Views (This Week)</span>
                <span className="font-semibold text-green-600">+89</span>
              </div>
              <div className="flex justify-between">
                <span>Search Appearances</span>
                <span className="font-semibold text-blue-600">156</span>
              </div>
              <Button className="w-full mt-4">View Full Analytics</Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p><strong>Sarah Chen</strong> liked your post about AI in product management</p>
                <p className="text-gray-500">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p><strong>Michael Rodriguez</strong> sent you a connection request</p>
                <p className="text-gray-500">5 hours ago</p>
              </div>
              <div className="text-sm">
                <p>You have <strong>3 new</strong> profile views from tech recruiters</p>
                <p className="text-gray-500">1 day ago</p>
              </div>
              <Button variant="outline" className="w-full mt-4">View All Activity</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetworkingSection;
