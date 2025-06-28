import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/lan_cmp/card";
import { Button } from "../components/lan_cmp/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/lan_cmp/tabs";
import { Calendar, Bell, ExternalLink } from 'lucide-react';

const AnnouncementsEvents = () => {
  const announcements = [
    {
      title: "Admission 2024-25 Open",
      description: "Applications are now open for UG, PG, and Ph.D. programs",
      date: "Dec 15, 2024",
      urgent: true
    },
    {
      title: "Scholarship Applications",
      description: "Merit-based scholarships available for deserving students",
      date: "Dec 10, 2024",
      urgent: false
    },
    {
      title: "Fee Payment Deadline",
      description: "Last date for semester fee payment extended to Dec 31",
      date: "Dec 8, 2024",
      urgent: true
    },
    {
      title: "Research Grant Opportunities",
      description: "Faculty and students can apply for research funding",
      date: "Dec 5, 2024",
      urgent: false
    }
  ];

  const events = [
    {
      title: "Annual Tech Fest 2024",
      description: "Three-day technical festival with competitions and workshops",
      date: "Jan 15-17, 2025",
      type: "Technical"
    },
    {
      title: "Industry Interface Program",
      description: "Interaction with industry leaders and placement opportunities",
      date: "Jan 20, 2025",
      type: "Career"
    },
    {
      title: "Cultural Fest",
      description: "Showcase of arts, music, dance, and cultural diversity",
      date: "Feb 5-7, 2025",
      type: "Cultural"
    },
    {
      title: "Research Symposium",
      description: "Presentation of research papers and innovations",
      date: "Feb 15, 2025",
      type: "Academic"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of important announcements and upcoming events
          </p>
        </div>

        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <div className="grid md:grid-cols-2 gap-6">
              {announcements.map((announcement, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${announcement.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {announcement.title}
                      </CardTitle>
                      {announcement.urgent && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      {announcement.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{announcement.description}</p>
                    <Button variant="outline" size="sm">
                      Read More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </CardTitle>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {event.type}
                      </span>
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      {event.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <Button variant="outline" size="sm">
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AnnouncementsEvents;