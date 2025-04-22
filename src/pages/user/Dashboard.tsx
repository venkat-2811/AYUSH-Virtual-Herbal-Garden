
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHerbs } from "@/contexts/HerbContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flower, Search, MessageCircle, Leaf } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const { herbs } = useHerbs();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-herb-700 mb-2">Welcome, {user?.name}!</h1>
        <p className="text-herb-600">
          Explore and learn about medicinal herbs in your virtual garden.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-herb-100">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 bg-herb-50 rounded-full flex items-center justify-center mb-2">
              <Flower className="h-6 w-6 text-herb-500" />
            </div>
            <CardTitle className="text-lg">Explore Herbs</CardTitle>
            <CardDescription>Browse our herb database</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-herb-600 text-sm">
              Discover {herbs.length} medicinal herbs with detailed information, uses, and 3D models.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/explore">
              <Button className="bg-herb-500 hover:bg-herb-600 w-full">
                Start Exploring
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="border-herb-100">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 bg-herb-50 rounded-full flex items-center justify-center mb-2">
              <Search className="h-6 w-6 text-herb-500" />
            </div>
            <CardTitle className="text-lg">Advanced Search</CardTitle>
            <CardDescription>Find specific herbs</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-herb-600 text-sm">
              Search herbs by properties, region, uses, or composition to find exactly what you need.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/search">
              <Button className="bg-herb-500 hover:bg-herb-600 w-full">
                Search Database
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="border-herb-100">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 bg-herb-50 rounded-full flex items-center justify-center mb-2">
              <MessageCircle className="h-6 w-6 text-herb-500" />
            </div>
            <CardTitle className="text-lg">AI Chatbot</CardTitle>
            <CardDescription>Get expert advice</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-herb-600 text-sm">
              Ask questions and get expert answers about herbal medicine, gardening, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/chat">
              <Button className="bg-herb-500 hover:bg-herb-600 w-full">
                Start Chatting
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="border-herb-100">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 bg-herb-50 rounded-full flex items-center justify-center mb-2">
              <Leaf className="h-6 w-6 text-herb-500" />
            </div>
            <CardTitle className="text-lg">My Collection</CardTitle>
            <CardDescription>Your saved herbs</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-herb-600 text-sm">
              View and manage your personal collection of favorite herbs and plants.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/collection">
              <Button className="bg-herb-500 hover:bg-herb-600 w-full">
                View Collection
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Featured herbs section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-herb-700">Featured Herbs</h2>
          <Link to="/explore" className="text-herb-500 text-sm hover:text-herb-600">
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {herbs.slice(0, 3).map(herb => (
            <Card key={herb.id} className="border-herb-100 overflow-hidden">
              <div className="aspect-video bg-herb-50 relative">
                {herb.images && herb.images.length > 0 ? (
                  <img 
                    src={herb.images[0]} 
                    alt={herb.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-herb-50">
                    <Leaf className="h-8 w-8 text-herb-200" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{herb.name}</CardTitle>
                <CardDescription className="italic">{herb.scientificName}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-herb-600 text-sm line-clamp-2">
                  {herb.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/herb/${herb.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-herb-200 text-herb-700">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
