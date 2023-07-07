export interface ICarSchedulingDTO {
  id: string;
  start_date_of_use: Date;
  end_date_of_use: Date;
  reason_for_use: string;
  driver_name?: string;
  car_color?: string;
  car_license_plate?: string;
  car_brand?: string;
  created_at: Date;
  updated_at: Date;
}
