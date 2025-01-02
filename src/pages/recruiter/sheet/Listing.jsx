import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardFooter, CardDescription, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ListingSheet = ({ team, jobSeekers, listings, handleDelete }) => {
    console.log(team, jobSeekers);

    return (
        <div>
            <Sheet className="pb-4">
                <SheetTrigger asChild>
                    <Button className="mb-4 w-full">
                        Show Listings
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-96 overflow-y-scroll">
                    <SheetHeader>
                        <h2 className="text-lg font-semibold">Listings</h2>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 pb-2 h-full mb-4">
                        {listings.length > 0 ? (
                            listings.map((listing, index) => (
                                <Card key={index} className="mb-4">
                                    <CardHeader className="flex flex-row justify-between items-center">
                                        <CardTitle className="text-lg font-bold">Shortlisted Candidates</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {
                                            listing.ShortlistedCandidates.map((item) => (
                                                <div className="flex justify-between mb-2 border p-2">
                                                    <p>{jobSeekers.find(e => e.id == item.UserId)?.name}</p>
                                                    <Trash2 size={20}  onClick={() => handleDelete(listing.id, item.UserId)} className="text-red-500" />
                                                </div>
                                            ))
                                        }
                                        <p className="text-xs text-gray-500">Created: {
                                            new Date(listing.createdAt).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                        }
                                        </p>
                                    </CardContent>
                                    {/* <CardFooter>
                                        <Button variant="destructive" size="sm" className="text-xs" onClick={() => handleDelete(listing.id, UserId)}>Delete</Button>
                                    </CardFooter> */}
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500">No listings available.</p>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default ListingSheet;