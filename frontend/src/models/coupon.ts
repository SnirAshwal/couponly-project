class Coupon {
  id: number = 0;
  companyId: number = 0;
  title: string = "";
  category!: Category;
  description: string = "";
  startDate!: Date;
  endDate!: Date;
  amount!: number;
  price!: number;
  image: string = "";
}

export default Coupon;

export enum Category {
  FOOD,
  ELECTRICITY,
  FASHION,
  VACATION,
  ATTRACTIONS,
  DECOR,
  BEAUTY,
}

export const CategoryList: {
  value: string;
}[] = Object.values(Category)
  .filter((value) => typeof value === "string")
  .map((value) => ({ value: value as string }));
