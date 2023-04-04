import { useState, useEffect } from 'react';
import axios from 'axios';

const useMenuItems = (selectedCategory) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://192.168.100.18:3000/api/menuItems');
        setMenuItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredMenuItems = menuItems.filter((item) => item.category === selectedCategory);

  return [filteredMenuItems, isLoading];
};

export default useMenuItems;
