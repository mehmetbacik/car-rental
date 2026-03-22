export interface carType {
  id: string;
  name: string;
  type: string;
  image: string;
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  pricePerDay: number;
  discountPrice?: number;
  isFavorite: boolean;
  status?: string;
}
