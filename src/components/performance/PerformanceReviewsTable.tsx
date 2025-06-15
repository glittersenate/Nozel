import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Star } from 'lucide-react';
import { usePerformanceContext } from "@/contexts/PerformanceContext";

export const PerformanceReviewsTable = () => {
  const { reviews } = usePerformanceContext();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'approved':
        return <Badge className="bg-blue-500">Approved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
            }`}
          />
        ))}
        <span className="text-white ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-800/30">
                <TableHead className="text-blue-300">Period</TableHead>
                <TableHead className="text-blue-300">Type</TableHead>
                <TableHead className="text-blue-300">Rating</TableHead>
                <TableHead className="text-blue-300">Status</TableHead>
                <TableHead className="text-blue-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.slice(0, 5).map((review) => (
                <TableRow key={review.id} className="border-blue-800/30">
                  <TableCell className="text-white">
                    {review.period}
                  </TableCell>
                  <TableCell className="text-blue-300">
                    {review.type.charAt(0).toUpperCase() + review.type.slice(1)}
                  </TableCell>
                  <TableCell>
                    {review.overallRating > 0 ? renderRating(review.overallRating) : '-'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(review.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="border-blue-500/50">
                        <Eye className="w-3 h-3" />
                      </Button>
                      {review.status !== 'approved' && (
                        <Button size="sm" variant="outline" className="border-orange-500/50">
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
