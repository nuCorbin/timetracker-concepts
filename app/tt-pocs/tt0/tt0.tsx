import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, LogOutIcon, Mic, Paperclip, Plus, Minus, ChevronDown, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export function meta() {
  return [
    { title: "Time Tracker Proof of Concept v0" },
    { name: "description", content: "Time Tracker Proof of Concept" },
  ];
}

export default function TT0() {
  const [date, setDate] = useState("04/07/2025");
  const [time, setTime] = useState("3:00 PM");
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [selectedPeople, setSelectedPeople] = useState([
    { id: "14", name: "Charlie Brown", checked: true },
    { id: "14", name: "Lucy Van Pelt", checked: true },
    { id: "14", name: "Linus Van Pelt", checked: true },
  ]);
  const [allocateDialogOpen, setAllocateDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Available routes for the Versions dropdown
  const routes = [
    { name: "TT2", path: "/" },
    { name: "TT1", path: "/tt1" },
    { name: "TT0", path: "/tt0" },
  ];

  const incrementHours = () => {
    setHours(hours + 1);
  };

  const decrementHours = () => {
    if (hours > 0) {
      setHours(hours - 1);
    }
  };

  const incrementMinutes = () => {
    if (minutes === 45) {
      setMinutes(0);
      incrementHours();
    } else {
      setMinutes(minutes + 15);
    }
  };

  const decrementMinutes = () => {
    if (minutes === 0) {
      if (hours > 0) {
        setMinutes(45);
        decrementHours();
      }
    } else {
      setMinutes(minutes - 15);
    }
  };

  const togglePersonChecked = (name: string) => {
    const updatedPeople = selectedPeople.map((person) =>
      person.name === name ? { ...person, checked: !person.checked } : person
    );
    
    setSelectedPeople(updatedPeople);
    
    // Check if at least one person is selected and clear error message if so
    if (updatedPeople.some(person => person.checked)) {
      setErrorMessage(null);
    }
  };

  const handleAllocateTimeClick = () => {
    const hasSelectedPerson = selectedPeople.some(person => person.checked);
    
    if (hasSelectedPerson) {
      setErrorMessage(null);
      setAllocateDialogOpen(true);
    } else {
      setErrorMessage("Please select at least one person from the list.");
    }
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <img src="/mn-state-icon.svg" alt="Minnesota State Icon" width="24" height="24" className="mr-2" />
            <span className="text-primary-foreground text-xl font-semibold mt-0.5">SSIS v0</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Versions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-primary-foreground flex items-center gap-1 px-3 py-2">
                <span>Versions</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {routes.map((route) => (
                <DropdownMenuItem 
                  key={route.path} 
                  onClick={() => handleNavigation(route.path)}
                >
                  {route.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="text-primary-foreground">
            <LogOutIcon />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">New time entry</h1>
        
        <div className="space-y-6">
          {/* Starts Section */}
          <div className="space-y-2">
            <Label>Starts</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input 
                  type="text" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9 outline-2 outline-offset-4"
                />
                <Calendar className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              </div>
              <Input 
                type="text" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="active-efforts" />
              <Label htmlFor="active-efforts">Active efforts</Label>
            </div>
          </div>

          {/* Activity Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Activity</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Workgroup</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select workgroup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group1">Group 1</SelectItem>
                    <SelectItem value="group2">Group 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Progress</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress1">Progress 1</SelectItem>
                    <SelectItem value="progress2">Progress 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Service</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service1">Service 1</SelectItem>
                    <SelectItem value="service2">Service 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>County sub-service</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subservice1">Sub-service 1</SelectItem>
                    <SelectItem value="subservice2">Sub-service 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Activity</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity1">Activity 1</SelectItem>
                    <SelectItem value="activity2">Activity 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <Label className="text-sm text-gray-500 mb-1">Hr.</Label>
                      <Input 
                        type="number" 
                        value={hours}
                        onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16"
                        min={0}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col ml-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-md mb-1"
                        onClick={incrementHours}
                      >
                        <Plus className="size-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-md"
                        onClick={decrementHours}
                        disabled={hours <= 0}
                      >
                        <Minus className="size-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <Label className="text-sm text-gray-500 mb-1">Min.</Label>
                      <Input 
                        type="number" 
                        value={minutes}
                        onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16"
                        min={0}
                        step={15}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col ml-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-md mb-1"
                        onClick={incrementMinutes}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-md"
                        onClick={decrementMinutes}
                        disabled={minutes <= 0 && hours <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>County Acctg</Label>
                <Input placeholder="Lorem ipsum." />
              </div>
              
              <div className="space-y-2">
                <Label>Regarding (3 people)</Label>
                <div className="border rounded-md overflow-hidden">
                  <div className="p-2 border-b">
                    <div className="text-sm text-gray-500">Susan Jones (32)</div>
                  </div>
                  {selectedPeople.map((person) => (
                    <div 
                      key={person.name} 
                      className={`flex items-center px-2 py-1.5 ${person.checked ? 'bg-accent' : ''} border-b last:border-b-0`}
                    >
                      <Checkbox 
                        id={person.name} 
                        checked={person.checked} 
                        onCheckedChange={() => togglePersonChecked(person.name)}
                        className="mr-2" 
                      />
                      <Label htmlFor={person.name} className="text-sm">
                        {person.name} ({person.id})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {errorMessage && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAllocateTimeClick}
              >
                Allocate time
              </Button>

              {/* Allocate Time Dialog */}
              <Dialog open={allocateDialogOpen} onOpenChange={setAllocateDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Allocate Time</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Activity Regarding:</h3>
                      <div className="border rounded">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 w-2/3">Name</th>
                              <th className="text-center p-2">Hr</th>
                              <th className="text-center p-2">Min</th>
                              <th className="text-center p-2">Keep</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPeople.filter(person => person.checked).map((person) => (
                              <tr key={person.name} className="border-b bg-accent">
                                <td className="p-2">{person.name} ({person.id})</td>
                                <td className="text-center p-2">1</td>
                                <td className="text-center p-2">0</td>
                                <td className="text-center p-2">
                                  <Checkbox defaultChecked />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Allocate Time:</h3>
                      <div className="flex justify-between items-center bg-muted p-3 rounded">
                        <div className="flex items-center space-x-2">
                          <span>Activity Duration: {hours}</span>
                          <span>Hr.</span>
                          <span>{minutes}</span>
                          <span>Min.</span>
                        </div>
                        <Button>Calculate</Button>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setAllocateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setAllocateDialogOpen(false)}>
                      OK
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Note Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Note</h2>
            <Textarea placeholder="Type your message here..." className="min-h-24" />
            <div className="flex space-x-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileSelection} 
                multiple
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handlePaperclipClick}
              >
                <Paperclip />
              </Button>
              <Button variant="ghost" size="icon">
                <Mic />
              </Button>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-1">Attached files</h3>
                <ul className="space-y-1">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-1 px-2 bg-muted rounded-md text-sm">
                      <span className="truncate max-w-[250px]">{file.name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contact</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Purpose</Label>
                <Input placeholder="Lorem ipsum dolor sit amet consectetur. Tincidunt vitae turpis eget at." />
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <RadioGroup defaultValue="completed">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="completed" id="completed" />
                      <Label htmlFor="completed">Completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attempted" id="attempted" />
                      <Label htmlFor="attempted">Attempted</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Method</Label>
                <Input placeholder="Lorem ipsum." />
              </div>
              
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Lorem ipsum." />
              </div>
              
              <div className="space-y-2">
                <Label>Contact With</Label>
                <Input placeholder="Lorem ipsum." />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pb-8">
          <div>
            <Select>
              <SelectTrigger className="border rounded-md flex items-center px-3 py-2">
                <span>Action</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="export">Action 1</SelectItem>
                <SelectItem value="share">Action 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save</Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary p-4 flex justify-start">
        <img 
          src="/mn-logo.png" 
          alt="Minnesota logo" 
          className="h-10"
        />
      </footer>
    </div>
  );
}