export interface carType {
  id: string;
  name: string;
  description: string;
  type: string;
  images: string[];
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  pricePerDay: number;
  discountPrice?: number;
  isFavorite: boolean;
  isPopular: boolean;
  status?: string;
}
