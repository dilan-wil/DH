"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  department: string;
  position: string;
  employeeId: string;
  employmentType: string;
  reportingManager: string;
  startDate: string;
  salary: string;
  bio?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  skills?: string[];
}

interface StaffCardProps {
  staff: Staff;
  onUpdate?: (updatedStaff: Staff) => void; // callback to update staff
}

const roleColors = {
  Senior_Partner: "bg-blue-100 text-blue-800",
  Junior_Partner: "bg-green-100 text-green-800",
  Legal_Secretary: "bg-purple-100 text-purple-800",
  Accountant: "bg-orange-100 text-orange-800",
  Paralegal: "bg-indigo-100 text-indigo-800",
  Assistant: "bg-pink-100 text-pink-800",
  Manager: "bg-red-100 text-red-800",
};

export default function StaffCard({ staff, onUpdate }: StaffCardProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...staff });

  const handleChange = (field: keyof Staff, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmergencyChange = (
    field: keyof NonNullable<Staff["emergencyContact"]>,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value },
    }));
  };

  const handleSubmit = () => {
    onUpdate?.(formData); // send updated data to parent
    setOpen(false);
  };

  return (
    <>
      {/* Card */}
      <Card
        className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => setOpen(true)}
      >
        <CardContent className="flex items-center py-5 gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={staff.profileImage} />
            <AvatarFallback>
              {staff.firstName?.[0]}
              {staff.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {staff.firstName} {staff.lastName}
            </h3>
            <p className="text-sm text-gray-600">
              <Badge
                className={cn(
                  "text-xs",
                  roleColors[staff.position as keyof typeof roleColors]
                )}
              >
                {staff.position}
              </Badge>
            </p>
            <p className="text-sm text-gray-600 my-3">{staff.department}</p>

            <div className="mt-2 flex flex-col gap-1 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span className="truncate">{staff.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">
                  {staff.address}, {staff.city}, {staff.state}, {staff.zipCode}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Update Staff: {staff.firstName} {staff.lastName}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Personal Info */}
            <div>
              <Label>First Name</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            {/* Work Info */}
            <div>
              <Label>Employee ID</Label>
              <Input
                value={formData.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
              />
            </div>
            <div>
              <Label>Role / Position</Label>
              <Input
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
              />
            </div>
            <div>
              <Label>Department</Label>
              <Input
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
              />
            </div>
            <div>
              <Label>Employment Type</Label>
              <Input
                value={formData.employmentType}
                onChange={(e) => handleChange("employmentType", e.target.value)}
              />
            </div>
            <div>
              <Label>Reporting Manager</Label>
              <Input
                value={formData.reportingManager}
                onChange={(e) =>
                  handleChange("reportingManager", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
              />
            </div>

            {/* Address Info */}
            <div className="col-span-2">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div>
              <Label>ZIP Code</Label>
              <Input
                value={formData.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
              />
            </div>

            {/* Bio */}
            <div className="col-span-2">
              <Label>Bio</Label>
              <Input
                value={formData.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            </div>

            {/* Emergency Contact */}
            {formData.emergencyContact && (
              <>
                <div>
                  <Label>Emergency Contact Name</Label>
                  <Input
                    value={formData.emergencyContact.name}
                    onChange={(e) =>
                      handleEmergencyChange("name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Emergency Contact Phone</Label>
                  <Input
                    value={formData.emergencyContact.phone}
                    onChange={(e) =>
                      handleEmergencyChange("phone", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Emergency Contact Relationship</Label>
                  <Input
                    value={formData.emergencyContact.relationship}
                    onChange={(e) =>
                      handleEmergencyChange("relationship", e.target.value)
                    }
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
