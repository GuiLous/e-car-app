type DocumentationStatus = 'up_to_date' | 'overdue'
type VehicleCondition = 'brand_new' | 'used'
type VehicleType = 'car_type' | 'motorcycle_type'

export type Vehicle = {
  id: number
  discountPercentage?: number
  documentation_status: DocumentationStatus
  mileage: number
  model: string
  price: number
  vehicleCondition: VehicleCondition
  vehicleName: string
  vehicleType: VehicleType
  verifiedStatus: string
  year: number
  createdAt: string
  updatedAt: string
}
