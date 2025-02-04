export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[]; // обычно массив строк
  category: {
    id: number;
    name: string;
    image: string;
  };
}
