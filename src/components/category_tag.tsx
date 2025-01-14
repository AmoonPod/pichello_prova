//Create a category tag component that will be used to display the category of the blog post.
import { FC } from "react";
import { Badge } from "./ui/badge";

interface CategoryTagProps {
  category: string;
}

const CategoryTag: FC<CategoryTagProps> = ({ category }) => {
  return <span className="text-sm text-gray-600">{category}</span>;
};

export default CategoryTag;
