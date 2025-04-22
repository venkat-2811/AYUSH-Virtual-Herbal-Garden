
import React from "react";
import { useHerb } from "@/contexts/HerbContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const UserCollection: React.FC = () => {
  const { user } = useAuth();
  const { collection, removeFromCollection } = useHerb();
  
  const handleRemove = (id: string) => {
    removeFromCollection(id);
    toast("Herb removed from collection");
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-herb-800 mb-2">My Herb Collection</h1>
      <p className="text-herb-600 mb-8">
        Your saved herbs and plants for quick access
      </p>
      
      {collection.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow">
          <h2 className="text-xl font-medium text-herb-800 mb-2">
            Your collection is empty
          </h2>
          <p className="text-herb-600 mb-6">
            Start exploring herbs and add them to your collection
          </p>
          <Link to="/explore">
            <Button>Explore Herbs</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.map((herb) => (
            <Card key={herb.id} className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src={herb.images[0] || "/placeholder.svg"}
                  alt={herb.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg text-herb-800">{herb.name}</h3>
                <p className="text-sm italic text-herb-600 mb-2">{herb.scientificName}</p>
                <p className="text-herb-700 line-clamp-2 text-sm">
                  {herb.description.substring(0, 100)}
                  {herb.description.length > 100 ? '...' : ''}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Link to={`/herb/${herb.id}`}>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemove(herb.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCollection;
