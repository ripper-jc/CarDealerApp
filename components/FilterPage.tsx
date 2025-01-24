'use client'

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select"
  import Link from "next/link"
  import { Button } from "@/components/ui/button"
  import { useState, useEffect } from "react"
  import { useRouter } from "next/navigation"
  
  interface Make {
    MakeId: number
    MakeName: string
    VehicleTypeId: number
    VehicleTypeName: string
  }
  
  export default function FilterPage() {
    const [makes, setMakes] = useState<Make[]>([])
    const [selectedMake, setSelectedMake] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const router = useRouter()
  
    useEffect(() => {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`)
        .then((response) => response.json())
        .then((data) => setMakes(data.Results))
    }, [])
  
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString())
  
    return (
      <div className="space-y-4 w-full max-w-md">
        <Select onValueChange={setSelectedMake} value={selectedMake}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a make" />
          </SelectTrigger>
          <SelectContent>
            {makes.map((make) => (
              <SelectItem key={make.MakeId} value={make.MakeId.toString()}>
                {make.MakeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
  
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
  
        {selectedMake && selectedYear ? (
          <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
            <Button className="w-full mt-4">Next</Button>
          </Link>
        ) : (
          <Button className="w-full" disabled>
            Next
          </Button>
        )}
      </div>
    )
  }